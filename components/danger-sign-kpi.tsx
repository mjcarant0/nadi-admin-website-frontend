'use client'

import { AlertCircle, Heart, Droplet, TrendingUp, Briefcase } from 'lucide-react'

export function DangerSignKPI() {
  const cards = [
    {
      icon: AlertCircle,
      label: 'Total Danger Sign Cases',
      value: '4,821',
      change: '+11.2%',
      changeColor: 'text-red-600',
      borderColor: 'border-red-300',
      bgColor: 'bg-red-50'
    },
    {
      icon: Heart,
      label: 'Preeclampsia Cases',
      value: '1,634',
      change: '+18.4%',
      changeColor: 'text-red-600',
      borderColor: 'border-red-300',
      bgColor: 'bg-red-50'
    },
    {
      icon: Droplet,
      label: 'Hemorrhage Cases',
      value: '1,142',
      change: '+9.1%',
      changeColor: 'text-red-600',
      borderColor: 'border-yellow-300',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: TrendingUp,
      label: 'Escalation Rate',
      value: '34.7%',
      change: '+2.3pts',
      changeColor: 'text-red-600',
      borderColor: 'border-blue-300',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Briefcase,
      label: 'Other Danger Signs',
      value: '2,045',
      change: '+4.8%',
      changeColor: 'text-yellow-600',
      borderColor: 'border-slate-300',
      bgColor: 'bg-slate-50'
    }
  ]

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {cards.map((card, i) => {
        const Icon = card.icon
        return (
          <div key={i} className={`${card.bgColor} border ${card.borderColor} border-b-4 rounded-lg p-4`}>
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
