# N.A.D.I. Admin Website

Next.js 16 (App Router) portal for DOH regional managers. It reads population-level
analytics from the **admin backend** (`backend/`, read-only, port `8100`): the
executive dashboard, GIS maternal-risk heatmap, ANC coverage, danger-sign trends,
FHSIS reporting, and sync/coverage audits.

> This is the **admin web UI only**. The analytics API it calls lives in
> `backend/` (its own README + compose). Patient data is written exclusively by
> the mobile backend; this portal never writes clinical data.

## Stack

- **Next.js 16.2** (App Router) · **React 19** · **TypeScript 5.7**
- **Tailwind CSS 4** · Base UI / shadcn · `recharts` (charts)
- **Leaflet + react-leaflet + leaflet.heat** — interactive GIS risk map
  (`components/risk-map.tsx`, rendered client-side via `next/dynamic`).

## Layout

```
app/                     App Router pages (dashboard, gis-heatmap, anc-analytics,
                         bhw-coverage, fhsis-reporting, sync-audit, login, …)
components/              UI components
  gis-map-area.tsx       fetches /admin/dashboard, renders the Leaflet map + legend
  risk-map.tsx           the client-only Leaflet renderer (markers + heat layer)
lib/
  api.ts                 typed client for the admin backend (NEXT_PUBLIC_API_URL)
  use-api.ts             useApi() hook (loading/error/data)
  auth.tsx               auth provider (JWT in localStorage)
```

## Configure

```bash
cp .env.example .env.local      # or .env
# NEXT_PUBLIC_API_URL — base URL of the admin backend (default http://localhost:8100)
```

## Run

```bash
npm install                     # installs deps incl. leaflet / react-leaflet
npm run dev                     # http://localhost:3000
```

You need the **admin backend** running on `:8100` and the shared DB up (see the
top-level `../README.md`). Then register and log in as an `ADMIN`:

```bash
curl -X POST http://localhost:8100/api/v1/auth/register/admin \
  -H 'Content-Type: application/json' \
  -d '{"first_name":"Region","last_name":"Admin","mobile_number":"+639170000000","password":"admin-password-12"}'
```

Sign in at <http://localhost:3000/login>, then open **GIS Maternal Risk Heatmap**.

## GIS heatmap

`components/gis-map-area.tsx` calls `api.dashboard()` and plots the real
`regional_risk_points` (lat/lon + `risk_level` from PostGIS `ST_X`/`ST_Y`) on a
Leaflet map: colored `CircleMarker`s per WHO danger-sign severity plus a
`leaflet.heat` intensity layer, auto-fit to the data. Leaflet only runs in the
browser, so the renderer is loaded with `dynamic(..., { ssr: false })`.

The map is empty until the database has synced encounters carrying coordinates
(submit visits from the mobile PWA, or use the seeded demo data).

## Build / typecheck

```bash
npx tsc --noEmit
npm run build
npm run lint
```

> If `tsc` reports *"Cannot find module 'leaflet'/'react-leaflet'"*, run
> `npm install` — those packages are declared in `package.json` but must be fetched.
