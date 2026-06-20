import uuid

from geoalchemy2 import Geometry
from sqlalchemy import ARRAY, Boolean, Column, DateTime
from sqlalchemy import Enum as SAEnum
from sqlalchemy import Float, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import relationship

from app.db.base import Base
from app.models.base_enums import SyncStatus


class Encounter(Base):
    __tablename__ = "encounters"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    client_ref = Column(String, nullable=True, unique=True, index=True)

    patient_id = Column(
        UUID(as_uuid=True), ForeignKey("patients.id"), nullable=False, index=True
    )
    bhw_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    dttb_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    encounter_date = Column(DateTime(timezone=True), nullable=False)

    systolic_bp = Column(Integer, nullable=True)
    diastolic_bp = Column(Integer, nullable=True)
    heart_rate = Column(Integer, nullable=True)
    spo2 = Column(Float, nullable=True)
    fetal_heart_rate = Column(Integer, nullable=True)
    temperature = Column(Float, nullable=True)

    raw_text_notes = Column(Text, nullable=True)
    soap_subjective = Column(Text, nullable=True)
    soap_objective = Column(Text, nullable=True)
    soap_assessment = Column(Text, nullable=True)
    soap_plan = Column(Text, nullable=True)
    dialect_mappings_used = Column(JSONB, nullable=True, default=list)
    ocr_document_urls = Column(ARRAY(String), nullable=True, default=list)

    who_danger_flags = Column(JSONB, nullable=True, default=list)

    sync_status = Column(SAEnum(SyncStatus), nullable=False, default=SyncStatus.DRAFT)
    is_reviewed_by_dttb = Column(Boolean, nullable=False, default=False)
    ai_task_id = Column(String, nullable=True)

    location = Column(Geometry("POINT", srid=4326), nullable=True)

    patient = relationship("Patient", back_populates="encounters")
