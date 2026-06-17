'use client'

import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { api } from '@/lib/api'
import { useApi } from '@/lib/use-api'

function relativeTime(iso: string | null): string {
  if (!iso) return 'never'
  const then = new Date(iso).getTime()
  const mins = Math.round((Date.now() - then) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ${mins % 60}m ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export function SyncNodeTable() {
  const { data, error, loading } = useApi(() => api.syncLog(100), [])

  const rows = (data ?? []).map((r) => {
    const successRate =
      r.records_synced > 0
        ? Math.round((r.confirmed_synced / r.records_synced) * 1000) / 10
        : 0
    const status =
      r.pending_sync === 0 ? 'Online' : r.pending_sync < 10 ? 'Degraded' : 'Offline'
    return { ...r, successRate, status }
  })

  const getStatusIcon = (status: string) => {
    if (status === 'Online') return <CheckCircle2 className="w-4 h-4 text-green-600" />
    if (status === 'Degraded') return <AlertCircle className="w-4 h-4 text-yellow-600" />
    return <XCircle className="w-4 h-4 text-red-600" />
  }

  const getStatusColor = (status: string) => {
    if (status === 'Online') return 'text-green-600'
    if (status === 'Degraded') return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Per-BHW Sync Status</h3>

      {loading && <p className="text-sm text-slate-500 py-8 text-center">Loading sync log…</p>}
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          Could not load sync log: {error}
        </p>
      )}
      {!loading && !error && rows.length === 0 && (
        <p className="text-sm text-slate-500 py-8 text-center">No sync activity recorded.</p>
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-900">BHW / BARANGAY</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">STATUS</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">LAST SYNC</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">PENDING QUEUE</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">RECORDS</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">SUCCESS RATE</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((node) => (
                <tr key={node.bhw_id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-900">{node.bhw_name}</div>
                    <div className="text-xs text-slate-500">
                      {node.assigned_barangay_psgc ?? 'Unassigned'}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(node.status)}
                      <span className={`text-sm font-medium ${getStatusColor(node.status)}`}>
                        {node.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {relativeTime(node.last_encounter_date)}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{node.pending_sync} pending</td>
                  <td className="py-3 px-4 text-slate-600">{node.records_synced}</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          node.successRate >= 95
                            ? 'bg-green-600'
                            : node.successRate >= 85
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                        }`}
                        style={{ width: `${node.successRate}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">{node.successRate}%</div>
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
