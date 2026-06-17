'use client'

import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'
import { api } from '@/lib/api'
import { useApi } from '@/lib/use-api'

function relativeTime(iso: string | null): string {
  if (!iso) return 'never'
  const days = Math.round((Date.now() - new Date(iso).getTime()) / 86400000)
  if (days < 1) return 'today'
  return `${days}d ago`
}

const regions = [
  { region: 'NCR', barangays: '1,708', active: 6824, inactive: 0, gida: 'None', ratio: '1:17', coverage: 100 },
  { region: 'Central Luzon', barangays: '3,102', active: 5814, inactive: 0, gida: 'None', ratio: '1:19', coverage: 100 },
  { region: 'CALABARZON', barangays: '4,010', active: 6219, inactive: 0, gida: '3 areas', ratio: '1:20', coverage: 99.4 },
  { region: 'Eastern Visayas', barangays: '4,390', active: 2891, inactive: 500, gida: '47 areas', ratio: '1:23', coverage: 82.3 },
  { region: 'Davao Region', barangays: '1,162', active: 4102, inactive: 0, gida: '12 areas', ratio: '1:18', coverage: 97.8 },
  { region: 'BARMM', barangays: '2,241', active: 1204, inactive: 312, gida: '312 areas', ratio: '1:28', coverage: 53.7 }
]

const bhwData = [
  { month: 'Jan', active: 37500, inactive: 2800 },
  { month: 'Feb', active: 37800, inactive: 2700 },
  { month: 'Mar', active: 38200, inactive: 2500 },
  { month: 'Apr', active: 38500, inactive: 2300 },
  { month: 'May', active: 38800, inactive: 2100 },
  { month: 'Jun', active: 38941, inactive: 1875 }
]

const riskData = [
  { name: 'Fully Covered', value: 33218, color: '#10b981' },
  { name: 'Partial', value: 7864, color: '#f59e0b' },
  { name: 'Zero Coverage', value: 964, color: '#ef4444' },
  { name: 'GIDA', value: 5842, color: '#9ca3af' }
]

export function BHWRegionalTable() {
  const { data, error, loading } = useApi(() => api.bhwCoverage(), [])
  const rows = data ?? []

  return (
    <div className="border border-slate-200 rounded-lg p-6 mb-6 bg-white">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">
        Barangay Coverage Status (ACTIVE vs SILENT — 30-day threshold)
      </h3>

      {loading && <p className="text-sm text-slate-500 py-8 text-center">Loading coverage…</p>}
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          Could not load BHW coverage: {error}
        </p>
      )}
      {!loading && !error && rows.length === 0 && (
        <p className="text-sm text-slate-500 py-8 text-center">No active BHWs found.</p>
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Barangay PSGC</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Records</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Last Submission</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-900 font-medium">
                    {row.assigned_barangay_psgc ?? 'Unassigned'}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        row.coverage_status === 'ACTIVE'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {row.coverage_status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{row.total_records}</td>
                  <td className="py-3 px-4 text-slate-600">
                    {relativeTime(row.last_submission)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export function BHWCharts() {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="border border-slate-200 rounded-lg p-6 bg-white">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">BHW Active vs Inactive — By Region</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={regions.map(r => ({ name: r.region.slice(0, 3), active: r.active, inactive: r.inactive }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }} />
            <Bar dataKey="active" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="inactive" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border border-slate-200 rounded-lg p-6 bg-white">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Barangay Coverage Trend — 6 Months</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={bhwData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }} />
            <Legend />
            <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
            <Line type="monotone" dataKey="inactive" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#f59e0b' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function BHWSidebar() {
  return (
    <div className="space-y-4">
      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs font-semibold text-slate-500 mb-3">National Coverage Summary</p>
        <p className="text-3xl font-bold text-green-600 mb-4">90.9%</p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              <span className="text-slate-600">Fully Covered Barangays</span>
            </div>
            <span className="font-semibold text-slate-900">33,218</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className="text-slate-600">Partial Coverage</span>
            </div>
            <span className="font-semibold text-slate-900">7,864</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600"></div>
              <span className="text-slate-600">Zero Coverage</span>
            </div>
            <span className="font-semibold text-slate-900">964</span>
          </div>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs font-semibold text-slate-500 mb-3">Coverage Ranking by Region</p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">NCR</span>
            <span className="font-semibold text-green-600">100%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">C. Luzon</span>
            <span className="font-semibold text-green-600">100%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Davao</span>
            <span className="font-semibold text-green-600">97.8%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">MIMAROPA</span>
            <span className="font-semibold text-red-600">61.4%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">BARMM</span>
            <span className="font-semibold text-red-600">53.7%</span>
          </div>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs font-semibold text-slate-500 mb-3">Service Coverage Gaps</p>
        <p className="text-xs font-semibold text-red-600 mb-3">5 Critical</p>
        <div className="space-y-2 text-xs">
          <div className="p-2 bg-red-50 rounded border border-red-200">
            <p className="font-semibold text-red-700">Zero BHW — 14 GIDA Barangays</p>
            <p className="text-red-600 text-xs">BARMM (8) • MIMAROPA (5)</p>
          </div>
          <div className="p-2 bg-red-50 rounded border border-red-200">
            <p className="font-semibold text-red-700">Over-Ratio Alert — BARMM</p>
            <p className="text-red-600 text-xs">Avg ratio 1:28</p>
          </div>
          <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
            <p className="font-semibold text-yellow-700">High Inactivity — Eastern Visayas</p>
            <p className="text-yellow-600 text-xs">18% inactive rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}
