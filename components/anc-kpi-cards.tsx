'use client'

import {
  Heart,
  Calendar,
  Users,
  UserMinus,
  Target,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { ancKPIs, type ANCKPICard } from '@/lib/mock-data'

// Map icon name strings from mock data to actual Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  Heart,
  Calendar,
  Users,
  UserMinus,
  Target,
}

interface KPICardProps {
  card: ANCKPICard
}

function KPICard({ card }: KPICardProps) {
  const isPositive = card.trend > 0
  const Icon = ICON_MAP[card.iconName] ?? Heart

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 flashcard-interactive">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-slate-600">
            <Icon className="w-5 h-5" />
          </div>
          <div className={`flex items-center gap-1 ${card.trendColor} text-sm font-semibold`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {isPositive ? '+' : ''}
            {card.trend}%
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="text-3xl font-bold text-slate-900 mb-1">{card.value}</div>
        <div className="text-sm text-slate-600">{card.label}</div>
      </div>
      <div className={`h-1.5 rounded-full ${card.progressColor} opacity-80`} />
    </div>
  )
}

export function ANCKPICards() {
  const kpis: ANCKPICard[] = ancKPIs

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {kpis.map((kpi) => (
        <KPICard key={kpi.id} card={kpi} />
      ))}
    </div>
  )
}
