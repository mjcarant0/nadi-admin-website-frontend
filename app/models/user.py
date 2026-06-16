import uuid

from sqlalchemy import Boolean, Column
from sqlalchemy import Enum as SAEnum
from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base
from app.models.base_enums import UserRole


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    mobile_number = Column(String, nullable=True, unique=True)
    hashed_password = Column(String, nullable=False)
    role = Column(SAEnum(UserRole), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)

    bhw_accreditation_number = Column(String, nullable=True, unique=True)
    assigned_barangay_psgc = Column(String(10), nullable=True)
    supervising_dttb_id = Column(UUID(as_uuid=True), nullable=True)

    prc_license_number = Column(String, nullable=True, unique=True)
    assigned_municipality_psgc = Column(String(10), nullable=True)
