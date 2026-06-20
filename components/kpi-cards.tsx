'use client'

import { AlertTriangle, Activity, CloudOff, MapPin } from 'lucide-react'
import { api } from '@/lib/api'
import { useApi } from '@/lib/use-api'

const fmt = (n: number) => n.toLocaleString('en-US')

export function KPICards() {
  const { data, error, loading } = useApi(() => api.dashboard(), [])

  const cards = [
    {
      title: 'Active Pregnancies',
      icon: Activity,
      value: data ? fmt(data.total_active_pregnancies) : '—',
      subtitle: 'Encounters in the last 9 months',
      accent: 'text-blue-600',
      animationDelay: '0ms',
    },
    {
      title: 'Critical Triage Queue',
      icon: AlertTriangle,
      value: data ? fmt(data.critical_triage_queue_count) : '—',
      subtitle: 'Critical danger signs awaiting DTTB review',
      accent: 'text-red-600',
      animationDelay: '80ms',
    },
    {
      title: 'Offline Syncs Pending',
      icon: CloudOff,
      value: data ? fmt(data.offline_syncs_pending) : '—',
      subtitle: 'Encounters in DRAFT (not yet synced)',
      accent: 'text-orange-600',
      animationDelay: '160ms',
    },
    {
      title: 'Regional Risk Points',
      icon: MapPin,
      value: data ? fmt(data.regional_risk_points.length) : '—',
      subtitle: 'Geotagged danger-sign encounters (30 days)',
      accent: 'text-purple-600',
      animationDelay: '240ms',
    },
  ]

  return (
    <div className="mb-6">
      {error && (
        <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          Could not load dashboard metrics: {error}
        </div>
      )}
      <div className="grid grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon
          return (
            <div
              key={idx}
              className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm card-animate flashcard-interactive hover:shadow-lg hover:border-slate-300 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: card.animationDelay }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-500 font-medium transition-colors duration-300">{card.title}</p>
                <Icon className={`w-4 h-4 ${card.accent}`} />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span
                  className={`text-4xl font-bold text-slate-900 transition-colors duration-300 ${
                    loading ? 'animate-pulse text-slate-300' : ''
                  }`}
                >
                  {loading ? '···' : card.value}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2 transition-colors duration-300">{card.subtitle}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
