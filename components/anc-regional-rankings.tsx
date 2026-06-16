'use client'

import { Search, ArrowUpDown } from 'lucide-react'

interface RegionData {
  name: string
  coverage: number
  coverageColor: string
  anc4: number
  category: 'improvement' | 'urgent'
}

const regions: RegionData[] = [
  { name: 'MIMAROPA', coverage: 72.8, coverageColor: 'text-yellow-600', anc4: 61.2, category: 'improvement' },
  { name: 'Bicol Region', coverage: 74.1, coverageColor: 'text-yellow-600', anc4: 62.8, category: 'improvement' },
  { name: 'Eastern Visayas', coverage: 63.4, coverageColor: 'text-red-600', anc4: 48.1, category: 'urgent' },
  { name: 'Zamboanga Peninsula', coverage: 64.8, coverageColor: 'text-red-600', anc4: 49.3, category: 'urgent' },
  { name: 'Caraga', coverage: 58.9, coverageColor: 'text-red-600', anc4: 43.7, category: 'urgent' },
  { name: 'BARMM', coverage: 52.1, coverageColor: 'text-red-600', anc4: 36.4, category: 'urgent' },
]

function RegionItem({ region }: { region: RegionData }) {
  const barWidth = (region.coverage / 100) * 100
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
        <div className={`h-full ${barColor}`} style={{ width: `${barWidth}%` }}></div>
      </div>
    </div>
  )
}

export function ANCRegionalRankings() {
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

      {/* Needs Improvement Section */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3">Needs Improvement</h4>
        {improvementRegions.map((region) => (
          <RegionItem key={region.name} region={region} />
        ))}
      </div>

      {/* Critical Urgent Action Section */}
      <div>
        <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3">Critical — Urgent Action</h4>
        {urgentRegions.map((region) => (
          <RegionItem key={region.name} region={region} />
        ))}
      </div>
    </div>
  )
}

export function BenchmarkComparisonCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-1">Benchmark Comparison</h3>
      <p className="text-sm text-slate-600 mb-6">Philippines vs Regional Standards</p>

      <div className="space-y-6">
        {/* Philippines Current */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-900">Philippines (Current)</span>
            <span className="text-sm font-bold text-blue-600">87.4%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: '87.4%' }}></div>
          </div>
        </div>

        {/* WHO Target */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-900">WHO Target (95%)</span>
            <span className="text-sm font-bold text-slate-600">95.0%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-400" style={{ width: '95%' }}></div>
          </div>
        </div>

        {/* SE Asia Average */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-900">SE Asia Average</span>
            <span className="text-sm font-bold text-slate-600">84.1%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500" style={{ width: '84.1%' }}></div>
          </div>
        </div>

        {/* Philippines 2024 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-900">Philippines (2024)</span>
            <span className="text-sm font-bold text-slate-600">85.3%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-400" style={{ width: '85.3%' }}></div>
          </div>
        </div>

        {/* Improvement indicator */}
        <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm text-slate-700">
            <span className="font-semibold text-green-600">+2.1 pts YoY improvement</span>
            <br />
            <span className="text-slate-500">7.6 pts gap to WHO target</span>
          </span>
        </div>
      </div>
    </div>
  )
}
