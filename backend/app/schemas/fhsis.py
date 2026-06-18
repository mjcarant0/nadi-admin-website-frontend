from pydantic import BaseModel


class FHSISExportRow(BaseModel):
    reporting_month: str  # "YYYY-MM"
    barangay_psgc: str
    total_anc_visits: int
    high_risk_pregnancies_flagged: int
