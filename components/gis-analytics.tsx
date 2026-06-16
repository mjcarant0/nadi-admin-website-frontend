'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertCircle, Eye } from 'lucide-react'

export function HotspotClustersCard() {
  const clusters = [
    { name: 'Lanao del Sur', count: 847, type: 'critical' },
    { name: 'Surigao del Norte', count: 621, type: 'critical' },
    { name: 'Samar Island', count: 534, type: 'high' },
    { name: 'Zamboanga del Norte', count: 489, type: 'high' },
    { name: 'Cotabato Cluster', count: 278, type: 'high' },
  ]

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="mb-4">
        <h3 className="font-semibold text-slate-900 mb-1">Hotspot Clusters</h3>
        <p className="text-xs text-slate-500 mb-3">Top 5 active clusters nationwide</p>
        <span className="inline-block bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-semibold">23 Active</span>
      </div>

      <div className="space-y-2">
        {clusters.map((cluster, idx) => (
          <div
            key={idx}
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
              <span className={`font-bold text-sm ${cluster.type === 'critical' ? 'text-red-600' : 'text-yellow-600'}`}>
                {cluster.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function GeographicComparisonCard() {
  const data = [
    { name: 'Luzon', value: 89.2 },
    { name: 'Visayas', value: 80.1 },
    { name: 'Mindanao', value: 68.4 },
  ]

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
          <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
          <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 text-center">
        <div className="inline-block px-3 py-1 bg-slate-100 rounded text-xs text-slate-600">
          Natl Avg: 87%
        </div>
      </div>
    </div>
  )
}

export function RiskTrendCard() {
  const data = [
    { month: 'Apr', barmm: 62, caraga: 62, visayas: 67 },
    { month: 'May', barmm: 57, caraga: 61, visayas: 65 },
    { month: 'Jun', barmm: 52, caraga: 60, visayas: 63 },
  ]

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
          <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
          <Line type="monotone" dataKey="barmm" stroke="#ef4444" strokeWidth={2} name="BARMM" dot={false} />
          <Line type="monotone" dataKey="caraga" stroke="#f97316" strokeWidth={2} name="Caraga" dot={false} />
          <Line type="monotone" dataKey="visayas" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" name="E. Visayas" dot={false} />
        </LineChart>
      </ResponsiveContainer>

      {/* Alert Boxes */}
      <div className="space-y-2 mt-4">
        <div className="flex gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-red-900">
              Intervention Flag: BARMM
              <span className="ml-2 inline-block bg-red-600 text-white px-2 py-0.5 rounded text-xs">Urgent</span>
            </p>
            <p className="text-xs text-red-700 mt-1">ANC declining 3 consecutive months</p>
          </div>
        </div>

        <div className="flex gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <Eye className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-yellow-900">
              Watch: Eastern Visayas
              <span className="ml-2 inline-block bg-yellow-600 text-white px-2 py-0.5 rounded text-xs">Watch</span>
            </p>
            <p className="text-xs text-yellow-700 mt-1">Danger signs +34% this month</p>
          </div>
        </div>
      </div>
    </div>
  )
}
