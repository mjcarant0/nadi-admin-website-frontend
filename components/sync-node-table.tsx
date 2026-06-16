import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

export function SyncNodeTable() {
  const nodes = [
    { region: 'NCR', nodeCount: '218 nodes active', status: 'Online', lastSync: '2 min ago', queue: '0 pending', latency: '98ms', successRate: 99.4 },
    { region: 'Central Luzon', nodeCount: '192 nodes active', status: 'Online', lastSync: '4 min ago', queue: '3 pending', latency: '112ms', successRate: 98.1 },
    { region: 'CALABARZON', nodeCount: '169 / 176 nodes', status: 'Degraded', lastSync: '18 min ago', queue: '47 pending', latency: '284ms', successRate: 91.2 },
    { region: 'Eastern Visayas', nodeCount: '128 / 141 nodes', status: 'Degraded', lastSync: '31 min ago', queue: '89 pending', latency: '341ms', successRate: 84.7 },
    { region: 'BARMM', nodeCount: '120 / 134 nodes', status: 'Offline', lastSync: '6h 42m ago', queue: '312 pending', latency: '–', successRate: 61.3 },
    { region: 'Caraga', nodeCount: '84 / 98 nodes', status: 'Offline', lastSync: '7h 19m ago', queue: '267 pending', latency: '–', successRate: 57.8 }
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
                <td className="py-3 px-4 text-slate-600">{node.lastSync}</td>
                <td className="py-3 px-4 text-slate-600">{node.queue}</td>
                <td className="py-3 px-4 text-slate-600">{node.latency}</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${node.successRate >= 95 ? 'bg-green-600' : node.successRate >= 85 ? 'bg-yellow-600' : 'bg-red-600'}`}
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
    </div>
  )
}
