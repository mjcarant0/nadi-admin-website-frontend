# Testing — Admin Website (Next.js)

The DOH admin portal has no unit-test suite; its quality gate is **typecheck +
lint + production build**. The data it renders is validated by the **admin
backend** (see `backend/TESTING.md`) and the mobile backend's pytest suites.

## Prerequisites

- **Node.js 20+** and npm.
- `npm install` once (pulls `leaflet` / `react-leaflet` — the GIS map fails to
  compile without them).
- To see live data while developing: the **admin backend** running on `:8100`
  (`NEXT_PUBLIC_API_URL`, default `http://localhost:8100`) with an `ADMIN` JWT, and
  the shared PostGIS populated with at least a few synced encounters. With no
  backend the pages still render from `lib/mock-data.ts` fallbacks.

## Checks

```bash
npm install
npx tsc --noEmit     # typecheck (no emit)
npm run lint         # eslint
npm run build        # next build — the real gate; fails on type or build errors
```

`npm run build` should finish with no type errors and all routes compiled. If the
GIS page errors with "Cannot find module 'leaflet'", run `npm install` first.

## Manual smoke test (with the backend up)

1. `npm run dev` → <http://localhost:3000>; register/login an `ADMIN`
   (see the repo `README.md` / `backend/README.md`).
2. `/gis-heatmap` renders an interactive Leaflet map with colored risk markers.
3. `/anc-analytics`, `/danger-sign-trend`, `/cohort-analytics`, `/node-health`,
   `/fhsis-reporting` load live data from `/api/v1/admin/*` (Network tab), not the
   static mock — empty datasets show a graceful empty state, not an error.

For the full end-to-end demo (offline field flow → risk map on reconnect), see
`../DEMO.md` at the repo root.
