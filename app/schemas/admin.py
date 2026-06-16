from datetime import datetime

from pydantic import BaseModel

from app.models.base_enums import WHODangerSignType


class AdminDashboardStats(BaseModel):
    total_active_pregnancies: int
    critical_triage_queue_count: int
    offline_syncs_pending: int
    regional_risk_points: list[dict]


class GISRiskPoint(BaseModel):
    encounter_id: str
    psgc_code: str | None
    latitude: float | None
    longitude: float | None
    risk_level: WHODangerSignType
    timestamp: datetime
