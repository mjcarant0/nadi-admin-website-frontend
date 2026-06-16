import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const volumeData = [
  { date: 'May 9', PDF: 2, XLSX: 4, JSON: 1, CSV: 8 },
  { date: 'May 12', PDF: 3, XLSX: 5, JSON: 2, CSV: 10 },
  { date: 'May 15', PDF: 1, XLSX: 3, JSON: 1, CSV: 8 },
  { date: 'May 18', PDF: 4, XLSX: 6, JSON: 3, CSV: 12 },
  { date: 'May 21', PDF: 2, XLSX: 5, JSON: 2, CSV: 9 },
  { date: 'May 24', PDF: 5, XLSX: 7, JSON: 4, CSV: 14 },
  { date: 'May 27', PDF: 3, XLSX: 6, JSON: 2, CSV: 11 },
  { date: 'May 30', PDF: 6, XLSX: 8, JSON: 5, CSV: 16 },
  { date: 'Jun 2', PDF: 4, XLSX: 7, JSON: 3, CSV: 13 },
  { date: 'Jun 5', PDF: 2, XLSX: 5, JSON: 2, CSV: 10 },
  { date: 'Jun 7', PDF: 1, XLSX: 2, JSON: 1, CSV: 3 }
]

export function ExportStats() {
  return (
    <div className="space-y-4">
      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs text-slate-500 font-medium mb-2">This Month</p>
        <p className="text-3xl font-bold text-blue-600">247</p>
        <p className="text-xs text-slate-600 mt-1">Total Exports Generated</p>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs text-slate-500 font-medium mb-2">In Queue</p>
        <p className="text-3xl font-bold text-yellow-600">4</p>
        <p className="text-xs text-slate-600 mt-1">Pending in Queue</p>
        <p className="text-xs text-yellow-600 font-medium mt-2">Est. completion: 3 min</p>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs text-slate-500 font-medium mb-2">Volume</p>
        <p className="text-3xl font-bold text-green-600">1.4<span className="text-lg">GB</span></p>
        <p className="text-xs text-slate-600 mt-1">Total Data Exported</p>
        <p className="text-xs text-slate-500 mt-2">June 2025 cumulative</p>
      </div>

      <div className="border border-slate-200 rounded-lg p-6 bg-white">
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Permission Matrix</h4>
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-2 border border-slate-200 rounded">
            <div className="flex items-center gap-2">
              <span className="text-lg">👤</span>
              <span className="font-medium text-slate-900">National Officer</span>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-medium">All Datasets</span>
          </div>
          <div className="flex items-center justify-between p-2 border border-slate-200 rounded">
            <div className="flex items-center gap-2">
              <span className="text-lg">👤</span>
              <span className="font-medium text-slate-900">Regional Officer</span>
            </div>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">Own Region</span>
          </div>
          <div className="flex items-center justify-between p-2 border border-slate-200 rounded">
            <div className="flex items-center gap-2">
              <span className="text-lg">👤</span>
              <span className="font-medium text-slate-900">BHW Supervisor</span>
            </div>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded font-medium">BHW Only</span>
          </div>
          <div className="flex items-center justify-between p-2 border border-slate-200 rounded">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏢</span>
              <span className="font-medium text-slate-900">Facility Admin</span>
            </div>
            <span className="px-2 py-1 bg-slate-200 text-slate-700 rounded font-medium">Facility Only</span>
          </div>
          <div className="flex items-center justify-between p-2 border border-slate-200 rounded">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔒</span>
              <span className="font-medium text-slate-900">Read-Only Viewer</span>
            </div>
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded font-medium">No Export</span>
          </div>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-6 bg-white">
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Dataset Access by Role</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-2 font-semibold text-slate-700">Dataset</th>
                <th className="text-center py-2 px-2 font-semibold text-slate-700">NAT</th>
                <th className="text-center py-2 px-2 font-semibold text-slate-700">REG</th>
                <th className="text-center py-2 px-2 font-semibold text-slate-700">BHW</th>
                <th className="text-center py-2 px-2 font-semibold text-slate-700">FAC</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'ANC Coverage', nat: '✓', reg: '✓', bhw: 'x', fac: '✓' },
                { name: 'Danger Signs', nat: '✓', reg: '✓', bhw: 'x', fac: 'x' },
                { name: 'Cohort Analytics', nat: '✓', reg: '✓', bhw: 'x', fac: 'x' },
                { name: 'BHW Coverage', nat: '✓', reg: '✓', bhw: '✓', fac: '✓' },
                { name: 'Sync Audit Logs', nat: '✓', reg: 'x', bhw: 'x', fac: 'x' }
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-slate-200">
                  <td className="py-2 px-2 text-slate-900 font-medium">{row.name}</td>
                  <td className={`text-center py-2 px-2 ${row.nat === '✓' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}`}>{row.nat}</td>
                  <td className={`text-center py-2 px-2 ${row.reg === '✓' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}`}>{row.reg}</td>
                  <td className={`text-center py-2 px-2 ${row.bhw === '✓' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}`}>{row.bhw}</td>
                  <td className={`text-center py-2 px-2 ${row.fac === '✓' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}`}>{row.fac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-6 bg-white">
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Scheduled Exports</h4>
        <div className="space-y-3">
          {[
            { name: 'ANC Coverage — Weekly', schedule: 'Every Monday 06:00 • CSV', status: 'Active' },
            { name: 'Danger Signs — Monthly', schedule: '1st of month 00:00 • JSON', status: 'Active' },
            { name: 'FHSIS Summary — Quarterly', schedule: 'Quarterly • 1st day 00:00 • XLSX', status: 'Active' }
          ].map((sched, idx) => (
            <div key={idx} className="p-3 border border-slate-200 rounded">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-900">{sched.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{sched.schedule}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">{sched.status}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="text-xs text-blue-600 hover:underline">✎ Edit</button>
                <button className="text-xs text-slate-600 hover:underline">⏸ Pause</button>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-3 text-xs text-blue-600 hover:underline font-medium">+ Add Scheduled Export</button>
      </div>

      <div className="border border-slate-200 rounded-lg p-6 bg-white">
        <h4 className="text-sm font-semibold text-slate-900 mb-4">Export Volume — Last 30 Days</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={volumeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '10px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }} />
            <Bar dataKey="PDF" stackId="a" fill="#ef4444" />
            <Bar dataKey="XLSX" stackId="a" fill="#3b82f6" />
            <Bar dataKey="JSON" stackId="a" fill="#f59e0b" />
            <Bar dataKey="CSV" stackId="a" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
