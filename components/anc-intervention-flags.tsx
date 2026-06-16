'use client'

import { AlertCircle } from 'lucide-react'

interface InterventionFlag {
  region: string
  description: string
  severity: 'urgent' | 'watch'
  details: string
}

const flags: InterventionFlag[] = [
  {
    region: 'BARMM',
    description: '3-month decline',
    details: 'ANC coverage falling consecutively',
    severity: 'urgent',
  },
  {
    region: 'Caraga',
    description: 'High dropout',
    details: 'ANC1→ANC4 dropout rate at 28.3%',
    severity: 'urgent',
  },
  {
    region: 'MIMAROPA',
    description: 'Late enrollment',
    details: 'Only 38% enrolled in 1st trimester',
    severity: 'watch',
  },
  {
    region: 'Bicol',
    description: 'Below regional avg',
    details: 'ANC4+ at 62.8%, below 75% floor',
    severity: 'watch',
  },
]

export function InterventionFlagsCard() {
  const urgentFlags = flags.filter((f) => f.severity === 'urgent')
  const watchFlags = flags.filter((f) => f.severity === 'watch')

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Intervention Flags</h3>
        <div className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          {urgentFlags.length} Active
        </div>
      </div>

      <div className="space-y-3">
        {urgentFlags.map((flag, index) => (
          <div key={index} className="border border-red-200 bg-red-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-red-900">
                  {flag.region} — {flag.description}
                </div>
                <div className="text-sm text-red-800 mt-1">{flag.details}</div>
              </div>
              <div className="flex-shrink-0 px-2.5 py-1 bg-red-600 text-white text-xs font-semibold rounded-full whitespace-nowrap">
                Urgent
              </div>
            </div>
          </div>
        ))}

        {watchFlags.map((flag, index) => (
          <div key={index + urgentFlags.length} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-yellow-900">
                  {flag.region} — {flag.description}
                </div>
                <div className="text-sm text-yellow-800 mt-1">{flag.details}</div>
              </div>
              <div className="flex-shrink-0 px-2.5 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full whitespace-nowrap">
                Watch
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
