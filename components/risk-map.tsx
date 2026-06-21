'use client'

// Interactive Leaflet renderer for live maternal-risk coordinates. This module
// touches `window`/`document` (Leaflet), so it must only ever be loaded via a
// `dynamic(() => import('./risk-map'), { ssr: false })` boundary — never imported
// directly into a server-rendered tree.

import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.heat'

import type { RiskPoint } from '@/lib/api'

// Geographic centre of the Philippines + a country-level zoom.
const PH_CENTER: [number, number] = [12.8797, 121.774]
const PH_ZOOM = 6

// Map a WHO danger-sign risk level to the legend's colour scale.
function riskColor(risk: string): string {
  switch ((risk || '').toUpperCase()) {
    case 'SEVERE_PREECLAMPSIA':
      return '#dc2626' // red — critical
    case 'HYPERTENSION':
      return '#f97316' // orange — high
    case 'HYPOXIA':
    case 'ABNORMAL_FHR':
    case 'INFECTION_SEPSIS':
      return '#3b82f6' // blue — moderate
    default:
      return '#16a34a' // green — low / none
  }
}

// Severity weight for the heat layer intensity (0–1).
function riskWeight(risk: string): number {
  switch ((risk || '').toUpperCase()) {
    case 'SEVERE_PREECLAMPSIA':
      return 1.0
    case 'HYPERTENSION':
      return 0.7
    case 'HYPOXIA':
    case 'ABNORMAL_FHR':
    case 'INFECTION_SEPSIS':
      return 0.5
    default:
      return 0.2
  }
}

function plottable(points: RiskPoint[]) {
  return points.filter(
    (p): p is RiskPoint & { latitude: number; longitude: number } =>
      typeof p.latitude === 'number' && typeof p.longitude === 'number',
  )
}

// Heat intensity layer (leaflet.heat plugin augments L at runtime; it has no
// bundled types, hence the local cast).
function HeatLayer({ points }: { points: RiskPoint[] }) {
  const map = useMap()
  useEffect(() => {
    const pts = plottable(points).map(
      (p) => [p.latitude, p.longitude, riskWeight(p.risk_level)] as [number, number, number],
    )
    if (pts.length === 0) return
    const layer = (L as unknown as {
      heatLayer: (latlngs: [number, number, number][], opts?: Record<string, unknown>) => L.Layer
    }).heatLayer(pts, { radius: 25, blur: 18, maxZoom: 12 })
    layer.addTo(map)
    return () => {
      map.removeLayer(layer)
    }
  }, [map, points])
  return null
}

// Fit the viewport to the plotted points so the map opens on the data.
function FitToPoints({ points }: { points: RiskPoint[] }) {
  const map = useMap()
  useEffect(() => {
    const pts = plottable(points)
    if (pts.length === 0) return
    const bounds = L.latLngBounds(pts.map((p) => [p.latitude, p.longitude] as [number, number]))
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 11 })
  }, [map, points])
  return null
}

export function RiskMap({ points }: { points: RiskPoint[] }) {
  const pts = plottable(points)
  return (
    <MapContainer
      center={PH_CENTER}
      zoom={PH_ZOOM}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HeatLayer points={points} />
      <FitToPoints points={points} />
      {pts.map((p) => (
        <CircleMarker
          key={p.encounter_id}
          center={[p.latitude, p.longitude]}
          radius={7}
          pathOptions={{
            color: riskColor(p.risk_level),
            fillColor: riskColor(p.risk_level),
            fillOpacity: 0.7,
            weight: 1,
          }}
        >
          <Popup>
            <div className="text-xs">
              <div className="font-semibold">{p.risk_level}</div>
              {p.psgc_code && <div>PSGC: {p.psgc_code}</div>}
              <div>{new Date(p.timestamp).toLocaleString()}</div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
