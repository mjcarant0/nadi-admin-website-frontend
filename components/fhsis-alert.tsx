'use client'

import { AlertCircle, Clock, X } from 'lucide-react'

export function FHSISAlert() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-4">
      <Clock className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-semibold text-yellow-900 mb-1">Submission Deadline Warning:</h3>
        <p className="text-sm text-yellow-800">
          <span className="font-bold">8 days remaining</span> for May 2025 FHSIS submission. <span className="font-bold">34 facilities</span> have not yet submitted. <span className="font-bold">12 reports</span> flagged with critical validation errors requiring immediate resolution.
        </p>
      </div>
      <button className="text-yellow-700 hover:text-yellow-800 flex-shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
