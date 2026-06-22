# N.A.D.I. Admin Website Backend

Read-only analytics API for the DOH admin portal. Queries the **same** central
PostGIS database the mobile backend writes to, but never writes patient data.
Exposes admin auth plus dashboard, GIS heatmap, ANC coverage, FHSIS export, the
secondary population-analytics views (ANC / danger-sign / cohort / node health),
and audit endpoints. All `/admin/*` routes require an `ADMIN`-role JWT.

> Migrations are owned by `NADI-mobile-app-Backend`. This service assumes the
> schema already exists. It shares the same `SECRET_KEY` so JWTs verify, but only
> issues/accepts `ADMIN` tokens.

## Layout

```
app/
├── api/v1/routes/   auth_admin, admin (dashboard, heatmap, coverage, anc/danger/cohort/node analytics, fhsis, audit)
├── core/            config, security (JWT), dependencies
├── db/              base, session (async, read-only)
├── models/          User, Patient, Encounter (+ enums) — shared schema
├── schemas/         admin, fhsis
├── services/        fhsis_service
└── main.py
```

## Run

This service has its own `docker-compose.yml`. It does **not** start a database —
it attaches read-only to the shared `nadi_db` owned and migrated by
`NADI-mobile-app-Backend`, so bring that stack's DB up first.

```bash
# 1. Start the shared DB from the mobile repo (once):
(cd ../NADI-mobile-app-Backend && docker compose up -d db migrate)

# 2. Then start the admin API from this repo:
cp .env.example .env          # SECRET_KEY must match the mobile backend's
docker compose up -d          # admin_api on port 8100
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
| GET | `/api/v1/admin/anc-analytics` | ANC1/ANC4 monthly trend, visit funnel, regional coverage |
| GET | `/api/v1/admin/danger-sign-trend` | Monthly time-series per WHO danger type + regional/type distribution |
| GET | `/api/v1/admin/cohort-analytics` | Trimester × barangay cohort breakdown |
| GET | `/api/v1/admin/node-health` | Edge node rollup KPIs + per-node rows |
| GET | `/api/v1/admin/export/fhsis` | DOH FHSIS monthly CSV/JSON |
| GET | `/api/v1/admin/export/anonymised` | Anonymised aggregate export |
| GET | `/api/v1/admin/audit/sync-log` | Per-BHW sync activity |
| GET | `/api/v1/admin/audit/bhw-coverage` | ACTIVE vs SILENT barangays |

### Secondary population analytics

The first four `anc-analytics` / `danger-sign-trend` / `cohort-analytics` /
`node-health` endpoints back the admin website's analytics pages (previously static
mockups). ANC / danger-sign / cohort are **derived** from the existing
`encounters` / `patients` tables; **node-health reads the new `edge_node_health`
table** — owned and migrated by the mobile backend (migration `0007`) and fed by its
`POST /api/v1/nodes/heartbeat` (the `migrate` step seeds demo nodes). Smoke test:

```bash
TOKEN=<admin JWT>; BASE=http://localhost:8100/api/v1/admin
for p in anc-analytics danger-sign-trend cohort-analytics node-health; do
  curl -s -H "Authorization: Bearer $TOKEN" $BASE/$p | jq .
done
```

With only the seeded demo patients the ANC/danger/cohort numbers are sparse but
real; node-health shows the seeded nodes immediately. Empty result sets return empty
arrays (graceful empty-state), not errors.
