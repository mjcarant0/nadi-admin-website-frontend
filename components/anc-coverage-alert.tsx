'use client'

import { AlertCircle, X } from 'lucide-react'
import { useState } from 'react'

export function ANCCoverageAlert() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start justify-between">
      <div className="flex items-start gap-3 flex-1">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-sm font-semibold text-red-900">Coverage Alert: </span>
          <span className="text-sm text-red-800">5 regions below 70% ANC completion threshold — BARMM (52.1%), Caraga (58.9%), Eastern Visayas (63.4%), Zamboanga Peninsula (64.8%), Davao Occidental (67.2%)</span>
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="flex-shrink-0 text-red-600 hover:text-red-700 p-1"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
