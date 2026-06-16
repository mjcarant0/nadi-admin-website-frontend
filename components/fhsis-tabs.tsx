'use client'

import { Folder, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'

export function FHSISTabs() {
  const tabs = [
    { label: 'Report Status', icon: Folder, active: true },
    { label: 'Completeness Tracking', icon: CheckCircle, active: false },
    { label: 'Validation Issues', icon: AlertCircle, active: false },
    { label: 'Submission Deadlines', icon: TrendingUp, active: false }
  ]

  return (
    <div className="flex gap-3 mb-6 border-b border-slate-200 pb-4">
      {tabs.map((tab, i) => {
        const Icon = tab.icon
        return (
          <button
            key={i}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors tab-interactive ${
              tab.active
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
