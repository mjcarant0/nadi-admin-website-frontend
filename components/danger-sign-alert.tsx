'use client'

import { AlertCircle, X } from 'lucide-react'

export function DangerSignAlert() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-4">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-semibold text-red-900 mb-1">Escalation Alert:</h3>
        <p className="text-sm text-red-800">
          Preeclampsia cases up <span className="font-bold">18.4% MoM in BARMM</span> — hemorrhage incidence rising in <span className="font-bold">Caraga (↑12.1%)</span> and <span className="font-bold">Eastern Visayas (↑9.7%)</span>. Immediate review recommended.
        </p>
      </div>
      <button className="text-red-600 hover:text-red-700 flex-shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
