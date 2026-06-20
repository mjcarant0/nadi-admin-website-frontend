'use client'

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { api } from '@/lib/api'
import { useApi } from '@/lib/use-api'
import {
  bhwRegionalData,
  bhwMonthlyTrend,
  bhwCoverageCategories,
  bhwCoverageGaps,
  type BHWRegionalRow,
  type BHWTrendPoint,
  type BHWCoverageCategory,
  type BHWCoverageGap,
} from '@/lib/mock-data'

function relativeTime(iso: string | null): string {
  if (!iso) return 'never'
  const days = Math.round((Date.now() - new Date(iso).getTime()) / 86400000)
  if (days < 1) return 'today'
  return `${days}d ago`
}

// ─── BHW Regional Table ───────────────────────────────────────
// Live data: backed by the real /admin/audit/bhw-coverage endpoint.

export function BHWRegionalTable() {
  const { data, error, loading } = useApi(() => api.bhwCoverage(), [])
  const rows = data ?? []

  return (
    <div className="border border-slate-200 rounded-lg p-6 mb-6 bg-white table-animate">
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

// ─── BHW Charts ───────────────────────────────────────────────
// NOTE: mock data — the backend has no regional-aggregation / monthly-trend
// endpoint yet. Wire to the real API once those endpoints exist.

export function BHWCharts() {
  const trend: BHWTrendPoint[] = bhwMonthlyTrend
  const regions: BHWRegionalRow[] = bhwRegionalData
  const barData = regions.map((r) => ({
    name: r.region.slice(0, 3),
    active: r.active,
    inactive: r.inactive,
  }))

  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="border border-slate-200 rounded-lg p-6 bg-white">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          BHW Active vs Inactive — By Region
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }} />
            <Bar dataKey="active" fill="#10b981" name="Active" radius={[8, 8, 0, 0]} />
            <Bar dataKey="inactive" fill="#ef4444" name="Inactive" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border border-slate-200 rounded-lg p-6 bg-white">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          Barangay Coverage Trend — 6 Months
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="active"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6' }}
              name="Active"
            />
            <Line
              type="monotone"
              dataKey="inactive"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#f59e0b' }}
              name="Inactive"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ─── BHW Sidebar ──────────────────────────────────────────────
// NOTE: mock data — no backend endpoint yet for coverage categories / gaps.

export function BHWSidebar() {
  const categories: BHWCoverageCategory[] = bhwCoverageCategories
  const gaps: BHWCoverageGap[] = bhwCoverageGaps
  const regions: BHWRegionalRow[] = bhwRegionalData

  // Derive national coverage % dynamically
  const fullyCovered = categories.find((c) => c.name === 'Fully Covered')
  const total = categories.reduce((s, c) => s + c.value, 0)
  const nationalPct = total > 0 && fullyCovered
    ? ((fullyCovered.value / total) * 100).toFixed(1)
    : '—'

  const categoryColors: Record<string, string> = {
    'Fully Covered': 'bg-green-600',
    Partial: 'bg-yellow-500',
    'Zero Coverage': 'bg-red-600',
    GIDA: 'bg-slate-400',
  }

  return (
    <div className="space-y-4">
      {/* National Coverage Summary */}
      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs font-semibold text-slate-500 mb-3">National Coverage Summary</p>
        <p className="text-3xl font-bold text-green-600 mb-4">{nationalPct}%</p>
        <div className="space-y-2 text-xs">
          {categories.slice(0, 3).map((cat) => (
            <div key={cat.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${categoryColors[cat.name] ?? 'bg-slate-400'}`}
                />
                <span className="text-slate-600">{cat.name}</span>
              </div>
              <span className="font-semibold text-slate-900">{cat.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage Ranking */}
      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs font-semibold text-slate-500 mb-3">Coverage Ranking by Region</p>
        <div className="space-y-2 text-xs">
          {[...regions]
            .sort((a, b) => b.coverage - a.coverage)
            .map((r) => (
              <div key={r.id} className="flex items-center justify-between">
                <span className="text-slate-600">{r.region.slice(0, 10)}</span>
                <span
                  className={`font-semibold ${
                    r.coverage >= 90
                      ? 'text-green-600'
                      : r.coverage >= 75
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {r.coverage}%
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Service Coverage Gaps */}
      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs font-semibold text-slate-500 mb-3">Service Coverage Gaps</p>
        <p className="text-xs font-semibold text-red-600 mb-3">
          {gaps.filter((g) => g.severity === 'critical').length} Critical
        </p>
        <div className="space-y-2 text-xs">
          {gaps.map((gap) => (
            <div
              key={gap.id}
              className={`p-2 rounded border ${
                gap.severity === 'critical'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}
            >
              <p
                className={`font-semibold ${
                  gap.severity === 'critical' ? 'text-red-700' : 'text-yellow-700'
                }`}
              >
                {gap.title}
              </p>
              <p
                className={`text-xs ${
                  gap.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
                }`}
              >
                {gap.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
