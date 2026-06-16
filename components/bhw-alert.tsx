import { AlertTriangle, X } from 'lucide-react'

export function BHWAlert() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-4">
      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium text-yellow-900">
          Coverage Gap Alert: 14 GIDA barangays in BARMM and MIMAROPA have zero active BHW assignments. 3 regions report BHW-to-household ratios exceeding 1:25 (DOH standard). Eastern Visayas shows 18% inactive BHW rate — reactivation campaign recommended.
        </p>
      </div>
      <button className="text-yellow-600 hover:text-yellow-700">
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
