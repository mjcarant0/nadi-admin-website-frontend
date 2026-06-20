'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  executiveANCTrend,
  executiveDangerSigns,
  executivePerformanceMetrics,
  executivePerformancePie,
  executiveRegionalRankings,
  executiveSystemStatus,
  type ANCTrendDataPoint,
  type DangerSignCategory,
  type PerformanceMetric,
  type PerformancePieSlice,
  type RegionalRanking,
  type SystemStatusItem,
} from '@/lib/mock-data'

// ─── ANC Coverage Trend ───────────────────────────────────────

export function ANCCoverageTrendChart() {
  const data: ANCTrendDataPoint[] = executiveANCTrend

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm col-span-2">
      <h3 className="text-lg font-bold text-slate-900 mb-6">National ANC Coverage Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis stroke="#64748b" style={{ fontSize: '12px' }} domain={[70, 95]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px' }}
          />
          <Line type="monotone" dataKey="anc1" stroke="#2563eb" strokeWidth={3} dot={false} name="ANC1" />
          <Line type="monotone" dataKey="anc4" stroke="#f59e0b" strokeWidth={3} dot={false} name="ANC4+" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Performance Breakdown ────────────────────────────────────

export function PerformanceBreakdownChart() {
  const bars: PerformanceMetric[] = executivePerformanceMetrics
  const pieData: PerformancePieSlice[] = executivePerformancePie

  // Compute average from real data
  const avg = (bars.reduce((sum, m) => sum + m.value, 0) / bars.length).toFixed(1)

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm col-span-1">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Performance Breakdown</h3>
      <div className="space-y-3 mb-6">
        {bars.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm font-medium text-slate-600">{item.name}</span>
              <span className="text-sm font-bold text-slate-900">{item.value}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xl font-bold text-slate-900">{avg}%</span>
            <span className="text-xs text-slate-500">Avg</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Danger Signs ─────────────────────────────────────────────

export function DangerSignsChart() {
  const raw: DangerSignCategory[] = executiveDangerSigns
  const sortedData = [...raw].sort((a, b) => b.value - a.value)

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm col-span-1">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Danger Signs Reported</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={true} vertical={false} />
          <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis type="category" dataKey="name" width={110} stroke="#64748b" style={{ fontSize: '11px' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px' }}
          />
          <Bar dataKey="value" fill="#dc2626" radius={[0, 4, 4, 0]}>
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Regional Rankings ────────────────────────────────────────

export function RegionalRankingsCard() {
  const rankings: RegionalRanking[] = executiveRegionalRankings
  const top = rankings.filter((r) => r.category === 'top')
  const needsAttention = rankings.filter((r) => r.category === 'needs_attention')

  const getColor = (coverage: number) => {
    if (coverage >= 90) return { text: 'text-green-600', bar: 'bg-green-600' }
    if (coverage >= 70) return { text: 'text-orange-600', bar: 'bg-orange-600' }
    return { text: 'text-red-600', bar: 'bg-red-600' }
  }

  const RegionRow = ({ region }: { region: RegionalRanking }) => {
    const { text, bar } = getColor(region.coverage)
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-700">{region.name}</span>
          <span className={`text-sm font-bold ${text}`}>{region.coverage}%</span>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div className={`${bar} h-full`} style={{ width: `${region.coverage}%` }} />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Regional ANC Rankings</h3>

      <div className="space-y-4">
        {top.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3">Top Performers</h4>
            <div className="space-y-3 mt-3">
              {top.map((r) => (
                <RegionRow key={r.name} region={r} />
              ))}
            </div>
          </div>
        )}

        {needsAttention.length > 0 && (
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3">Needs Attention</h4>
            <div className="space-y-3 mt-3">
              {needsAttention.map((r) => (
                <RegionRow key={r.name} region={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── System Status ────────────────────────────────────────────

const STATUS_DOT: Record<SystemStatusItem['statusColor'], string> = {
  green: 'bg-green-600',
  yellow: 'bg-yellow-500',
  red: 'bg-red-600',
}

const STATUS_TEXT: Record<SystemStatusItem['statusColor'], string> = {
  green: 'text-green-600',
  yellow: 'text-yellow-600',
  red: 'text-red-600',
}

export function SystemStatusCard() {
  const items: SystemStatusItem[] = executiveSystemStatus

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-4">System Status</h3>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`flex items-center justify-between pb-4 ${
              idx < items.length - 1 ? 'border-b border-slate-200' : ''
            }`}
          >
            <span className="text-sm text-slate-700">{item.label}</span>
            {item.detail ? (
              <span className="text-xs font-semibold text-slate-700">{item.detail}</span>
            ) : (
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 ${STATUS_DOT[item.statusColor]} rounded-full`} />
                <span className={`text-xs font-semibold ${STATUS_TEXT[item.statusColor]}`}>
                  {item.status}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
