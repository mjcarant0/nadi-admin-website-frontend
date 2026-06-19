'use client'

import { Search, ArrowRight, AlertCircle, Eye } from 'lucide-react'
import {
  regionalRiskIndex,
  type RegionalRiskEntry,
  type RiskLevel,
} from '@/lib/mock-data'

// ─── Region Item ──────────────────────────────────────────────

function RegionItem({
  region,
  showDetails = false,
}: {
  region: RegionalRiskEntry
  showDetails?: boolean
}) {
  const textColor =
    region.percentage <= 60
      ? 'text-red-600'
      : region.percentage <= 75
      ? 'text-orange-600'
      : region.percentage <= 90
      ? 'text-blue-600'
      : 'text-green-600'

  return (
    <div className="border-b border-slate-100 py-3 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-900">{region.name}</span>
        <span className={`text-sm font-bold ${textColor}`}>{region.percentage}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-1.5">
        <div
          className={`${region.color} h-1.5 rounded-full`}
          style={{ width: `${region.percentage}%` }}
        />
      </div>
      {showDetails && region.hotspots != null && region.dangerSigns != null && (
        <p className="text-xs text-slate-500 mt-2">
          {region.hotspots} hotspots • {region.dangerSigns} danger signs
        </p>
      )}
    </div>
  )
}

// ─── Regional Risk Index ──────────────────────────────────────

const RISK_LABELS: Record<RiskLevel, string> = {
  critical: 'Critical Risk',
  high: 'High Risk',
  moderate: 'Moderate Risk',
  low: 'Low Risk (Top Performers)',
}

export function RegionalRiskIndex() {
  const allRegions: RegionalRiskEntry[] = regionalRiskIndex

  const grouped = (Object.keys(RISK_LABELS) as RiskLevel[]).reduce<
    Record<RiskLevel, RegionalRiskEntry[]>
  >((acc, level) => {
    acc[level] = allRegions.filter((r) => r.riskLevel === level)
    return acc
  }, { critical: [], high: [], moderate: [], low: [] })

  // Pick the highest-risk critical region for the detail card
  const topCritical = grouped.critical[0]
  const nationalAvg =
    allRegions.reduce((s, r) => s + r.percentage, 0) / allRegions.length

  return (
    <div className="bg-white rounded-lg border border-slate-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Regional Risk Index</h3>
        <button className="text-xs text-slate-600 hover:text-slate-900 font-medium">Sort</button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search region or province..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Scrollable Region List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {(Object.entries(grouped) as [RiskLevel, RegionalRiskEntry[]][]).map(
          ([level, regions]) =>
            regions.length > 0 ? (
              <div key={level}>
                <h4 className="text-xs font-semibold uppercase text-slate-500 mb-2">
                  {RISK_LABELS[level]}
                </h4>
                <div className="space-y-1">
                  {regions.map((r) => (
                    <RegionItem
                      key={r.name}
                      region={r}
                      showDetails={level === 'critical'}
                    />
                  ))}
                </div>
              </div>
            ) : null
        )}
      </div>

      {/* Fixed Bottom Card — highest-risk critical region */}
      {topCritical && (
        <div className="border-t border-slate-200 p-4 bg-slate-50">
          <div className="bg-white rounded-lg p-3 border border-red-200">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-slate-900 text-sm">
                {topCritical.name} — Risk Detail
              </h4>
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                Critical
              </span>
            </div>

            <div className="space-y-2 mb-3 text-sm">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600">ANC Coverage</span>
                  <span className="font-semibold text-red-600">{topCritical.percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div
                    className="bg-red-500 h-1.5 rounded-full"
                    style={{ width: `${topCritical.percentage}%` }}
                  />
                </div>
              </div>
              {topCritical.dangerSigns != null && (
                <div className="flex justify-between text-slate-600">
                  <span>Danger Signs</span>
                  <span className="font-semibold text-slate-900">
                    {topCritical.dangerSigns} cases
                  </span>
                </div>
              )}
              {topCritical.hotspots != null && (
                <div className="flex justify-between text-slate-600">
                  <span>Active Hotspots</span>
                  <span className="font-semibold text-slate-900">
                    {topCritical.hotspots} clusters
                  </span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>vs National Avg</span>
                <span className="font-semibold text-red-600">
                  -{(nationalAvg - topCritical.percentage).toFixed(1)} pts
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-100">
                Drill Down
              </button>
              <button className="flex-1 px-3 py-2 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800">
                View Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
