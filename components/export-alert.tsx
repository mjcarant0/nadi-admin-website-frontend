import { Shield, X } from 'lucide-react'

export function ExportAlert() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
      <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium text-blue-900">
          Secure Export Workspace: All exports are permission-controlled and audit-logged. Only anonymized, aggregated population data is exportable. Personal identifiers are automatically redacted. Your access level: <strong>National Officer — Full Export Rights</strong>. All downloads are encrypted in transit.
        </p>
      </div>
      <button className="text-blue-600 hover:text-blue-700">
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
