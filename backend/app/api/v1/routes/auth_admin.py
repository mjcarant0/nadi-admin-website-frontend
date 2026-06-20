from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db
from app.core.security import create_access_token, hash_password, verify_password
from app.models.base_enums import UserRole
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Admin Authentication"])


class AdminCreate(BaseModel):
    first_name: str
    last_name: str
    mobile_number: str
    password: str


class AdminLogin(BaseModel):
    mobile_number: str
    password: str


@router.post("/register/admin", status_code=status.HTTP_201_CREATED)
async def register_admin(data: AdminCreate, db: AsyncSession = Depends(get_db)):
    if len(data.password) < 12:
        raise HTTPException(400, "Admin password must be at least 12 characters")
    user = User(
        first_name=data.first_name,
        last_name=data.last_name,
        mobile_number=data.mobile_number,
        hashed_password=hash_password(data.password),
        role=UserRole.ADMIN,
    )
    db.add(user)
    await db.commit()
    return {"id": str(user.id), "role": user.role.value}


@router.post("/login")
async def admin_login(data: AdminLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User).where(User.mobile_number == data.mobile_number)
    )
    user = result.scalar_one_or_none()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid credentials")
    if user.role != UserRole.ADMIN:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Not an admin account")
    if not user.is_active:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Account deactivated")
    token = create_access_token(subject=str(user.id), role=user.role.value)
    return {"access_token": token, "token_type": "bearer", "role": user.role.value}
