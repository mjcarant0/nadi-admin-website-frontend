import io
import json
from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db, require_role
from app.models.base_enums import UserRole, WHODangerSignType
from app.schemas.admin import AdminDashboardStats
from app.services.fhsis_service import generate_fhsis_rows, rows_to_csv

router = APIRouter(
    prefix="/admin",
    tags=["Admin Analytics"],
    dependencies=[Depends(require_role(UserRole.ADMIN))],
)


async def _get_risk_points(db: AsyncSession) -> list[dict]:
    result = await db.execute(
        text(
            """
            SELECT
                e.id::text AS encounter_id,
                p.psgc_code,
                ST_Y(e.location::geometry) AS latitude,
                ST_X(e.location::geometry) AS longitude,
                e.who_danger_flags,
                e.encounter_date
            FROM encounters e
            JOIN patients p ON e.patient_id = p.id
            WHERE e.location IS NOT NULL
              AND e.encounter_date >= NOW() - INTERVAL '30 days'
              AND COALESCE(e.who_danger_flags, '[]'::jsonb) != '[]'::jsonb
            ORDER BY e.encounter_date DESC
            LIMIT 2000
            """
        )
    )
    points = []
    for row in result.mappings().all():
        flags = row["who_danger_flags"] if isinstance(row["who_danger_flags"], list) else []
        primary = flags[0]["alert_type"] if flags else WHODangerSignType.NONE.value
        points.append(
            {
                "encounter_id": row["encounter_id"],
                "psgc_code": row["psgc_code"],
                "latitude": row["latitude"],
                "longitude": row["longitude"],
                "risk_level": primary,
                "timestamp": row["encounter_date"].isoformat(),
            }
        )
    return points


@router.get("/dashboard", response_model=AdminDashboardStats)
async def get_dashboard_stats(db: AsyncSession = Depends(get_db)):
    """Real-time population-level metrics. Read-only aggregations."""
    active = (
        await db.execute(
            text(
                "SELECT COUNT(DISTINCT patient_id) FROM encounters "
                "WHERE encounter_date >= NOW() - INTERVAL '9 months'"
            )
        )
    ).scalar_one() or 0

    critical = (
        await db.execute(
            text(
                "SELECT COUNT(id) FROM encounters "
                "WHERE is_reviewed_by_dttb = FALSE "
                "AND COALESCE(who_danger_flags, '[]'::jsonb) @> '[{\"is_critical\": true}]'::jsonb"
            )
        )
    ).scalar_one() or 0

    pending = (
        await db.execute(
            text("SELECT COUNT(id) FROM encounters WHERE sync_status = 'DRAFT'")
        )
    ).scalar_one() or 0

    return AdminDashboardStats(
        total_active_pregnancies=active,
        critical_triage_queue_count=critical,
        offline_syncs_pending=pending,
        regional_risk_points=await _get_risk_points(db),
    )


@router.get("/heatmap", response_model=list[dict])
async def get_heatmap_aggregates(
    db: AsyncSession = Depends(get_db),
    danger_sign: Optional[WHODangerSignType] = Query(default=None),
    psgc_prefix: Optional[str] = Query(default=None),
    date_from: Optional[date] = Query(default=None),
    date_to: Optional[date] = Query(default=None),
):
    """Aggregated danger-sign density per barangay PSGC for choropleth rendering."""
    base = """
        SELECT
            p.psgc_code,
            COUNT(e.id) AS encounter_count,
            SUM(CASE WHEN COALESCE(e.who_danger_flags, '[]'::jsonb) != '[]'::jsonb
                     THEN 1 ELSE 0 END) AS flagged_count,
            ST_AsGeoJSON(ST_Centroid(ST_Collect(e.location::geometry)))::json AS centroid
        FROM encounters e
        JOIN patients p ON e.patient_id = p.id
        WHERE e.location IS NOT NULL
    """
    params: dict = {}
    if danger_sign:
        base += " AND e.who_danger_flags @> :flag_filter::jsonb"
        params["flag_filter"] = json.dumps([{"alert_type": danger_sign.value}])
    if psgc_prefix:
        base += " AND p.psgc_code LIKE :psgc_prefix"
        params["psgc_prefix"] = f"{psgc_prefix}%"
    if date_from:
        base += " AND e.encounter_date >= :date_from"
        params["date_from"] = date_from
    if date_to:
        base += " AND e.encounter_date <= :date_to"
        params["date_to"] = date_to
    base += " GROUP BY p.psgc_code ORDER BY flagged_count DESC"

    result = await db.execute(text(base), params)
    return [dict(row) for row in result.mappings().all()]


@router.get("/coverage", response_model=dict)
async def get_anc_coverage(
    db: AsyncSession = Depends(get_db),
    psgc_code: Optional[str] = Query(default=None),
):
    """% of registered mothers with >= 4 ANC visits, per barangay."""
    filter_clause = "WHERE 1=1"
    params: dict = {}
    if psgc_code:
        filter_clause += " AND p.psgc_code = :psgc"
        params["psgc"] = psgc_code

    result = await db.execute(
        text(
            f"""
            WITH patient_visit_counts AS (
                SELECT e.patient_id, p.psgc_code, COUNT(e.id) AS visit_count
                FROM encounters e
                JOIN patients p ON e.patient_id = p.id
                {filter_clause}
                GROUP BY e.patient_id, p.psgc_code
            )
            SELECT
                psgc_code,
                COUNT(*) AS total_registered,
                SUM(CASE WHEN visit_count >= 4 THEN 1 ELSE 0 END) AS completed_4_visits,
                ROUND(100.0 * SUM(CASE WHEN visit_count >= 4 THEN 1 ELSE 0 END) / COUNT(*), 2)
                    AS coverage_rate_percent
            FROM patient_visit_counts
            GROUP BY psgc_code
            ORDER BY coverage_rate_percent ASC
            """
        ),
        params,
    )
    return {"coverage_by_barangay": [dict(r) for r in result.mappings().all()]}


@router.get("/export/fhsis")
async def export_fhsis_csv(
    reporting_month: str = Query(..., description="Format: YYYY-MM"),
    format: str = Query(default="csv", description="csv or json"),
    db: AsyncSession = Depends(get_db),
):
    """DOH FHSIS-compliant monthly export (CSV or JSON)."""
    rows = await generate_fhsis_rows(db, reporting_month)
    if format == "json":
        return [r.model_dump() for r in rows]
    csv_content = rows_to_csv(rows)
    return StreamingResponse(
        io.StringIO(csv_content),
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=FHSIS_{reporting_month}.csv"
        },
    )


@router.get("/export/anonymised")
async def export_anonymised_data(
    db: AsyncSession = Depends(get_db),
    date_from: Optional[date] = Query(default=None),
    date_to: Optional[date] = Query(default=None),
):
    """Anonymised aggregate export — no individual patient identifiers."""
    params: dict = {}
    date_filter = ""
    if date_from:
        date_filter += " AND e.encounter_date >= :date_from"
        params["date_from"] = date_from
    if date_to:
        date_filter += " AND e.encounter_date <= :date_to"
        params["date_to"] = date_to

    result = await db.execute(
        text(
            f"""
            SELECT
                p.psgc_code,
                DATE_TRUNC('month', e.encounter_date) AS month,
                COUNT(e.id) AS total_visits,
                AVG(e.systolic_bp) AS avg_sbp,
                AVG(e.diastolic_bp) AS avg_dbp,
                AVG(e.spo2) AS avg_spo2,
                COUNT(CASE WHEN jsonb_array_length(COALESCE(e.who_danger_flags, '[]'::jsonb)) > 0
                           THEN 1 END) AS danger_flag_count
            FROM encounters e
            JOIN patients p ON e.patient_id = p.id
            WHERE e.sync_status = 'CLOUD_SYNCED'
            {date_filter}
            GROUP BY p.psgc_code, month
            ORDER BY month DESC, p.psgc_code
            """
        ),
        params,
    )
    return [dict(r) for r in result.mappings().all()]


@router.get("/audit/sync-log")
async def get_sync_audit_log(
    db: AsyncSession = Depends(get_db),
    limit: int = Query(default=100, le=500),
):
    """Per-BHW last sync, record volumes, pending queue depth."""
    result = await db.execute(
        text(
            """
            SELECT
                e.bhw_id::text AS bhw_id,
                u.first_name || ' ' || u.last_name AS bhw_name,
                u.assigned_barangay_psgc,
                MAX(e.encounter_date) AS last_encounter_date,
                COUNT(e.id) AS records_synced,
                SUM(CASE WHEN e.sync_status = 'CLOUD_SYNCED' THEN 1 ELSE 0 END) AS confirmed_synced,
                SUM(CASE WHEN e.sync_status = 'DRAFT' THEN 1 ELSE 0 END) AS pending_sync
            FROM encounters e
            JOIN users u ON e.bhw_id = u.id
            GROUP BY e.bhw_id, bhw_name, u.assigned_barangay_psgc
            ORDER BY last_encounter_date DESC
            LIMIT :lim
            """
        ),
        {"lim": limit},
    )
    return [dict(r) for r in result.mappings().all()]


@router.get("/audit/bhw-coverage")
async def get_bhw_coverage_map(db: AsyncSession = Depends(get_db)):
    """ACTIVE vs SILENT barangay detection (30-day threshold)."""
    result = await db.execute(
        text(
            """
            SELECT
                u.assigned_barangay_psgc,
                MAX(e.encounter_date) AS last_submission,
                COUNT(e.id) AS total_records,
                CASE
                    WHEN MAX(e.encounter_date) < NOW() - INTERVAL '30 days' THEN 'SILENT'
                    WHEN MAX(e.encounter_date) IS NULL THEN 'SILENT'
                    ELSE 'ACTIVE'
                END AS coverage_status
            FROM users u
            LEFT JOIN encounters e ON e.bhw_id = u.id
            WHERE u.role = 'BHW' AND u.is_active = TRUE
            GROUP BY u.assigned_barangay_psgc
            ORDER BY last_submission ASC NULLS FIRST
            """
        )
    )
    return [dict(r) for r in result.mappings().all()]
