'use client'

import { ComposedChart, LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts'

const submissionData = [
  { date: 'Jun 1', submitted: 850, target: 900, errors: 12 },
  { date: 'Jun 2', submitted: 920, target: 920, errors: 18 },
  { date: 'Jun 3', submitted: 980, target: 940, errors: 14 },
  { date: 'Jun 4', submitted: 1050, target: 960, errors: 22 },
  { date: 'Jun 5', submitted: 1120, target: 980, errors: 28 },
  { date: 'Jun 6', submitted: 1180, target: 1000, errors: 35 },
  { date: 'Jun 7', submitted: 1247, target: 1020, errors: 45 }
]

const moduleCompleteness = [
  { module: 'M6: Disease Surveillance', completion: 85.6 },
  { module: 'M5: Immunization', completion: 84.2 },
  { module: 'M4: Nutrition', completion: 79.3 },
  { module: 'M3: Family Planning', completion: 84.7 },
  { module: 'M2: Child Health', completion: 88.1 },
  { module: 'M1: Maternal Care', completion: 92.43 }
]

const submissionTrend = [
  { month: 'Dec 24', rate: 88.2, target: 90 },
  { month: 'Jan 25', rate: 89.1, target: 90 },
  { month: 'Feb 25', rate: 87.5, target: 90 },
  { month: 'Mar 25', rate: 89.8, target: 90 },
  { month: 'Apr 25', rate: 90.2, target: 90 },
  { month: 'May 25', rate: 91.3, target: 90 }
]

export function MonthlySubmissionProgressChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Monthly Submission Progress — May 2025</h3>
        <p className="text-sm text-slate-500">Cumulative report submissions by region against targets</p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={submissionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis yAxisId="left" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis yAxisId="right" orientation="right" stroke="#64748b" style={{ fontSize: '12px' }} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="submitted" stroke="#3b82f6" name="Submitted" strokeWidth={2} dot={{ r: 4 }} />
          <Line yAxisId="left" type="monotone" dataKey="target" stroke="#10b981" strokeDasharray="5 5" name="Target Pace" strokeWidth={2} />
          <Bar yAxisId="right" dataKey="errors" fill="#fca5a5" name="Validation Errors" radius={[8, 8, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ReportCompletenessChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Report Completeness by Module</h3>
        <p className="text-sm text-slate-500">Field completion rate per FHSIS form section</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={moduleCompleteness} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis dataKey="module" type="category" stroke="#64748b" style={{ fontSize: '11px' }} width={180} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
          <Bar dataKey="completion" fill="#fbbf24" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function SubmissionTrendChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Submission Trend — Last 6 Months</h3>
        <p className="text-sm text-slate-500">Compliance rate vs national target (90%)</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={submissionTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
          <Legend />
          <Line type="monotone" dataKey="rate" stroke="#3b82f6" name="Compliance Rate" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="target" stroke="#10b981" strokeDasharray="5 5" name="National Target (90%)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
