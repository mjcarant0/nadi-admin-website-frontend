import { AlertCircle, X } from 'lucide-react'

export function SyncAuditAlert() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-4">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-semibold text-red-900 mb-1">Sync Failure Alert:</h3>
        <p className="text-sm text-red-800">
          14 nodes in BARMM and Caraga have not synced in over 6 hours. Upload queue backlog detected at 3 BHS nodes. Validation failures spiking in Eastern Visayas — 23 records rejected in the last sync cycle.
        </p>
      </div>
      <button className="text-red-600 hover:text-red-900 flex-shrink-0">
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
