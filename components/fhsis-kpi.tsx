'use client'

import { Folder, CheckCircle, Clock, AlertCircle, Shield } from 'lucide-react'
import { fhsisKPIData, type FHSISKPIData } from '@/lib/mock-data'

export function FHSISKPICards() {
  const data: FHSISKPIData = fhsisKPIData

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {/* Left group of 4 */}
      <div className="grid grid-cols-4 gap-4 col-span-4">
        {/* Submission Rate */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flashcard-interactive">
          <div className="flex items-start justify-between mb-3">
            <Folder className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">{data.submissionRateTrend}</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">{data.submissionRate}%</p>
          <p className="text-xs text-slate-600">Submission Rate</p>
        </div>

        {/* Reports Submitted */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flashcard-interactive">
          <div className="flex items-start justify-between mb-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600">
              <span className="w-2 h-2 bg-green-600 rounded-full" />
              On Track
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">
            {data.reportsSubmitted.toLocaleString()}
          </p>
          <p className="text-xs text-slate-600">
            Reports Submitted
            <br />
            of {data.totalFacilities.toLocaleString()} facilities
          </p>
        </div>

        {/* Awaiting Submission */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flashcard-interactive">
          <div className="flex items-start justify-between mb-3">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
              Pending
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">
            {data.awaitingSubmission.toLocaleString()}
          </p>
          <p className="text-xs text-slate-600">Awaiting Submission</p>
        </div>

        {/* Validation Errors */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flashcard-interactive">
          <div className="flex items-start justify-between mb-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
              Critical
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">
            {data.validationErrors}
          </p>
          <p className="text-xs text-slate-600">
            Validation Errors
            <br />
            <span className="text-red-600">
              {data.criticalErrors} critical • {data.warnings} warnings
            </span>
          </p>
        </div>
      </div>

      {/* Right side — Compliance Score */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 text-white flashcard-interactive">
        <div className="flex items-start justify-between mb-3">
          <Shield className="w-5 h-5" />
          <span className="text-xs font-semibold bg-yellow-500 text-slate-900 px-2 py-1 rounded">
            {data.deadlineDaysLeft} days left
          </span>
        </div>
        <p className="text-3xl font-bold mb-1">{data.complianceScore}%</p>
        <p className="text-xs">Compliance Score</p>
      </div>
    </div>
  )
}
