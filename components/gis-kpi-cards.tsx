'use client'

import { Flame, AlertTriangle, Target, Shield } from 'lucide-react'
import { gisKPICards, type GISKPICard } from '@/lib/mock-data'

const ICON_MAP: Record<string, React.ElementType> = {
  Flame,
  AlertTriangle,
  Target,
  Shield,
}

export function GISKPICards() {
  const cards: GISKPICard[] = gisKPICards

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const IconComponent = ICON_MAP[card.iconName] ?? Shield
        return (
          <div
            key={card.id}
            className="bg-white p-4 rounded-lg border border-slate-200 flashcard-interactive"
          >
            <div
              className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center mb-3`}
            >
              <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">{card.value}</p>
            <p className="text-sm text-slate-600">{card.label}</p>
          </div>
        )
      })}
    </div>
  )
}
