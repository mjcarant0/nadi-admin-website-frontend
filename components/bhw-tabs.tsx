import { Users, Map, Users2, Zap, AlertCircle } from 'lucide-react'

export function BHWTabs() {
  const tabs = [
    { icon: Users, label: 'BHW Overview', active: true },
    { icon: Map, label: 'GIDA Analysis', active: false },
    { icon: Users2, label: 'Active Barangays', active: false },
    { icon: Zap, label: 'Workforce Distribution', active: false },
    { icon: AlertCircle, label: 'Service Coverage Gaps', active: false }
  ]

  return (
    <div className="flex gap-4 border-b border-slate-200 mb-6 pb-4">
      {tabs.map((tab, idx) => {
        const Icon = tab.icon
        return (
          <button
            key={idx}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
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
