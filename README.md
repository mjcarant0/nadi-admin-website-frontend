# N.A.D.I. Admin Website Backend

Read-only analytics API for the DOH admin portal. Queries the **same** central
PostGIS database the mobile backend writes to, but never writes patient data.
Exposes admin auth plus dashboard, GIS heatmap, ANC coverage, FHSIS export, and
audit endpoints. All `/admin/*` routes require an `ADMIN`-role JWT.

> Migrations are owned by `NADI-mobile-app-Backend`. This service assumes the
> schema already exists. It shares the same `SECRET_KEY` so JWTs verify, but only
> issues/accepts `ADMIN` tokens.

## Layout

```
app/
├── api/v1/routes/   auth_admin, admin (analytics)
├── core/            config, security (JWT), dependencies
├── db/              base, session (async, read-only)
├── models/          User, Patient, Encounter (+ enums) — shared schema
├── schemas/         admin, fhsis
├── services/        fhsis_service
└── main.py
```

## Run

Brought up automatically by the mobile repo's `docker compose up` as the
`admin_api` service (port 8100). Standalone:

```bash
cp .env.example .env
docker build -t nadi-admin . && docker run --env-file .env -p 8100:8100 nadi-admin
```

- API docs: http://localhost:8100/docs
- Health:   http://localhost:8100/health

## Endpoints (all require ADMIN JWT)

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/v1/auth/register/admin` | Admin registration |
| POST | `/api/v1/auth/login` | Issue ADMIN JWT |
| GET | `/api/v1/admin/dashboard` | Active pregnancies, triage queue, pending syncs, risk points |
| GET | `/api/v1/admin/heatmap` | PSGC danger-sign density (filterable) |
| GET | `/api/v1/admin/coverage` | >= 4 ANC visit coverage per barangay |
| GET | `/api/v1/admin/export/fhsis` | DOH FHSIS monthly CSV/JSON |
| GET | `/api/v1/admin/export/anonymised` | Anonymised aggregate export |
| GET | `/api/v1/admin/audit/sync-log` | Per-BHW sync activity |
| GET | `/api/v1/admin/audit/bhw-coverage` | ACTIVE vs SILENT barangays |
