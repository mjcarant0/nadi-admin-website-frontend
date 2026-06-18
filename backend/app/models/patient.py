import uuid

from sqlalchemy import Column, Date, DateTime, Integer, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    client_ref = Column(String, nullable=True, unique=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    mobile_number = Column(String, nullable=True)
    psgc_code = Column(String(10), nullable=True, index=True)
    date_of_birth = Column(Date, nullable=True)
    gravida = Column(Integer, nullable=False, default=1)
    para = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    encounters = relationship("Encounter", back_populates="patient")
