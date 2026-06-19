'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertCircle, Eye } from 'lucide-react'
import {
  gisHotspotClusters,
  gisGeographicComparison,
  gisRiskTrend,
  gisRiskAlerts,
  type GISHotspotCluster,
  type GISGeographicDataPoint,
  type GISRiskTrendPoint,
  type GISRiskAlert,
} from '@/lib/mock-data'

// ─── Hotspot Clusters ─────────────────────────────────────────

export function HotspotClustersCard() {
  const clusters: GISHotspotCluster[] = gisHotspotClusters
  const activeCount = clusters.length // All clusters in the list are "active"

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="mb-4">
        <h3 className="font-semibold text-slate-900 mb-1">Hotspot Clusters</h3>
        <p className="text-xs text-slate-500 mb-3">Top {clusters.length} active clusters nationwide</p>
        <span className="inline-block bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-semibold">
          {activeCount} Active
        </span>
      </div>

      <div className="space-y-2">
        {clusters.map((cluster) => (
          <div
            key={cluster.id}
            className={`p-3 rounded-lg border ${
              cluster.type === 'critical'
                ? 'bg-red-50 border-red-200'
                : 'bg-yellow-50 border-yellow-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white ${
                    cluster.type === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}
                >
                  {cluster.type === 'critical' ? '🔥' : '⚠️'}
                </div>
                <span className="text-sm font-medium text-slate-900">{cluster.name}</span>
              </div>
              <span
                className={`font-bold text-sm ${
                  cluster.type === 'critical' ? 'text-red-600' : 'text-yellow-600'
                }`}
              >
                {cluster.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Geographic Comparison ────────────────────────────────────

export function GeographicComparisonCard() {
  const data: GISGeographicDataPoint[] = gisGeographicComparison
  const nationalAvg = (data.reduce((s, d) => s + d.value, 0) / data.length).toFixed(0)

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-slate-900 mb-1">Geographic Comparison</h3>
        <p className="text-xs text-slate-500">ANC Coverage by Island Group</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#64748b" />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#64748b" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} name="ANC Coverage %" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 text-center">
        <div className="inline-block px-3 py-1 bg-slate-100 rounded text-xs text-slate-600">
          Natl Avg: {nationalAvg}%
        </div>
      </div>
    </div>
  )
}

// ─── Risk Trend — Critical Regions ───────────────────────────

export function RiskTrendCard() {
  const data: GISRiskTrendPoint[] = gisRiskTrend
  const alerts: GISRiskAlert[] = gisRiskAlerts

  const AlertIcon = ({ severity }: { severity: GISRiskAlert['severity'] }) =>
    severity === 'urgent' ? (
      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
    ) : (
      <Eye className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
    )

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-slate-900 mb-1">Risk Trend — Critical Regions</h3>
        <p className="text-xs text-slate-500">3-month trajectory</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#64748b" />
          <YAxis domain={[50, 70]} tick={{ fontSize: 12 }} stroke="#64748b" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Line type="monotone" dataKey="barmm" stroke="#ef4444" strokeWidth={2} name="BARMM" dot={false} />
          <Line type="monotone" dataKey="caraga" stroke="#f97316" strokeWidth={2} name="Caraga" dot={false} />
          <Line
            type="monotone"
            dataKey="visayas"
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="E. Visayas"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="space-y-2 mt-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex gap-2 p-3 rounded-lg border ${
              alert.severity === 'urgent'
                ? 'bg-red-50 border-red-200'
                : 'bg-yellow-50 border-yellow-200'
            }`}
          >
            <AlertIcon severity={alert.severity} />
            <div>
              <p
                className={`text-xs font-semibold ${
                  alert.severity === 'urgent' ? 'text-red-900' : 'text-yellow-900'
                }`}
              >
                Intervention Flag: {alert.region}
                <span
                  className={`ml-2 inline-block text-white px-2 py-0.5 rounded text-xs ${
                    alert.severity === 'urgent' ? 'bg-red-600' : 'bg-yellow-600'
                  }`}
                >
                  {alert.label}
                </span>
              </p>
              <p
                className={`text-xs mt-1 ${
                  alert.severity === 'urgent' ? 'text-red-700' : 'text-yellow-700'
                }`}
              >
                {alert.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
