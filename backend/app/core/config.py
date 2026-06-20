from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Database (shared central PostGIS — admin reads only)
    DATABASE_URL: str
    DATABASE_SYNC_URL: str = ""

    # Auth (asymmetric RS256 — no shared secret with the mobile backend).
    # This service signs ADMIN tokens with its own private key and verifies
    # tokens against every listed public key (its own + the mobile backend's).
    JWT_ALGORITHM: str = "RS256"
    JWT_PRIVATE_KEY_PATH: str = "keys/jwt_admin_private.pem"
    JWT_PUBLIC_KEY_PATHS: str = "keys/jwt_admin_public.pem,keys/jwt_mobile_public.pem"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"

    # CORS — comma-separated list of allowed frontend origins.
    CORS_ORIGINS: str = "http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()
