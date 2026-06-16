import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

export function NodeStatusTable() {
  const nodes = [
    { region: 'NCR', nodeCount: '218 / 218 nodes', status: 'Online', uptime: '99.9%', lastSync: '2 min ago', cpu: '34%', readiness: 'Operational', readinessColor: 'text-green-600' },
    { region: 'Central Luzon', nodeCount: '192 / 192 nodes', status: 'Online', uptime: '99.4%', lastSync: '4 min ago', cpu: '41%', readiness: 'Operational', readinessColor: 'text-green-600' },
    { region: 'CALABARZON', nodeCount: '159 / 176 nodes', status: 'Degraded', uptime: '96.9%', lastSync: '18 min ago', cpu: '72%', readiness: 'Partial', readinessColor: 'text-yellow-600' },
    { region: 'Eastern Visayas', nodeCount: '128 / 141 nodes', status: 'Degraded', uptime: '90.8%', lastSync: '31 min ago', cpu: '81%', readiness: 'Partial', readinessColor: 'text-yellow-600' },
    { region: 'BARMM', nodeCount: '120 / 134 nodes', status: 'Offline', uptime: '61.3%', lastSync: '6h 42m ago', cpu: '–', readiness: 'Critical', readinessColor: 'text-red-600' },
    { region: 'Caraga', nodeCount: '84 / 98 nodes', status: 'Offline', uptime: '57.8%', lastSync: '7h 19m ago', cpu: '–', readiness: 'Critical', readinessColor: 'text-red-600' }
  ]

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
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Node Status by Region</h3>
      <p className="text-sm text-slate-600 mb-4">Real-time health, uptime, last sync, and operational readiness per region</p>
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
            {nodes.map((node, idx) => (
              <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4">
                  <div className="font-medium text-slate-900">{node.region}</div>
                  <div className="text-xs text-slate-500">{node.nodeCount}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(node.status)}
                    <span className={`text-sm font-medium ${getStatusColor(node.status)}`}>{node.status}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-600 font-medium">{node.uptime}</td>
                <td className="py-3 px-4 text-slate-600">{node.lastSync}</td>
                <td className="py-3 px-4 text-slate-600">{node.cpu}</td>
                <td className="py-3 px-4">
                  <span className={`text-sm font-medium ${node.readinessColor}`}>{node.readiness}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
