'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts'

const trendData = [
  { month: 'Jan', anc1: 88, anc4: 71, target: 95, py2024: 87 },
  { month: 'Feb', anc1: 88.5, anc4: 71.5, target: 95, py2024: 87.2 },
  { month: 'Mar', anc1: 89, anc4: 72, target: 95, py2024: 87.5 },
  { month: 'Apr', anc1: 89.3, anc4: 72.5, target: 95, py2024: 88 },
  { month: 'May', anc1: 89.5, anc4: 73, target: 95, py2024: 88.2 },
  { month: 'Jun', anc1: 89.8, anc4: 73.5, target: 95, py2024: 88.5 },
  { month: 'Jul', anc1: 90, anc4: 74, target: 95, py2024: 88.8 },
  { month: 'Aug', anc1: 90.2, anc4: 74.2, target: 95, py2024: 89 },
  { month: 'Sep', anc1: 90.3, anc4: 74.5, target: 95, py2024: 89.2 },
  { month: 'Oct', anc1: 90.5, anc4: 74.8, target: 95, py2024: 89.5 },
  { month: 'Nov', anc1: 90.7, anc4: 75, target: 95, py2024: 89.7 },
  { month: 'Dec', anc1: 90.9, anc4: 75.2, target: 95, py2024: 90 },
]

const funnelData = [
  { stage: 'ANC1', value: 100 },
  { stage: 'ANC2', value: 94.2 },
  { stage: 'ANC3', value: 88.7 },
  { stage: 'ANC4', value: 84.5 },
  { stage: 'ANC5', value: 76.8 },
  { stage: 'ANC6', value: 67.3 },
  { stage: 'ANC7', value: 54.2 },
  { stage: 'ANC8', value: 41.8 },
]

const cohortData = [
  { quarter: 'Q1 2025', anc1Rate: 91, anc4Rate: 67 },
  { quarter: 'Q2 2025', anc1Rate: 88, anc4Rate: 72 },
  { quarter: 'Q3 2025', anc1Rate: 87, anc4Rate: 71 },
  { quarter: 'Q4 2025', anc1Rate: 85, anc4Rate: 69 },
]

export function NationalANCCoverageTrendChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">National ANC Coverage — Historical Trend</h3>
        <p className="text-sm text-slate-600 mb-4">Monthly coverage rate with ANC1, ANC4+, and WHO benchmark overlay</p>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded">ANC1</span>
          <span className="px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded">ANC4+</span>
          <span className="px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded">WHO Target</span>
          <span className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded">vs 2024</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis domain={[60, 100]} stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }} />
          <Line type="monotone" dataKey="anc1" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="anc4" stroke="#eab308" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          <Line type="monotone" dataKey="py2024" stroke="#cbd5e1" strokeWidth={1} strokeDasharray="3 3" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ANCVisitCompletionFunnel() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">ANC Visit Completion Funnel</h3>
          <p className="text-sm text-slate-600">ANC1 → ANC8 national dropout analysis</p>
        </div>
        <div className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1">
          <span>↘</span> 12.6% dropout
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={funnelData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="stage" stroke="#94a3b8" />
          <YAxis domain={[0, 100]} stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {funnelData.map((entry, index) => {
              let color = '#22c55e'
              if (entry.value < 80) color = '#eab308'
              if (entry.value < 60) color = '#ef4444'
              return <Bar key={index} dataKey="value" fill={color} />
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CohortPerformanceChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">Cohort Performance by Quarter</h3>
        <p className="text-sm text-slate-600">Completion rates per enrollment cohort</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={cohortData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="quarter" stroke="#94a3b8" />
          <YAxis domain={[0, 100]} stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }} />
          <Legend />
          <Bar dataKey="anc1Rate" fill="#3b82f6" name="ANC1 Rate" radius={[4, 4, 0, 0]} />
          <Bar dataKey="anc4Rate" fill="#eab308" name="ANC4+ Rate" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
