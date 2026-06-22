'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Cell,
} from 'recharts'
import {
  ancCoverageTrend,
  ancVisitFunnel,
  ancCohortPerformance,
  type ANCCoverageTrendPoint,
  type ANCFunnelStage,
  type ANCCohortDataPoint,
} from '@/lib/mock-data'

// ─── National ANC Coverage — Historical Trend ─────────────────

export function NationalANCCoverageTrendChart() {
  const data: ANCCoverageTrendPoint[] = ancCoverageTrend

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          National ANC Coverage — Historical Trend
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Monthly coverage rate with ANC1, ANC4+, and WHO benchmark overlay
        </p>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded">ANC1</span>
          <span className="px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded">ANC4+</span>
          <span className="px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded">WHO Target</span>
          <span className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded">
            vs 2024
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis domain={[60, 100]} stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }} />
          <Line type="monotone" dataKey="anc1" stroke="#3b82f6" strokeWidth={2} dot={false} name="ANC1" />
          <Line type="monotone" dataKey="anc4" stroke="#eab308" strokeWidth={2} dot={false} name="ANC4+" />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#ef4444"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="WHO Target"
          />
          <Line
            type="monotone"
            dataKey="py2024"
            stroke="#cbd5e1"
            strokeWidth={1}
            strokeDasharray="3 3"
            dot={false}
            name="2024"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── ANC Visit Completion Funnel ──────────────────────────────

export function ANCVisitCompletionFunnel({ data = ancVisitFunnel }: { data?: ANCFunnelStage[] }) {

  // Dropout = difference between first and last stage
  const dropout = data.length >= 2
    ? (data[0].value - data[data.length - 1].value).toFixed(1)
    : '0'

  const getFillColor = (value: number) => {
    if (value >= 80) return '#22c55e'
    if (value >= 60) return '#eab308'
    return '#ef4444'
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">ANC Visit Completion Funnel</h3>
          <p className="text-sm text-slate-600">ANC1 → ANC8 national dropout analysis</p>
        </div>
        <div className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1">
          <span>↘</span> {dropout}% dropout
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="stage" stroke="#94a3b8" />
          <YAxis domain={[0, 100]} stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getFillColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Cohort Performance by Quarter ───────────────────────────

export function CohortPerformanceChart() {
  const data: ANCCohortDataPoint[] = ancCohortPerformance

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">Cohort Performance by Quarter</h3>
        <p className="text-sm text-slate-600">Completion rates per enrollment cohort</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="quarter" stroke="#94a3b8" />
          <YAxis domain={[0, 100]} stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }} />
          <Legend />
          <Bar dataKey="anc1Rate" fill="#3b82f6" name="ANC1 Rate" radius={[4, 4, 0, 0]} />
          <Bar dataKey="anc4Rate" fill="#eab308" name="ANC4+ Rate" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
