import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const riskBreakdown = [
  { name: 'Low Risk', value: 42.3, color: '#10b981' },
  { name: 'Moderate Risk', value: 32.7, color: '#f59e0b' },
  { name: 'High Risk', value: 25.0, color: '#ef4444' }
]

const dangerSigns = [
  { name: 'Severe Headache', count: 4218 },
  { name: 'Blurred Vision', count: 3107 },
  { name: 'Vaginal Bleeding', count: 2841 },
  { name: 'Edema (Hands/Face)', count: 2634 },
  { name: 'Fever ≥38°C', count: 1982 },
  { name: 'Decreased Fetal Movement', count: 1521 },
  { name: 'Rupture of Membranes', count: 1203 },
  { name: 'Convulsions', count: 847 }
]

const facilities = [
  { name: 'Barangay Health Station', count: 11204, pct: 45.1 },
  { name: 'Rural Health Unit', count: 8914, pct: 35.9 },
  { name: 'District Hospital', count: 2841, pct: 11.4 },
  { name: 'Provincial Hospital', count: 1858, pct: 7.6 }
]

export function CohortSidebar() {
  return (
    <div className="space-y-4">
      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs text-slate-500 font-medium mb-4">Total Cohort Records</p>
        <p className="text-3xl font-bold text-slate-900">24,817</p>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs text-slate-500 font-medium mb-2">High-Risk Cases</p>
        <p className="text-2xl font-bold text-red-600">6,204</p>
        <p className="text-xs text-red-600 mt-1">25.0% of cohort</p>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs text-slate-500 font-medium mb-2">With Danger Signs</p>
        <p className="text-2xl font-bold text-yellow-600">7,325</p>
        <p className="text-xs text-yellow-600 mt-1">29.5% prevalence</p>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs text-slate-500 font-medium mb-2">Mean Gestational Age</p>
        <p className="text-2xl font-bold text-blue-600">24.3<span className="text-sm">w</span></p>
        <p className="text-xs text-slate-600 mt-1">2nd Trimester majority</p>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs font-semibold text-slate-900 mb-4">Cohort Risk Breakdown</p>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={riskBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
              {riskBreakdown.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 text-xs mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              <span>Low Risk</span>
            </div>
            <span className="font-semibold">42.3%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span>Moderate Risk</span>
            </div>
            <span className="font-semibold">32.7%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600"></div>
              <span>High Risk</span>
            </div>
            <span className="font-semibold">25.0%</span>
          </div>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs font-semibold text-slate-900 mb-3">Danger Sign Frequency</p>
        <div className="space-y-1 max-h-48 overflow-y-auto text-xs">
          {dangerSigns.map((sign, idx) => (
            <div key={idx} className="flex items-center justify-between py-1">
              <span className="text-slate-600">{sign.name}</span>
              <span className="font-semibold text-slate-900">{sign.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <p className="text-xs font-semibold text-slate-900 mb-3">Facility Cohort Distribution</p>
        <div className="space-y-2 text-xs">
          {facilities.map((fac, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-600 flex items-center gap-2">
                  <span>📍</span> {fac.name}
                </span>
                <span className="font-semibold text-slate-900">{fac.count.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-slate-400"
                  style={{ width: `${fac.pct}%` }}
                />
              </div>
              <p className="text-slate-500 mt-1">{fac.pct}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
