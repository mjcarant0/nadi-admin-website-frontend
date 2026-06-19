import { Server, CheckCircle2, AlertTriangle, XCircle, Clock, Shield } from 'lucide-react'
import { nodeKPICards, type NodeKPICard } from '@/lib/mock-data'

const ICON_MAP: Record<string, React.ElementType> = {
  Server,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Shield,
}

export function NodeKPICards() {
  const cards: NodeKPICard[] = nodeKPICards

  return (
    <div className="grid grid-cols-6 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = ICON_MAP[card.iconName] ?? Server
        return (
          <div
            key={card.id}
            className={`bg-white border border-slate-200 rounded-lg p-4 flashcard-interactive ${card.borderColor}`}
          >
            <div className="flex items-start justify-between mb-3">
              <Icon className={`w-5 h-5 ${card.statusColor}`} />
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
