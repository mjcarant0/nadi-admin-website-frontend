import { List, Upload, Clock, CheckCircle2, FileText } from 'lucide-react'

export function SyncTabs() {
  const tabs = [
    { icon: List, label: 'Node Activity', active: true },
    { icon: Upload, label: 'Upload Volumes', active: false },
    { icon: Clock, label: 'Sync Latency', active: false },
    { icon: CheckCircle2, label: 'Validation Outcomes', active: false },
    { icon: FileText, label: 'Audit Trail', active: false }
  ]

  return (
    <div className="flex gap-0 mb-6 border-b border-slate-200">
      {tabs.map((tab, idx) => {
        const Icon = tab.icon
        return (
          <button
            key={idx}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors tab-interactive ${
              tab.active
                ? 'border-b-slate-900 text-slate-900'
                : 'border-b-transparent text-slate-600 hover:text-slate-900'
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
