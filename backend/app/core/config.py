from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Database (shared central PostGIS — admin reads only)
    DATABASE_URL: str
    DATABASE_SYNC_URL: str = ""

    # Auth — same SECRET_KEY/ALGORITHM as the mobile backend so JWTs verify,
    # but this service only issues/accepts ADMIN-role tokens.
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
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
