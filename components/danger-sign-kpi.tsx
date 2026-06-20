'use client'

import { AlertCircle, Heart, Droplet, TrendingUp, Briefcase } from 'lucide-react'
import { dangerSignKPIs, type DangerSignKPI } from '@/lib/mock-data'

const ICON_MAP: Record<string, React.ElementType> = {
  AlertCircle,
  Heart,
  Droplet,
  TrendingUp,
  Briefcase,
}

export function DangerSignKPICards() {
  const cards: DangerSignKPI[] = dangerSignKPIs

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = ICON_MAP[card.iconName] ?? AlertCircle
        return (
          <div
            key={card.id}
            className={`${card.bgColor} border ${card.borderColor} border-b-4 rounded-lg p-4 flashcard-interactive`}
          >
            <div className="flex items-start justify-between mb-3">
              <Icon className="w-5 h-5 text-slate-600" />
              <span className={`text-sm font-semibold ${card.changeColor}`}>{card.change}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{card.value}</p>
            <p className="text-xs text-slate-600">{card.label}</p>
          </div>
        )
      })}
    </div>
  )
}

// keep old name as alias for backwards compat
export { DangerSignKPICards as DangerSignKPI }
