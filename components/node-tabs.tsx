import { Server, TrendingUp, AlertTriangle, Activity, CheckCircle2 } from 'lucide-react'

export function NodeTabs() {
  const tabs = [
    { icon: Server, label: 'Node Overview', active: true },
    { icon: TrendingUp, label: 'Uptime History', active: false },
    { icon: AlertTriangle, label: 'Failure Alerts', badge: '8', active: false },
    { icon: Activity, label: 'Performance Metrics', active: false },
    { icon: CheckCircle2, label: 'Operational Readiness', active: false }
  ]

  return (
    <div className="flex gap-0 mb-6 border-b border-slate-200">
      {tabs.map((tab, idx) => {
        const Icon = tab.icon
        return (
          <button
            key={idx}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors relative tab-interactive ${
              tab.active
                ? 'border-b-slate-900 text-slate-900'
                : 'border-b-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
            {tab.badge && (
              <span className="ml-1 px-2 py-0.5 bg-red-600 text-white text-xs font-semibold rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
