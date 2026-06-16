'use client'

import { Flame, AlertTriangle, Target, Shield } from 'lucide-react'

export function GISKPICards() {
  const cards = [
    {
      icon: Flame,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-50',
      value: '5',
      label: 'Critical Regions',
    },
    {
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      iconBg: 'bg-yellow-50',
      value: '23',
      label: 'Active Hotspots',
    },
    {
      icon: Target,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50',
      value: '148',
      label: 'High-Risk Municipalities',
    },
    {
      icon: Shield,
      iconColor: 'text-green-500',
      iconBg: 'bg-green-50',
      value: '9',
      label: 'Low-Risk Regions',
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const IconComponent = card.icon
        return (
          <div key={idx} className="bg-white p-4 rounded-lg border border-slate-200">
            <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center mb-3`}>
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
