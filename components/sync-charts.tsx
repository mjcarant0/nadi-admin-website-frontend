import { ComposedChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar, ResponsiveContainer, Cell } from 'recharts'

const syncData = [
  { time: '00:00', success: 1500, failed: 150, volume: 0.3 },
  { time: '02:00', success: 1800, failed: 120, volume: 0.4 },
  { time: '04:00', success: 2100, failed: 250, volume: 0.5 },
  { time: '06:00', success: 2400, failed: 320, volume: 0.6 },
  { time: '08:00', success: 2800, failed: 180, volume: 0.8 },
  { time: '10:00', success: 2600, failed: 140, volume: 0.7 },
  { time: '12:00', success: 2900, failed: 200, volume: 0.9 },
  { time: '14:00', success: 2700, failed: 280, volume: 0.75 },
  { time: '16:00', success: 2500, failed: 160, volume: 0.65 },
  { time: '18:00', success: 2800, failed: 120, volume: 0.8 },
  { time: '20:00', success: 2400, failed: 90, volume: 0.55 },
  { time: '22:00', success: 2100, failed: 70, volume: 0.4 }
]

const latencyData = [
  { region: 'NCR', latency: 68 },
  { region: 'C. Luzon', latency: 112 },
  { region: 'CALABARZON', latency: 284 },
  { region: 'Davao', latency: 104 },
  { region: 'E. Visayas', latency: 341 }
]

const validationData = [
  { day: 'Jun 1', passed: 3800, warnings: 400, rejected: 150 },
  { day: 'Jun 2', passed: 3600, warnings: 380, rejected: 180 },
  { day: 'Jun 3', passed: 4000, warnings: 420, rejected: 200 },
  { day: 'Jun 4', passed: 4100, warnings: 450, rejected: 220 },
  { day: 'Jun 5', passed: 4200, warnings: 480, rejected: 180 },
  { day: 'Jun 6', passed: 4000, warnings: 500, rejected: 240 },
  { day: 'Jun 7', passed: 4100, warnings: 520, rejected: 290 }
]

export function SyncActivityChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Sync Activity — Last 24 Hours</h3>
          <p className="text-sm text-slate-600 mt-1">Successful syncs, failed syncs, and upload volume across all network nodes</p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-full">Success</span>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-full">Failed</span>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-full">Volume</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={syncData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" stroke="#64748b" />
          <YAxis yAxisId="left" stroke="#64748b" label={{ value: 'Syncs', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" stroke="#64748b" label={{ value: 'Failures', angle: 90, position: 'insideRight' }} />
          <Tooltip />
          <Line yAxisId="left" type="monotone" dataKey="success" stroke="#22c55e" strokeWidth={2} dot={false} />
          <Bar yAxisId="right" dataKey="failed" fill="#ec4899" />
          <Line yAxisId="left" type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export function SyncLatencyChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Sync Latency by Region</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={latencyData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" stroke="#64748b" />
          <YAxis dataKey="region" type="category" stroke="#64748b" width={100} />
          <Tooltip />
          <Bar dataKey="latency" fill="#3b82f6" radius={[0, 8, 8, 0]}>
            {latencyData.map((entry, idx) => (
              <Cell key={idx} fill={entry.latency > 300 ? '#dc2626' : entry.latency > 200 ? '#eab308' : '#22c55e'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded"></div>
          <span>300ms threshold</span>
        </div>
      </div>
    </div>
  )
}

export function ValidationOutcomesChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Validation Outcomes — 7 Days</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={validationData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="day" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Legend />
          <Bar dataKey="passed" stackId="a" fill="#22c55e" />
          <Bar dataKey="warnings" stackId="a" fill="#eab308" />
          <Bar dataKey="rejected" stackId="a" fill="#dc2626" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
