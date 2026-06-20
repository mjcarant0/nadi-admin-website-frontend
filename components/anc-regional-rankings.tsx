'use client'

import { Search, ArrowUpDown } from 'lucide-react'
import {
  ancRegionalCoverage,
  ancBenchmarks,
  type ANCRegionalCoverage,
  type ANCBenchmark,
} from '@/lib/mock-data'

// ─── Region Item ──────────────────────────────────────────────

function RegionItem({ region }: { region: ANCRegionalCoverage }) {
  const barColor = region.category === 'improvement' ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <div className="py-3 border-b border-slate-100 last:border-b-0">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="text-sm font-medium text-slate-900">{region.name}</div>
          <div className={`text-sm font-semibold ${region.coverageColor}`}>{region.coverage}%</div>
        </div>
        <div className="text-right text-xs text-slate-500">ANC4: {region.anc4}%</div>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${barColor}`} style={{ width: `${region.coverage}%` }} />
      </div>
    </div>
  )
}

// ─── Regional ANC Rankings ────────────────────────────────────

export function ANCRegionalRankings() {
  const regions: ANCRegionalCoverage[] = ancRegionalCoverage
  const improvementRegions = regions.filter((r) => r.category === 'improvement')
  const urgentRegions = regions.filter((r) => r.category === 'urgent')

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Regional ANC Coverage</h3>
            <p className="text-sm text-slate-600">Ranked by completion rate</p>
          </div>
          <button className="flex items-center gap-1 px-3 py-1 text-sm text-slate-600 hover:bg-slate-100 rounded">
            <ArrowUpDown className="w-4 h-4" />
            Sort
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search region..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none"
          />
        </div>
      </div>

      {improvementRegions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3">Needs Improvement</h4>
          {improvementRegions.map((region) => (
            <RegionItem key={region.name} region={region} />
          ))}
        </div>
      )}

      {urgentRegions.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3">
            Critical — Urgent Action
          </h4>
          {urgentRegions.map((region) => (
            <RegionItem key={region.name} region={region} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Benchmark Comparison ─────────────────────────────────────

export function BenchmarkComparisonCard() {
  const benchmarks: ANCBenchmark[] = ancBenchmarks

  // Derive YoY improvement from the data
  const current = benchmarks.find((b) => b.name.includes('Current'))
  const prev = benchmarks.find((b) => b.name.includes('2024'))
  const whoTarget = benchmarks.find((b) => b.name.includes('WHO'))
  const yoy = current && prev ? (current.value - prev.value).toFixed(1) : '—'
  const gap = current && whoTarget ? (whoTarget.value - current.value).toFixed(1) : '—'

  const colorMap: Record<string, string> = {
    '#3b82f6': 'bg-blue-500',
    '#94a3b8': 'bg-slate-400',
    '#eab308': 'bg-yellow-500',
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-1">Benchmark Comparison</h3>
      <p className="text-sm text-slate-600 mb-6">Philippines vs Regional Standards</p>

      <div className="space-y-6">
        {benchmarks.map((b) => (
          <div key={b.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-900">{b.name}</span>
              <span
                className="text-sm font-bold"
                style={{ color: b.color === '#94a3b8' ? '#64748b' : b.color }}
              >
                {b.value}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={colorMap[b.color] ?? 'bg-slate-400'}
                style={{ width: `${b.value}%`, height: '100%' }}
              />
            </div>
          </div>
        ))}

        <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm text-slate-700">
            <span className="font-semibold text-green-600">+{yoy} pts YoY improvement</span>
            <br />
            <span className="text-slate-500">{gap} pts gap to WHO target</span>
          </span>
        </div>
      </div>
    </div>
  )
}
