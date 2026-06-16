'use client'

import { AlertTriangle, AlertCircle, Clock } from 'lucide-react'

export function PriorityAlerts() {
  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 mb-6 fade-in transition-all duration-300">
      <div className="flex items-start gap-3 mb-4 animate-pulse">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <h3 className="text-lg font-bold text-slate-900">PRIORITY ALERTS FOR LEADERSHIP</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Alert 1 */}
        <div className="bg-white border border-red-200 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer card-animate">
          <div className="flex items-start gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
            <div className="flex-1">
              <p className="font-semibold text-red-600 text-sm transition-colors duration-300">BARMM ANC Coverage Critical</p>
              <p className="text-xs text-slate-600 mt-2 transition-colors duration-300">Coverage dropped to 52.1% — 19.3% below national target. Immediate intervention required.</p>
            </div>
          </div>
        </div>

        {/* Alert 2 */}
        <div className="bg-white border border-orange-200 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer card-animate" style={{ animationDelay: '0.05s' }}>
          <div className="flex items-start gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
            <div className="flex-1">
              <p className="font-semibold text-orange-600 text-sm transition-colors duration-300">Eastern Visayas Danger Sign Spike</p>
              <p className="text-xs text-slate-600 mt-2 transition-colors duration-300">Severe headache reports up 34% in the last 14 days. Review BHW field reports.</p>
            </div>
          </div>
        </div>

        {/* Alert 3 */}
        <div className="bg-white border border-yellow-200 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer card-animate" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start gap-2 mb-2">
            <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
            <div className="flex-1">
              <p className="font-semibold text-yellow-600 text-sm transition-colors duration-300">FHSIS Q2 Submission Deadline</p>
              <p className="text-xs text-slate-600 mt-2 transition-colors duration-300">3 regions pending Q2 submission. Deadline: June 15, 2025. Reminder sent.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
