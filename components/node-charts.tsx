import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar, ResponsiveContainer, Cell } from 'recharts'

const uptimeData = [
  { day: 'Jun 1', ncr: 100, national: 95, caraga: 78, barmm: 62 },
  { day: 'Jun 2', ncr: 99.8, national: 94.5, caraga: 76, barmm: 60 },
  { day: 'Jun 3', ncr: 100, national: 95, caraga: 75, barmm: 58 },
  { day: 'Jun 4', ncr: 99.9, national: 94, caraga: 72, barmm: 55 },
  { day: 'Jun 5', ncr: 100, national: 95.5, caraga: 70, barmm: 52 },
  { day: 'Jun 6', ncr: 99.8, national: 94.5, caraga: 65, barmm: 50 },
  { day: 'Jun 7', ncr: 100, national: 95, caraga: 60, barmm: 48 }
]

const resourceData = [
  { region: 'NCR', cpu: 34, memory: 42 },
  { region: 'Central Luzon', cpu: 41, memory: 48 },
  { region: 'CALABARZON', cpu: 72, memory: 65 },
  { region: 'E. Visayas', cpu: 81, memory: 94 },
  { region: 'Davao', cpu: 38, memory: 45 },
  { region: 'BARMM', cpu: 0, memory: 0 },
  { region: 'Caraga', cpu: 0, memory: 0 }
]

export function NetworkUptimeChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Network Uptime — 7 Days</h3>
      <p className="text-sm text-slate-600 mb-4">Daily uptime percentage across all regions</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={uptimeData}>
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

export function ResourceUtilizationChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Resource Utilization by Region</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={resourceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="region" stroke="#64748b" />
          <YAxis stroke="#64748b" label={{ value: '% Utilization', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="cpu" fill="#22c55e" name="CPU %" />
          <Bar dataKey="memory" fill="#3b82f6" name="Memory %" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-2">
        <div className="w-0.5 h-6 bg-red-600"></div>
        <span>80% threshold</span>
      </div>
    </div>
  )
}

export function UptimeHistoryGrid() {
  const regions = [
    { name: 'NCR', uptime: Array(90).fill(0).map((_, i) => i % 88 > 2 ? 'online' : i % 30 === 0 ? 'degraded' : 'online'), rate: '98.4%' },
    { name: 'Central Luzon', uptime: Array(90).fill(0).map((_, i) => i % 90 > 5 ? 'online' : i % 40 === 0 ? 'degraded' : 'online'), rate: '98.5%' },
    { name: 'CALABARZON', uptime: Array(90).fill(0).map((_, i) => i < 20 ? 'online' : i < 60 ? 'degraded' : 'offline'), rate: '93.3%' },
    { name: 'Eastern Visayas', uptime: Array(90).fill(0).map((_, i) => i < 30 ? 'online' : i < 70 ? 'degraded' : 'offline'), rate: '93.5%' },
    { name: 'Davao Region', uptime: Array(90).fill(0).map((_, i) => i % 89 > 3 ? 'online' : 'online'), rate: '98.0%' },
    { name: 'BARMM', uptime: Array(90).fill(0).map((_, i) => i < 40 ? 'online' : 'offline'), rate: '57.3%' },
    { name: 'Caraga', uptime: Array(90).fill(0).map((_, i) => i < 35 ? 'online' : 'offline'), rate: '58.3%' }
  ]

  const getColor = (status: string) => {
    if (status === 'online') return 'bg-green-500'
    if (status === 'degraded') return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">90-Day Uptime History by Region</h3>
      <p className="text-sm text-slate-600 mb-4">Each segment represents 1 day — green: online, amber: degraded, red: offline, gray: no data</p>
      <div className="space-y-3">
        {regions.map((region, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-24 text-sm font-medium text-slate-900">{region.name}</div>
            <div className="flex gap-0.5">
              {region.uptime.map((status, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-8 ${getColor(status)}`}
                  title={status}
                ></div>
              ))}
            </div>
            <div className="w-16 text-right text-sm font-semibold text-slate-900">{region.rate}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-200 flex gap-4">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Online</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>Degraded</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Offline</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-gray-400 rounded"></div>
          <span>No Data</span>
        </div>
      </div>
    </div>
  )
}
