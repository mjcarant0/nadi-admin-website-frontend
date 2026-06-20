import { ComposedChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar, ResponsiveContainer, Cell } from 'recharts'
import {
  syncActivityData,
  syncLatencyData,
  syncValidationData,
  type SyncActivityPoint,
  type SyncLatencyPoint,
  type SyncValidationPoint,
} from '@/lib/mock-data'

// ─── Sync Activity — Last 24 Hours ───────────────────────────

export function SyncActivityChart() {
  const data: SyncActivityPoint[] = syncActivityData

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Sync Activity — Last 24 Hours</h3>
          <p className="text-sm text-slate-600 mt-1">
            Successful syncs, failed syncs, and upload volume across all network nodes
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-full">
            Success
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-full">
            Failed
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-full">
            Volume
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" stroke="#64748b" />
          <YAxis
            yAxisId="left"
            stroke="#64748b"
            label={{ value: 'Syncs', angle: -90, position: 'insideLeft' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#64748b"
            label={{ value: 'Failures', angle: 90, position: 'insideRight' }}
          />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="success"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            name="Success"
          />
          <Bar yAxisId="right" dataKey="failed" fill="#ec4899" name="Failed" />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="volume"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Volume"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Sync Latency by Region ───────────────────────────────────

export function SyncLatencyChart() {
  const data: SyncLatencyPoint[] = syncLatencyData

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Sync Latency by Region</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" stroke="#64748b" />
          <YAxis dataKey="region" type="category" stroke="#64748b" width={100} />
          <Tooltip />
          <Bar dataKey="latency" fill="#3b82f6" radius={[0, 8, 8, 0]} name="Latency (ms)">
            {data.map((entry, idx) => (
              <Cell
                key={idx}
                fill={
                  entry.latency > 300
                    ? '#dc2626'
                    : entry.latency > 200
                    ? '#eab308'
                    : '#22c55e'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded" />
          <span>300ms threshold</span>
        </div>
      </div>
    </div>
  )
}

// ─── Validation Outcomes — 7 Days ─────────────────────────────

export function ValidationOutcomesChart() {
  const data: SyncValidationPoint[] = syncValidationData

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Validation Outcomes — 7 Days</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="day" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Legend />
          <Bar dataKey="passed" stackId="a" fill="#22c55e" name="Passed" />
          <Bar dataKey="warnings" stackId="a" fill="#eab308" name="Warnings" />
          <Bar dataKey="rejected" stackId="a" fill="#dc2626" name="Rejected" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
