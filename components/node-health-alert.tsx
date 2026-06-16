import { AlertCircle, X } from 'lucide-react'

export function NodeHealthAlert() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-4">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-semibold text-red-900 mb-1">Node Failure Alert:</h3>
        <p className="text-sm text-red-800">
          8 nodes in BARMM and Caraga are critically offline with CPU utilization at 0%. 3 nodes in Eastern Visayas reporting high memory pressure (&gt;90%). Operational readiness for 2 RHU nodes in CALABARZON is degraded — intervention required.
        </p>
      </div>
      <button className="text-red-600 hover:text-red-900 flex-shrink-0">
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
