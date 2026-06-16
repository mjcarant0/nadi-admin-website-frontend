'use client'

import { Search, ArrowRight, AlertCircle, Eye } from 'lucide-react'

export function RegionalRiskIndex() {
  const regions = {
    critical: [
      { name: 'BARMM', percentage: 52.1, hotspots: 6, dangerSigns: 847, color: 'bg-red-500' },
      { name: 'Caraga', percentage: 58.9, hotspots: 4, dangerSigns: 621, color: 'bg-red-500' },
      { name: 'Eastern Visayas', percentage: 63.4, hotspots: 3, dangerSigns: 534, color: 'bg-red-500' },
      { name: 'Zamboanga Peninsula', percentage: 64.8, hotspots: 5, dangerSigns: 489, color: 'bg-red-500' },
      { name: 'Davao Occidental', percentage: 67.2, hotspots: 2, dangerSigns: 312, color: 'bg-red-500' },
    ],
    high: [
      { name: 'SOCCSKSARGEN', percentage: 70.3, color: 'bg-orange-500' },
      { name: 'MIMAROPA', percentage: 72.8, color: 'bg-orange-500' },
      { name: 'Bicol Region', percentage: 74.1, color: 'bg-orange-500' },
    ],
    moderate: [
      { name: 'Cagayan Valley', percentage: 76.5, color: 'bg-blue-500' },
      { name: 'Western Visayas', percentage: 91.7, color: 'bg-green-500' },
    ],
    low: [
      { name: 'NCR', percentage: 96.8, color: 'bg-green-500' },
      { name: 'Central Luzon', percentage: 94.2, color: 'bg-green-500' },
    ],
  }

  const RegionItem = ({ region, showDetails = false }: any) => (
    <div className="border-b border-slate-100 py-3 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-900">{region.name}</span>
        <span className={`text-sm font-bold ${
          region.percentage <= 60 ? 'text-red-600' :
          region.percentage <= 75 ? 'text-orange-600' :
          region.percentage <= 90 ? 'text-blue-600' :
          'text-green-600'
        }`}>
          {region.percentage}%
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-1.5">
        <div className={`${region.color} h-1.5 rounded-full`} style={{ width: `${region.percentage}%` }}></div>
      </div>
      {showDetails && (
        <p className="text-xs text-slate-500 mt-2">{region.hotspots} hotspots • {region.dangerSigns} danger signs</p>
      )}
    </div>
  )

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
        {/* Critical Risk */}
        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-500 mb-2">Critical Risk</h4>
          <div className="space-y-1">
            {regions.critical.map((r, i) => (
              <RegionItem key={i} region={r} showDetails={true} />
            ))}
          </div>
        </div>

        {/* High Risk */}
        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-500 mb-2">High Risk</h4>
          <div className="space-y-1">
            {regions.high.map((r, i) => (
              <RegionItem key={i} region={r} />
            ))}
          </div>
        </div>

        {/* Moderate Risk */}
        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-500 mb-2">Moderate Risk</h4>
          <div className="space-y-1">
            {regions.moderate.map((r, i) => (
              <RegionItem key={i} region={r} />
            ))}
          </div>
        </div>

        {/* Low Risk */}
        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-500 mb-2">Low Risk (Top Performers)</h4>
          <div className="space-y-1">
            {regions.low.map((r, i) => (
              <RegionItem key={i} region={r} />
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Card - BARMM Risk Detail */}
      <div className="border-t border-slate-200 p-4 bg-slate-50">
        <div className="bg-white rounded-lg p-3 border border-red-200">
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-semibold text-slate-900 text-sm">BARMM — Risk Detail</h4>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">Critical</span>
          </div>

          <div className="space-y-2 mb-3 text-sm">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-600">ANC Coverage</span>
                <span className="font-semibold text-red-600">52.1%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '52.1%' }}></div>
              </div>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Danger Signs</span>
              <span className="font-semibold text-slate-900">847 cases</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Active Hotspots</span>
              <span className="font-semibold text-slate-900">6 clusters</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>vs National Avg</span>
              <span className="font-semibold text-red-600">-35.3 pts</span>
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
    </div>
  )
}
