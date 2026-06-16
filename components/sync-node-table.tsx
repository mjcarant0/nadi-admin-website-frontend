import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import {
  syncNodeRows,
  type SyncNodeRow,
  type NodeStatus,
} from '@/lib/mock-data'

function getStatusIcon(status: NodeStatus) {
  if (status === 'Online') return <CheckCircle2 className="w-4 h-4 text-green-600" />
  if (status === 'Degraded') return <AlertCircle className="w-4 h-4 text-yellow-600" />
  return <XCircle className="w-4 h-4 text-red-600" />
}

function getStatusColor(status: NodeStatus) {
  if (status === 'Online') return 'text-green-600'
  if (status === 'Degraded') return 'text-yellow-600'
  return 'text-red-600'
}

export function SyncNodeTable() {
  const nodes: SyncNodeRow[] = syncNodeRows

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6 table-animate">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Node Sync Status by Region</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-900">REGION / NODE</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">STATUS</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">LAST SYNC</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">UPLOAD QUEUE</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">LATENCY</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">SUCCESS RATE</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node) => (
              <tr key={node.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4">
                  <div className="font-medium text-slate-900">{node.region}</div>
                  <div className="text-xs text-slate-500">{node.nodeCount}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(node.status)}
                    <span className={`text-sm font-medium ${getStatusColor(node.status)}`}>
                      {node.status}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-600">{node.lastSync}</td>
                <td className="py-3 px-4 text-slate-600">{node.queue}</td>
                <td className="py-3 px-4 text-slate-600">{node.latency}</td>
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
                    />
                  </div>
                  <div className="text-xs text-slate-600 mt-1">{node.successRate}%</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
