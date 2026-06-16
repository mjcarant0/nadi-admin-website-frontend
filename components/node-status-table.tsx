import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import {
  nodeRegionalStatus,
  type NodeRegionalStatus,
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

export function NodeStatusTable() {
  const nodes: NodeRegionalStatus[] = nodeRegionalStatus

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6 table-animate">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Node Status by Region</h3>
      <p className="text-sm text-slate-600 mb-4">
        Real-time health, uptime, last sync, and operational readiness per region
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-900">REGION / NODE COUNT</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">STATUS</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">UPTIME</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">LAST SYNC</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">CPU AVG</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-900">READINESS</th>
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
                <td className="py-3 px-4 text-slate-600 font-medium">{node.uptime}</td>
                <td className="py-3 px-4 text-slate-600">{node.lastSync}</td>
                <td className="py-3 px-4 text-slate-600">{node.cpu}</td>
                <td className="py-3 px-4">
                  <span className={`text-sm font-medium ${node.readinessColor}`}>
                    {node.readiness}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
