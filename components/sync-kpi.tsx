import { RefreshCw, CheckCircle2, CloudUpload, Clock, AlertTriangle, XCircle } from 'lucide-react'
import { syncKPICards, type SyncKPICard } from '@/lib/mock-data'

const ICON_MAP: Record<string, React.ElementType> = {
  RefreshCw,
  CheckCircle2,
  CloudUpload,
  Clock,
  AlertTriangle,
  XCircle,
}

export function SyncKPICards() {
  const cards: SyncKPICard[] = syncKPICards

  return (
    <div className="grid grid-cols-6 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = ICON_MAP[card.iconName] ?? RefreshCw
        return (
          <div
            key={card.id}
            className={`bg-white border border-slate-200 rounded-lg p-4 flashcard-interactive ${card.borderColor}`}
          >
            <div className="flex items-start justify-between mb-3">
              <Icon className={`w-5 h-5 ${card.statusColor ?? card.trendColor}`} />
              {card.trend && (
                <span className={`text-xs font-semibold ${card.trendColor}`}>{card.trend}</span>
              )}
              {card.status && (
                <span className={`text-xs font-semibold ${card.statusColor}`}>{card.status}</span>
              )}
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{card.value}</div>
            <div className="text-xs font-medium text-slate-600 mb-1">{card.label}</div>
            {card.subtext && (
              <div className={`text-xs ${card.subtextColor ?? 'text-slate-500'}`}>
                {card.subtext}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
