'use client'

import { ComposedChart, LineChart, BarChart, PieChart, Pie, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer, Sector } from 'recharts'

const timeSeriesData = [
  { date: 'Jun 24', preeclampsia: 87, hemorrhage: 65, other: 45 },
  { date: 'Jul 24', preeclampsia: 95, hemorrhage: 72, other: 52 },
  { date: 'Aug 24', preeclampsia: 103, hemorrhage: 78, other: 58 },
  { date: 'Sep 24', preeclampsia: 118, hemorrhage: 85, other: 63 },
  { date: 'Oct 24', preeclampsia: 125, hemorrhage: 92, other: 70 },
  { date: 'Nov 24', preeclampsia: 132, hemorrhage: 98, other: 76 },
  { date: 'Dec 24', preeclampsia: 138, hemorrhage: 104, other: 82 },
  { date: 'Jan 25', preeclampsia: 145, hemorrhage: 110, other: 88 },
  { date: 'Feb 25', preeclampsia: 156, hemorrhage: 115, other: 94 },
  { date: 'Mar 25', preeclampsia: 168, hemorrhage: 120, other: 100 },
  { date: 'Apr 25', preeclampsia: 178, hemorrhage: 125, other: 105 },
  { date: 'May 25', preeclampsia: 192, hemorrhage: 130, other: 110 }
]

const regionalDistributionData = [
  { name: 'BARMM', preeclampsia: 85, hemorrhage: 42 },
  { name: 'Caraga', preeclampsia: 68, hemorrhage: 38 },
  { name: 'E. Visayas', preeclampsia: 55, hemorrhage: 28 },
  { name: 'MIMAROPA', preeclampsia: 42, hemorrhage: 22 },
  { name: 'Bicol', preeclampsia: 38, hemorrhage: 18 },
  { name: 'Davao', preeclampsia: 35, hemorrhage: 15 }
]

const distributionData = [
  { name: 'Preeclampsia/Eclampsia', value: 1634, percentage: 33.9, color: '#ef4444' },
  { name: 'Antepartum/PPH', value: 1142, percentage: 23.7, color: '#f59e0b' },
  { name: 'Severe Headache/Visual', value: 819, percentage: 17.0, color: '#3b82f6' },
  { name: 'Infection/Sepsis Signs', value: 614, percentage: 12.7, color: '#d1d5db' },
  { name: 'Other', value: 612, percentage: 12.7, color: '#6b7280' }
]

export function DangerSignTimeSeriesChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Danger Sign Incidence — 12-Month Time Series</h3>
        <p className="text-sm text-slate-500">Monthly case counts for preeclampsia, hemorrhage, and other danger signs nationwide</p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={timeSeriesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
            formatter={(value) => value}
          />
          <Legend />
          <Line type="monotone" dataKey="preeclampsia" stroke="#ef4444" name="Preeclampsia" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="hemorrhage" stroke="#f59e0b" name="Hemorrhage" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="other" stroke="#9ca3af" name="Other Signs" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function RegionalCaseDistributionChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Regional Case Distribution</h3>
        <p className="text-sm text-slate-500">Preeclampsia & hemorrhage by region</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={regionalDistributionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
          <Legend />
          <Bar dataKey="preeclampsia" fill="#ef4444" name="Preeclampsia" radius={[8, 8, 0, 0]} />
          <Bar dataKey="hemorrhage" fill="#f59e0b" name="Hemorrhage" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DangerSignDistributionChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Danger Sign Distribution</h3>
        <p className="text-sm text-slate-500">Proportion by type — Q2 2025</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={distributionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {distributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => value} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <p className="text-2xl font-bold text-slate-900">4,821</p>
        <p className="text-sm text-slate-500">Total</p>
      </div>
    </div>
  )
}
