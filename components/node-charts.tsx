import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar, ResponsiveContainer, Cell } from 'recharts'
import {
  networkUptimeData,
  resourceUtilizationData,
  uptimeHistoryData,
  type NetworkUptimePoint,
  type ResourceUtilizationPoint,
  type UptimeHistoryEntry,
  type UptimeStatus,
} from '@/lib/mock-data'

// ─── Network Uptime — 7 Days ──────────────────────────────────

export function NetworkUptimeChart() {
  const data: NetworkUptimePoint[] = networkUptimeData

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Network Uptime — 7 Days</h3>
      <p className="text-sm text-slate-600 mb-4">Daily uptime percentage across all regions</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="day" stroke="#64748b" />
          <YAxis stroke="#64748b" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ncr" stroke="#22c55e" strokeWidth={2} dot={false} name="NCR" />
          <Line type="monotone" dataKey="national" stroke="#3b82f6" strokeWidth={2} dot={false} name="National Avg" />
          <Line type="monotone" dataKey="caraga" stroke="#eab308" strokeWidth={2} dot={false} name="Caraga" />
          <Line type="monotone" dataKey="barmm" stroke="#dc2626" strokeWidth={2} dot={false} name="BARMM" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Resource Utilization ─────────────────────────────────────

export function ResourceUtilizationChart() {
  const data: ResourceUtilizationPoint[] = resourceUtilizationData

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Resource Utilization by Region
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="region" stroke="#64748b" />
          <YAxis
            stroke="#64748b"
            label={{ value: '% Utilization', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="cpu" fill="#22c55e" name="CPU %" />
          <Bar dataKey="memory" fill="#3b82f6" name="Memory %" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-2">
        <div className="w-0.5 h-6 bg-red-600" />
        <span>80% threshold</span>
      </div>
    </div>
  )
}

// ─── 90-Day Uptime History Grid ───────────────────────────────

function getUptimeColor(status: UptimeStatus): string {
  if (status === 'online') return 'bg-green-500'
  if (status === 'degraded') return 'bg-yellow-500'
  return 'bg-red-500'
}

export function UptimeHistoryGrid() {
  const regions: UptimeHistoryEntry[] = uptimeHistoryData

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        90-Day Uptime History by Region
      </h3>
      <p className="text-sm text-slate-600 mb-4">
        Each segment represents 1 day — green: online, amber: degraded, red: offline, gray: no data
      </p>
      <div className="space-y-3">
        {regions.map((region) => (
          <div key={region.id} className="flex items-center gap-3">
            <div className="w-24 text-sm font-medium text-slate-900">{region.name}</div>
            <div className="flex gap-0.5">
              {region.uptime.map((status, i) => (
                <div
                  key={i}
                  className={`w-1 h-8 ${getUptimeColor(status)}`}
                  title={status}
                />
              ))}
            </div>
            <div className="w-16 text-right text-sm font-semibold text-slate-900">
              {region.rate}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-200 flex gap-4">
        {([
          { color: 'bg-green-500', label: 'Online' },
          { color: 'bg-yellow-500', label: 'Degraded' },
          { color: 'bg-red-500', label: 'Offline' },
          { color: 'bg-gray-400', label: 'No Data' },
        ] as const).map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2 text-xs">
            <div className={`w-3 h-3 ${color} rounded`} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
