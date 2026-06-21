'use client'

import dynamic from 'next/dynamic'

import { api } from '@/lib/api'
import { useApi } from '@/lib/use-api'

// Leaflet only runs in the browser, so the actual renderer is loaded client-side
// (no SSR) to avoid `window is not defined` during Next.js server rendering.
const RiskMap = dynamic(() => import('./risk-map').then((m) => m.RiskMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-slate-400">
      Loading map…
    </div>
  ),
})

export function GISMapArea() {
  // /admin/dashboard returns regional_risk_points: real lat/lon + risk_level from
  // PostGIS (ST_X/ST_Y over synced encounters).
  const { data, loading, error } = useApi(() => api.dashboard(), [])
  const points = data?.regional_risk_points ?? []
  const plotted = points.filter((p) => p.latitude != null && p.longitude != null)

  return (
    <div className="relative bg-blue-50 rounded-lg border border-slate-200 aspect-video overflow-hidden">
      {/* Interactive map (or status fallback) */}
      <div className="w-full h-full">
        {error ? (
          <div className="w-full h-full flex items-center justify-center text-center">
            <div>
              <p className="text-slate-500 font-medium">Map data unavailable</p>
              <p className="text-slate-400 text-sm">{error}</p>
            </div>
          </div>
        ) : loading ? (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            Loading risk coordinates…
          </div>
        ) : (
          <RiskMap points={points} />
        )}
      </div>

      {/* Plotted-points badge — top right (above Leaflet panes via z-index) */}
      {!loading && !error && (
        <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg border border-slate-200 shadow-md px-3 py-2">
          <p className="text-xs text-slate-500">Plotted risk points</p>
          <p className="text-lg font-semibold text-slate-900">{plotted.length}</p>
        </div>
      )}

      {/* Floating Legend - Bottom Left */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg border border-slate-200 p-4 shadow-md w-56">
        <h4 className="font-semibold text-slate-900 text-sm mb-3">Risk Intensity</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-xs text-slate-700">Critical (Severe Preeclampsia)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-xs text-slate-700">High (Hypertension)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-slate-700">Moderate (Hypoxia / FHR / Sepsis)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="text-xs text-slate-700">Low / None</span>
          </div>
        </div>
      </div>
    </div>
  )
}
