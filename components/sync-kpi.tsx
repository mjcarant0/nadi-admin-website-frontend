import { RefreshCw, CheckCircle2, CloudUpload, Clock, AlertTriangle, XCircle } from 'lucide-react'

export function SyncKPICards() {
  const cards = [
    {
      icon: RefreshCw,
      trend: '+12.4%',
      trendColor: 'text-blue-600',
      value: '48,291',
      label: 'Total Sync Events',
      subtext: 'Last 24 hours',
      borderColor: 'border-b-blue-600'
    },
    {
      icon: CheckCircle2,
      status: 'Healthy',
      statusColor: 'text-green-600',
      value: '96.8%',
      label: 'Sync Success Rate',
      subtext: '',
      borderColor: 'border-b-4 border-b-green-600'
    },
    {
      icon: CloudUpload,
      trend: '+8.1%',
      trendColor: 'text-yellow-600',
      value: '2.41 GB',
      label: 'Upload Volume',
      subtext: 'Today',
      borderColor: 'border-b-yellow-600'
    },
    {
      icon: Clock,
      status: 'Normal',
      statusColor: 'text-blue-600',
      value: '142 ms',
      label: 'Avg Sync Latency',
      subtext: '',
      borderColor: 'border-b-blue-600'
    },
    {
      icon: AlertTriangle,
      status: 'Alert',
      statusColor: 'text-red-600',
      value: '1,534',
      label: 'Failed Syncs',
      subtext: '14 nodes offline',
      subtextColor: 'text-red-600',
      borderColor: 'border-b-red-600'
    },
    {
      icon: XCircle,
      trend: '↑ Spike',
      trendColor: 'text-red-600',
      value: '287',
      label: 'Validation Failures',
      subtext: '23 in last cycle',
      subtextColor: 'text-red-600',
      borderColor: 'border-b-red-600'
    }
  ]

  return (
    <div className="grid grid-cols-6 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <div key={idx} className={`bg-white border border-slate-200 rounded-lg p-4 flashcard-interactive ${card.borderColor}`}>
            <div className="flex items-start justify-between mb-3">
              <Icon className={`w-5 h-5 ${card.statusColor || card.trendColor}`} />
              {card.trend && <span className={`text-xs font-semibold ${card.trendColor}`}>{card.trend}</span>}
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
