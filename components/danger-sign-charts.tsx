'use client'

import {
  ComposedChart,
  LineChart,
  BarChart,
  PieChart,
  Pie,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import {
  dangerSignTimeSeries,
  dangerSignRegionalDistribution,
  dangerSignTypeDistribution,
  type DangerSignRegionalDistribution,
  type DangerSignTypeDistribution,
} from '@/lib/mock-data'

// ─── 12-Month Time Series ─────────────────────────────────────

// One plotted line: a data key plus its label/colour. Defaults reproduce the
// original mock series; the live page passes the real WHO danger-sign taxonomy.
export interface DangerSeries {
  key: string
  name: string
  color: string
}

const DEFAULT_DANGER_SERIES: DangerSeries[] = [
  { key: 'preeclampsia', name: 'Preeclampsia', color: '#ef4444' },
  { key: 'hemorrhage', name: 'Hemorrhage', color: '#f59e0b' },
  { key: 'other', name: 'Other Signs', color: '#9ca3af' },
]

export function DangerSignTimeSeriesChart({
  data = dangerSignTimeSeries as unknown as Array<Record<string, number | string>>,
  series = DEFAULT_DANGER_SERIES,
  xKey = 'date',
}: {
  data?: Array<Record<string, number | string>>
  series?: DangerSeries[]
  xKey?: string
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Danger Sign Incidence — Monthly Time Series
        </h3>
        <p className="text-sm text-slate-500">
          Monthly case counts per WHO danger-sign type, nationwide
        </p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey={xKey} stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Legend />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={s.color}
              name={s.name}
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Regional Case Distribution ───────────────────────────────

export function RegionalCaseDistributionChart() {
  const data: DangerSignRegionalDistribution[] = dangerSignRegionalDistribution

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Regional Case Distribution</h3>
        <p className="text-sm text-slate-500">Preeclampsia &amp; hemorrhage by region</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="preeclampsia" fill="#ef4444" name="Preeclampsia" radius={[8, 8, 0, 0]} />
          <Bar dataKey="hemorrhage" fill="#f59e0b" name="Hemorrhage" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Distribution Pie ─────────────────────────────────────────

export function DangerSignDistributionChart() {
  const data: DangerSignTypeDistribution[] = dangerSignTypeDistribution

  // Total derived from data, not hardcoded
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Danger Sign Distribution</h3>
        <p className="text-sm text-slate-500">Proportion by type — Q2 2025</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => value} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <p className="text-2xl font-bold text-slate-900">{total.toLocaleString()}</p>
        <p className="text-sm text-slate-500">Total</p>
      </div>
    </div>
  )
}
