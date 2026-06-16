import csv
import io

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.fhsis import FHSISExportRow


async def generate_fhsis_rows(
    db: AsyncSession, reporting_month: str
) -> list[FHSISExportRow]:
    """Generate DOH FHSIS-compatible monthly report rows, aggregated by barangay PSGC."""
    result = await db.execute(
        text(
            """
            SELECT
                TO_CHAR(e.encounter_date, 'YYYY-MM') AS reporting_month,
                p.psgc_code AS barangay_psgc,
                COUNT(e.id) AS total_anc_visits,
                SUM(
                    CASE WHEN jsonb_array_length(COALESCE(e.who_danger_flags, '[]'::jsonb)) > 0
                         THEN 1 ELSE 0 END
                ) AS high_risk_pregnancies_flagged
            FROM encounters e
            JOIN patients p ON e.patient_id = p.id
            WHERE TO_CHAR(e.encounter_date, 'YYYY-MM') = :month
              AND e.sync_status = 'CLOUD_SYNCED'
            GROUP BY reporting_month, p.psgc_code
            ORDER BY p.psgc_code
            """
        ),
        {"month": reporting_month},
    )
    return [
        FHSISExportRow(
            reporting_month=row["reporting_month"],
            barangay_psgc=row["barangay_psgc"] or "UNKNOWN",
            total_anc_visits=row["total_anc_visits"],
            high_risk_pregnancies_flagged=row["high_risk_pregnancies_flagged"] or 0,
        )
        for row in result.mappings().all()
    ]


def rows_to_csv(rows: list[FHSISExportRow]) -> str:
    output = io.StringIO()
    writer = csv.DictWriter(
        output,
        fieldnames=[
            "reporting_month",
            "barangay_psgc",
            "total_anc_visits",
            "high_risk_pregnancies_flagged",
        ],
    )
    writer.writeheader()
    for row in rows:
        writer.writerow(row.model_dump())
    return output.getvalue()
