'use client'

import { Clock, AlertCircle, CheckCircle } from 'lucide-react'

export function FHSISSidebar() {
  const deadlines = [
    { report: 'May 2025 Monthly Report', days: '8 days', status: 'active', color: 'yellow' },
    { report: 'Q1 2025 Quarterly Summary', days: 'Closed', status: 'closed', color: 'green' },
    { report: 'June 2025 Monthly Report', days: '38 days', status: 'upcoming', color: 'slate' }
  ]

  const validationIssues = [
    { title: 'Missing ANC Visit Count', desc: 'BARMM — 21 facilities missing required ANC visit count fields in M1 form.', badge: 'Critical', affects: 'Affects: 21 reports  Blocks submission' },
    { title: 'Inconsistent Delivery Data', desc: 'Caraga — Delivery totals do not reconcile with facility-level birth records (delta >5%).', badge: 'Critical', affects: 'Affects: 9 reports  Requires correction' },
    { title: 'Duplicate Facility Entries', desc: 'Eastern Visayas — 6 BHS facilities submitted duplicate monthly entries for May.', badge: 'Warning', affects: 'Affects: 6 reports  Deduplication needed' },
    { title: 'Outlier Values Detected', desc: 'CALABARZON — Maternal mortality count reported 3σ above regional average. Manual review required.', badge: 'Warning', affects: 'Affects: 3 reports  Flag for review' }
  ]

  const complianceMetrics = [
    { label: 'Timeliness', value: 94.1, target: 95.0 },
    { label: 'Completeness', value: 89.7, target: 95.0 },
    { label: 'Accuracy', value: 88.4, target: 95.0 },
    { label: 'Consistency', value: 93.2, target: 95.0 }
  ]

  const regionRanking = [
    { rank: '#1', region: 'NCR', score: 98.0, color: 'green' },
    { rank: '#2', region: 'Davao', score: 96.3, color: 'green' },
    { rank: '#3', region: 'C. Luzon', score: 94.1, color: 'green' },
    { rank: '#15', region: 'Caraga', score: 62.2, color: 'red' },
    { rank: '#16', region: 'BARMM', score: 58.2, color: 'red' }
  ]

  return (
    <div className="space-y-6">
      {/* Submission Deadlines */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Submission Deadlines</h3>
        <div className="space-y-3">
          {deadlines.map((deadline, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className={`w-5 h-5 ${
                  deadline.color === 'yellow' ? 'text-yellow-600' :
                  deadline.color === 'green' ? 'text-green-600' : 'text-slate-400'
                }`} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{deadline.report}</p>
                  <p className={`text-xs font-bold ${
                    deadline.color === 'yellow' ? 'text-yellow-600' :
                    deadline.color === 'green' ? 'text-green-600' : 'text-slate-500'
                  }`}>{deadline.days}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Validation Issues */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Validation Issues</h3>
          <span className="text-sm font-bold text-red-600">89 Total</span>
        </div>
        <div className="space-y-3">
          {validationIssues.map((issue, i) => (
            <div key={i} className="pb-3 border-b border-slate-200 last:border-b-0">
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-semibold text-slate-900">{issue.title}</p>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  issue.badge === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>{issue.badge}</span>
              </div>
              <p className="text-xs text-slate-600 mb-2">{issue.desc}</p>
              <p className="text-xs text-slate-500">{issue.affects}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Progress */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Compliance Progress</h3>
          <span className="text-xs text-slate-500">May 2025</span>
        </div>
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-slate-900 mb-1">91.3%</p>
          <p className="text-sm text-green-600 font-semibold flex items-center justify-center gap-1">
            <span>↑</span> 1.3% above target
          </p>
        </div>
        <div className="space-y-3 mb-6">
          {complianceMetrics.map((metric, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">{metric.label}</span>
                <span className="text-xs font-semibold text-slate-900">{metric.value}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${metric.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 pt-4">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Region Compliance Ranking</h4>
          <div className="space-y-2">
            {regionRanking.map((region, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-slate-600">{region.rank} {region.region}</span>
                <span className={`text-sm font-bold ${region.color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
                  {region.score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
