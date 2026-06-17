import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.routes import admin, auth_admin
from app.core.config import get_settings

settings = get_settings()
logging.basicConfig(level=settings.LOG_LEVEL)

app = FastAPI(
    title="N.A.D.I. Admin Website Backend",
    version="1.0.0",
    docs_url="/docs",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

API_PREFIX = "/api/v1"
app.include_router(auth_admin.router, prefix=API_PREFIX)
app.include_router(admin.router, prefix=API_PREFIX)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logging.getLogger(__name__).error("Unhandled error: %s", exc, exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error_code": "INTERNAL_ERROR"},
    )


@app.get("/health")
async def health():
    return {"status": "ok", "service": "nadi-admin-backend"}
