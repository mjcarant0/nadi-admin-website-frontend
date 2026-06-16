'use client'

import {
  ComposedChart,
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  fhsisSubmissionProgress,
  fhsisModuleCompleteness,
  fhsisSubmissionTrend,
  type FHSISSubmissionDataPoint,
  type FHSISModuleCompleteness,
  type FHSISSubmissionTrendPoint,
} from '@/lib/mock-data'

// ─── Monthly Submission Progress ──────────────────────────────

export function MonthlySubmissionProgressChart() {
  const data: FHSISSubmissionDataPoint[] = fhsisSubmissionProgress

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Monthly Submission Progress — May 2025
        </h3>
        <p className="text-sm text-slate-500">
          Cumulative report submissions by region against targets
        </p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis yAxisId="left" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#64748b"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="submitted"
            stroke="#3b82f6"
            name="Submitted"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="target"
            stroke="#10b981"
            strokeDasharray="5 5"
            name="Target Pace"
            strokeWidth={2}
          />
          <Bar
            yAxisId="right"
            dataKey="errors"
            fill="#fca5a5"
            name="Validation Errors"
            radius={[8, 8, 0, 0]}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Report Completeness by Module ────────────────────────────

export function ReportCompletenessChart() {
  const data: FHSISModuleCompleteness[] = fhsisModuleCompleteness

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Report Completeness by Module</h3>
        <p className="text-sm text-slate-500">Field completion rate per FHSIS form section</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis
            dataKey="module"
            type="category"
            stroke="#64748b"
            style={{ fontSize: '11px' }}
            width={180}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="completion" fill="#fbbf24" name="Completion %" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Submission Trend — Last 6 Months ────────────────────────

export function SubmissionTrendChart() {
  const data: FHSISSubmissionTrendPoint[] = fhsisSubmissionTrend

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Submission Trend — Last 6 Months</h3>
        <p className="text-sm text-slate-500">Compliance rate vs national target (90%)</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#3b82f6"
            name="Compliance Rate"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#10b981"
            strokeDasharray="5 5"
            name="National Target (90%)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
