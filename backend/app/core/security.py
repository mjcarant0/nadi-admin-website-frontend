from datetime import datetime, timedelta, timezone
from functools import lru_cache
from pathlib import Path

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import get_settings

settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


@lru_cache
def _signing_key() -> str:
    """This service's RSA private key (PEM) — used to sign tokens it issues."""
    return Path(settings.JWT_PRIVATE_KEY_PATH).read_text()


@lru_cache
def _verify_keys() -> tuple[str, ...]:
    """All trusted RSA public keys (PEM): this service's own plus the peer
    backend's, so a token signed by either is accepted."""
    paths = [p.strip() for p in settings.JWT_PUBLIC_KEY_PATHS.split(",") if p.strip()]
    return tuple(Path(p).read_text() for p in paths)


def create_access_token(subject: str, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    payload = {"sub": subject, "role": role, "exp": expire}
    return jwt.encode(payload, _signing_key(), algorithm=settings.JWT_ALGORITHM)


def decode_token(token: str) -> dict:
    """Verify a token against every trusted public key. Returns {} on failure;
    callers treat an empty payload as unauthenticated."""
    for pub in _verify_keys():
        try:
            return jwt.decode(token, pub, algorithms=[settings.JWT_ALGORITHM])
        except JWTError:
            continue
    return {}
