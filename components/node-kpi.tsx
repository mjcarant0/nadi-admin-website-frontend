import { Server, CheckCircle2, AlertTriangle, XCircle, Clock, Shield } from 'lucide-react'

export function NodeKPICards() {
  const cards = [
    {
      icon: Server,
      status: 'Total',
      statusColor: 'text-blue-600',
      value: '1,247',
      label: 'Total Nodes',
      subtext: 'Across 16 regions',
      borderColor: 'border-b-blue-600'
    },
    {
      icon: CheckCircle2,
      status: 'Healthy',
      statusColor: 'text-green-600',
      value: '1,186',
      label: 'Online Nodes',
      subtext: '',
      borderColor: 'border-b-4 border-b-green-600'
    },
    {
      icon: AlertTriangle,
      status: 'Warning',
      statusColor: 'text-yellow-600',
      value: '53',
      label: 'Degraded Nodes',
      subtext: 'High load / partial',
      subtextColor: 'text-yellow-600',
      borderColor: 'border-b-yellow-600'
    },
    {
      icon: XCircle,
      status: 'Critical',
      statusColor: 'text-red-600',
      value: '8',
      label: 'Offline Nodes',
      subtext: 'BARMM / Caraga',
      subtextColor: 'text-red-600',
      borderColor: 'border-b-red-600'
    },
    {
      icon: Clock,
      status: 'Good',
      statusColor: 'text-green-600',
      value: '99.2%',
      label: 'Avg Network Uptime',
      subtext: '',
      borderColor: 'border-b-green-600'
    },
    {
      icon: Shield,
      status: 'Review',
      statusColor: 'text-yellow-600',
      value: '94.7%',
      label: 'Operational Readiness',
      subtext: '66 nodes need attention',
      subtextColor: 'text-yellow-600',
      borderColor: 'border-b-yellow-600'
    }
  ]

  return (
    <div className="grid grid-cols-6 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <div key={idx} className={`bg-white border border-slate-200 rounded-lg p-4 ${card.borderColor}`}>
            <div className="flex items-start justify-between mb-3">
              <Icon className={`w-5 h-5 ${card.statusColor}`} />
              {card.status && <span className={`text-xs font-semibold ${card.statusColor}`}>{card.status}</span>}
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{card.value}</div>
            <div className="text-xs font-medium text-slate-600 mb-1">{card.label}</div>
            {card.subtext && (
              <div className={`text-xs ${card.subtextColor || 'text-slate-500'}`}>{card.subtext}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
