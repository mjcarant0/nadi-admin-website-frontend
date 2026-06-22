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


@router.get("/anc-analytics")
async def get_anc_analytics(
    db: AsyncSession = Depends(get_db),
    psgc_prefix: Optional[str] = Query(default=None),
):
    """Derived ANC coverage analytics — monthly ANC1/ANC4 trend, visit funnel, and
    per-barangay coverage — computed from `encounters` / `patients`. Replaces the
    static `ancCoverageTrend` / `ancVisitFunnel` / `ancRegionalCoverage` mocks."""
    where = "WHERE 1=1"
    params: dict = {}
    if psgc_prefix:
        where += " AND p.psgc_code LIKE :psgc_prefix"
        params["psgc_prefix"] = f"{psgc_prefix}%"

    # Per-patient visit ordinals so we can derive ANC1 (first visit in a month) and
    # ANC4 (the month a patient reaches her 4th visit).
    trend = await db.execute(
        text(
            f"""
            WITH ranked AS (
                SELECT e.patient_id,
                       DATE_TRUNC('month', e.encounter_date) AS month,
                       ROW_NUMBER() OVER (PARTITION BY e.patient_id ORDER BY e.encounter_date) AS visit_no
                FROM encounters e
                JOIN patients p ON e.patient_id = p.id
                {where}
            )
            SELECT TO_CHAR(month, 'YYYY-MM') AS month,
                   COUNT(*) FILTER (WHERE visit_no = 1) AS anc1,
                   COUNT(*) FILTER (WHERE visit_no = 4) AS anc4
            FROM ranked
            GROUP BY month
            ORDER BY month
            """
        ),
        params,
    )
    coverage_trend = [dict(r) for r in trend.mappings().all()]

    # Visit funnel: how many patients reached at least N visits (ANC1..ANC8).
    funnel_rows = await db.execute(
        text(
            f"""
            WITH counts AS (
                SELECT e.patient_id, COUNT(*) AS visits
                FROM encounters e
                JOIN patients p ON e.patient_id = p.id
                {where}
                GROUP BY e.patient_id
            )
            SELECT n AS stage,
                   (SELECT COUNT(*) FROM counts WHERE visits >= n) AS patients
            FROM generate_series(1, 8) AS n
            ORDER BY n
            """
        ),
        params,
    )
    funnel = [{"stage": f"ANC{r['stage']}", "value": r["patients"]} for r in funnel_rows.mappings().all()]

    regional = await db.execute(
        text(
            f"""
            WITH pvc AS (
                SELECT e.patient_id, p.psgc_code, COUNT(e.id) AS visit_count
                FROM encounters e
                JOIN patients p ON e.patient_id = p.id
                {where}
                GROUP BY e.patient_id, p.psgc_code
            )
            SELECT psgc_code,
                   COUNT(*) AS total_registered,
                   SUM(CASE WHEN visit_count >= 1 THEN 1 ELSE 0 END) AS anc1_count,
                   SUM(CASE WHEN visit_count >= 4 THEN 1 ELSE 0 END) AS anc4_count,
                   ROUND(100.0 * SUM(CASE WHEN visit_count >= 4 THEN 1 ELSE 0 END) / COUNT(*), 1)
                       AS coverage_rate
            FROM pvc
            GROUP BY psgc_code
            ORDER BY coverage_rate ASC
            """
        ),
        params,
    )
    return {
        "coverage_trend": coverage_trend,
        "funnel": funnel,
        "regional_coverage": [dict(r) for r in regional.mappings().all()],
    }


# WHO danger-sign enum values (see base_enums.WHODangerSignType) we report on.
_DANGER_TYPES = [
    "SEVERE_PREECLAMPSIA",
    "HYPERTENSION",
    "HYPOXIA",
    "ABNORMAL_FHR",
    "INFECTION_SEPSIS",
]


@router.get("/danger-sign-trend")
async def get_danger_sign_trend(
    db: AsyncSession = Depends(get_db),
    psgc_prefix: Optional[str] = Query(default=None),
):
    """Danger-sign trend analytics derived from `encounters.who_danger_flags`:
    monthly time-series per WHO danger type, per-region distribution, and overall
    type distribution. Replaces the static dangerSign* mocks (uses the real WHO
    danger-sign taxonomy rather than the mock's preeclampsia/hemorrhage/other)."""
    where = "WHERE COALESCE(e.who_danger_flags, '[]'::jsonb) != '[]'::jsonb"
    params: dict = {}
    if psgc_prefix:
        where += " AND p.psgc_code LIKE :psgc_prefix"
        params["psgc_prefix"] = f"{psgc_prefix}%"

    # Explode the danger-flag JSONB array so each flagged alert_type is one row.
    base_cte = f"""
        WITH flags AS (
            SELECT DATE_TRUNC('month', e.encounter_date) AS month,
                   p.psgc_code,
                   (flag->>'alert_type') AS alert_type
            FROM encounters e
            JOIN patients p ON e.patient_id = p.id
            CROSS JOIN LATERAL jsonb_array_elements(e.who_danger_flags) AS flag
            {where}
        )
    """

    ts = await db.execute(
        text(base_cte + """
            SELECT TO_CHAR(month, 'YYYY-MM') AS month, alert_type, COUNT(*) AS count
            FROM flags GROUP BY month, alert_type ORDER BY month
        """),
        params,
    )
    # Pivot into [{month, <type>: n, ...}] so the chart can read one row per month.
    months: dict[str, dict] = {}
    for r in ts.mappings().all():
        m = months.setdefault(r["month"], {"month": r["month"], **{t: 0 for t in _DANGER_TYPES}})
        if r["alert_type"] in m:
            m[r["alert_type"]] = r["count"]
    time_series = list(months.values())

    regional = await db.execute(
        text(base_cte + """
            SELECT psgc_code, alert_type, COUNT(*) AS count
            FROM flags GROUP BY psgc_code, alert_type ORDER BY psgc_code
        """),
        params,
    )
    types = await db.execute(
        text(base_cte + """
            SELECT alert_type, COUNT(*) AS count
            FROM flags GROUP BY alert_type ORDER BY count DESC
        """),
        params,
    )
    return {
        "danger_types": _DANGER_TYPES,
        "time_series": time_series,
        "regional_distribution": [dict(r) for r in regional.mappings().all()],
        "type_distribution": [dict(r) for r in types.mappings().all()],
    }


@router.get("/cohort-analytics")
async def get_cohort_analytics(
    db: AsyncSession = Depends(get_db),
    psgc_prefix: Optional[str] = Query(default=None),
):
    """Cohort breakdown by gestational trimester × barangay, derived from
    `patients.lmp_date` vs `encounters.encounter_date`. Trimester boundaries: T1 <14
    wks, T2 14–27 wks, T3 ≥28 wks. Replaces the static in-component cohort mock."""
    where = "WHERE p.lmp_date IS NOT NULL"
    params: dict = {}
    if psgc_prefix:
        where += " AND p.psgc_code LIKE :psgc_prefix"
        params["psgc_prefix"] = f"{psgc_prefix}%"

    rows = await db.execute(
        text(
            f"""
            WITH latest AS (
                SELECT DISTINCT ON (e.patient_id)
                       e.patient_id,
                       p.psgc_code,
                       GREATEST(0, (e.encounter_date::date - p.lmp_date)) / 7 AS aog_weeks,
                       COALESCE(e.who_danger_flags, '[]'::jsonb) != '[]'::jsonb AS flagged
                FROM encounters e
                JOIN patients p ON e.patient_id = p.id
                {where}
                ORDER BY e.patient_id, e.encounter_date DESC
            )
            SELECT psgc_code,
                   COUNT(*) AS total,
                   COUNT(*) FILTER (WHERE aog_weeks < 14) AS tri1,
                   COUNT(*) FILTER (WHERE aog_weeks >= 14 AND aog_weeks < 28) AS tri2,
                   COUNT(*) FILTER (WHERE aog_weeks >= 28) AS tri3,
                   COUNT(*) FILTER (WHERE flagged) AS danger
            FROM latest
            GROUP BY psgc_code
            ORDER BY total DESC
            """
        ),
        params,
    )
    return {"cohorts": [dict(r) for r in rows.mappings().all()]}


@router.get("/node-health")
async def get_node_health(db: AsyncSession = Depends(get_db)):
    """Edge node diagnostics from `edge_node_health` (heartbeat-fed). Returns rollup
    KPIs plus one row per node. Backs the admin Node Health view; replaces the
    static nodeKPICards / nodeRegionalStatus mocks."""
    result = await db.execute(
        text(
            """
            SELECT node_id, region, psgc_code, status,
                   last_heartbeat, cpu_pct, memory_pct, uptime_pct,
                   queued_syncs, app_version
            FROM edge_node_health
            ORDER BY region NULLS LAST, node_id
            """
        )
    )
    nodes = []
    for r in result.mappings().all():
        nodes.append(
            {
                "node_id": r["node_id"],
                "region": r["region"],
                "psgc_code": r["psgc_code"],
                "status": r["status"],
                "last_heartbeat": r["last_heartbeat"].isoformat() if r["last_heartbeat"] else None,
                "cpu_pct": r["cpu_pct"],
                "memory_pct": r["memory_pct"],
                "uptime_pct": r["uptime_pct"],
                "queued_syncs": r["queued_syncs"],
                "app_version": r["app_version"],
            }
        )

    total = len(nodes)
    online = sum(1 for n in nodes if n["status"] == "online")
    degraded = sum(1 for n in nodes if n["status"] == "degraded")
    offline = sum(1 for n in nodes if n["status"] == "offline")
    uptimes = [n["uptime_pct"] for n in nodes if n["uptime_pct"] is not None]
    avg_uptime = round(sum(uptimes) / len(uptimes), 1) if uptimes else 0.0

    return {
        "kpis": {
            "total": total,
            "online": online,
            "degraded": degraded,
            "offline": offline,
            "avg_uptime": avg_uptime,
        },
        "nodes": nodes,
    }


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
