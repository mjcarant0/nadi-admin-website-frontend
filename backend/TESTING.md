# Testing — Admin Backend (read-only analytics API)

This service is **read-only**: it never writes patient data and **owns no
migrations** — it attaches to the shared `nadi_db` created and migrated by the
mobile backend. So "testing" it means: bring up the shared DB + mobile backend
first, then verify the analytics endpoints return data.

## Prerequisites

- **Docker Desktop** (the service has its own `docker-compose.yml`), **or** Python
  3.11+ with deps installed (`pip install -e .` / `uv sync`) for a native run.
- The **shared PostGIS up and migrated** by the mobile backend, and ideally a few
  **synced encounters** so the analytics return non-empty rows (the migrate step
  seeds demo patients + edge nodes).
- An **`ADMIN` JWT** — every `/api/v1/admin/*` route requires it. The service's
  `SECRET_KEY` must match the mobile backend so tokens verify.

> There is no automated pytest suite yet (pytest is configured in `pyproject.toml`,
> `testpaths = ["tests"]`, but no `tests/` directory exists). Verify via the smoke
> tests below; add `tests/` here when unit coverage is introduced.

## Bring it up

```bash
# 1. Shared DB + mobile backend first (from the mobile repo) — see ../../DEMO.md
#    or nadi-mobile-app-frontend/backend/README.md.
# 2. Then this service:
cp .env.example .env          # SECRET_KEY must match the mobile backend
docker compose up -d          # admin_api on :8100
```

Native alternative: `python -m uvicorn app.main:app --port 8100` from this directory
with `.env` pointing `DATABASE_URL` at the shared DB.

- Health: <http://localhost:8100/health>  · Docs: <http://localhost:8100/docs>

## Smoke test the analytics

```bash
# Register + log in an admin to get a token:
curl -X POST http://localhost:8100/api/v1/auth/register/admin -H 'Content-Type: application/json' \
  -d '{"first_name":"Region","last_name":"Admin","mobile_number":"+639170000000","password":"admin-password-12"}'
TOKEN=$(curl -s -X POST http://localhost:8100/api/v1/auth/login -H 'Content-Type: application/json' \
  -d '{"mobile_number":"+639170000000","password":"admin-password-12"}' | jq -r .access_token)

BASE=http://localhost:8100/api/v1/admin
for p in dashboard heatmap coverage anc-analytics danger-sign-trend cohort-analytics node-health; do
  echo "== $p =="; curl -s -H "Authorization: Bearer $TOKEN" "$BASE/$p" | jq .
done
```

Expected: `200` with real (if sparse) data; `node-health` shows the seeded demo
nodes immediately; empty datasets return **empty arrays**, not errors; a missing/
non-ADMIN token returns `401`/`403`.
