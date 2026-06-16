'use client'

import { CheckCircle, Clock, AlertCircle } from 'lucide-react'
import {
  fhsisFacilityRows,
  type FHSISFacilityRow,
  type FacilityStatus,
} from '@/lib/mock-data'

function getStatusIcon(status: FacilityStatus) {
  if (status === 'Submitted') return <CheckCircle className="w-4 h-4 text-green-600" />
  if (status === 'Partial') return <Clock className="w-4 h-4 text-yellow-600" />
  return <AlertCircle className="w-4 h-4 text-red-600" />
}

function getStatusBadge(status: FacilityStatus) {
  if (status === 'Submitted') return 'bg-green-100 text-green-700'
  if (status === 'Partial') return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}

export function FHSISFacilityTable() {
  const facilities: FHSISFacilityRow[] = fhsisFacilityRows

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6 table-animate">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Facility Report Status by Region</h3>
        <p className="text-sm text-slate-500">
          Submission status, completeness, and validation flags per region
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-slate-900">REGION / FACILITY</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-900">STATUS</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-900">COMPLETENESS</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-900">SUBMITTED</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-900">ERRORS</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-900">DEADLINE</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((facility) => (
              <tr key={facility.id} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-900">{facility.region}</p>
                  <p className="text-xs text-slate-500">{facility.facilities}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(facility.status)}
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${getStatusBadge(
                        facility.status
                      )}`}
                    >
                      {facility.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="w-24">
                    <div className="bg-slate-200 rounded-full h-2 mb-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${facility.completeness}%` }}
                      />
                    </div>
                    <p className="text-xs font-semibold text-slate-900">{facility.completeness}%</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-700">{facility.submitted}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      facility.errors === 0
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 font-semibold'
                    }
                  >
                    {facility.errors}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      facility.deadline === 'Met'
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 font-semibold'
                    }
                  >
                    {facility.deadline}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
