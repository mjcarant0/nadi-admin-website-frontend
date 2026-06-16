'use client'

import { Heart, Calendar, Users, UserMinus, Target } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  icon: React.ReactNode
  trend: number
  trendColor: string
  value: string
  label: string
  progressColor: string
  progressPercent: number
}

function KPICard({ icon, trend, trendColor, value, label, progressColor, progressPercent }: KPICardProps) {
  const isPositive = trend > 0

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 flashcard-interactive">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-slate-600">{icon}</div>
          <div className={`flex items-center gap-1 ${trendColor} text-sm font-semibold`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {isPositive ? '+' : ''}{trend}%
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
        <div className="text-sm text-slate-600">{label}</div>
      </div>
      <div className={`h-1.5 rounded-full ${progressColor} opacity-80`}></div>
    </div>
  )
}

export function ANCKPICards() {
  const kpis = [
    {
      icon: <Heart className="w-5 h-5" />,
      trend: 2.1,
      trendColor: 'text-green-600',
      value: '87.4%',
      label: 'National ANC Coverage',
      progressColor: 'bg-blue-500',
      progressPercent: 87,
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      trend: 1.4,
      trendColor: 'text-green-600',
      value: '74.2%',
      label: 'ANC4+ Completion Rate',
      progressColor: 'bg-yellow-500',
      progressPercent: 74,
    },
    {
      icon: <Users className="w-5 h-5" />,
      trend: 3.7,
      trendColor: 'text-green-600',
      value: '61.8%',
      label: '1st Trimester Enrollment',
      progressColor: 'bg-green-500',
      progressPercent: 62,
    },
    {
      icon: <UserMinus className="w-5 h-5" />,
      trend: -0.8,
      trendColor: 'text-red-600',
      value: '12.6%',
      label: 'Dropout Rate (ANC1→ANC4)',
      progressColor: 'bg-red-500',
      progressPercent: 13,
    },
    {
      icon: <Target className="w-5 h-5" />,
      trend: -7.6,
      trendColor: 'text-red-600',
      value: '95.0%',
      label: 'WHO Benchmark Target',
      progressColor: 'bg-slate-400',
      progressPercent: 95,
    },
  ]

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  )
}
