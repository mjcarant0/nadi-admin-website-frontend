import { BarChart, Bar, LineChart, Line, ComposedChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'

export interface CohortTableRow {
  region: string
  tri1: number
  tri2: number
  tri3: number
  danger: number
  risk: number
  preterm: number
  total: number
}

const cohortData: CohortTableRow[] = [
  { region: 'NCR', tri1: 1842, tri2: 2614, tri3: 1908, danger: 1204, risk: 842, preterm: 312, total: 6364 },
  { region: 'Eastern Visayas', tri1: 614, tri2: 891, tri3: 724, danger: 1047, risk: 934, preterm: 413, total: 2229 },
  { region: 'BARMM', tri1: 487, tri2: 712, tri3: 598, danger: 1621, risk: 1284, preterm: 671, total: 1797 },
  { region: 'MIMAROPA', tri1: 312, tri2: 481, tri3: 398, danger: 842, risk: 621, preterm: 284, total: 1191 },
  { region: 'Davao Region', tri1: 892, tri2: 1214, tri3: 1047, danger: 714, risk: 487, preterm: 198, total: 3153 },
  { region: 'Caraga', tri1: 421, tri2: 612, tri3: 514, danger: 612, risk: 358, preterm: 187, total: 1547 },
  { region: 'CALABARZON', tri1: 1124, tri2: 1842, tri3: 1521, danger: 814, risk: 612, preterm: 247, total: 4487 }
]

const gaData = [
  { week: 'W4', count: 12 },
  { week: 'W6', count: 28 },
  { week: 'W8', count: 45 },
  { week: 'W10', count: 62 },
  { week: 'W12', count: 95 },
  { week: 'W14', count: 142 },
  { week: 'W16', count: 188 },
  { week: 'W18', count: 245 },
  { week: 'W20', count: 312 },
  { week: 'W22', count: 378 },
  { week: 'W24', count: 412 },
  { week: 'W26', count: 445 },
  { week: 'W28', count: 478 },
  { week: 'W30', count: 512 },
  { week: 'W32', count: 548 },
  { week: 'W34', count: 580 },
  { week: 'W36', count: 612 },
  { week: 'W38', count: 645 },
  { week: 'W40', count: 678 },
  { week: 'W42', count: 312 }
]

const dangerData = [
  { region: 'BARMM', percent: 85 },
  { region: 'MIMAROPA', percent: 72 },
  { region: 'E. Visayas', percent: 68 },
  { region: 'Zamboanga', percent: 64 },
  { region: 'Davao', percent: 58 },
  { region: 'CALABARZON', percent: 52 },
  { region: 'NCR', percent: 48 }
]

const riskBreakdown = [
  { name: 'Low Risk', value: 42.3, color: '#10b981' },
  { name: 'Moderate Risk', value: 32.7, color: '#f59e0b' },
  { name: 'High Risk', value: 25.0, color: '#ef4444' }
]

export function CohortTable({ data = cohortData }: { data?: CohortTableRow[] }) {
  return (
    <div className="border border-slate-200 rounded-lg p-6 mb-6 bg-white">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Cross-Tab Analysis — Danger Signs × Gestational Age × Region</h3>
      <div className="flex gap-4 mb-4">
        <select className="px-3 py-1.5 border border-slate-200 rounded text-sm">
          <option>View: By Region</option>
        </select>
        <select className="px-3 py-1.5 border border-slate-200 rounded text-sm">
          <option>Columns: Trimester</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Region</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-700">1st Tri</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-700">2nd Tri</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-700">3rd Tri</th>
              <th className="text-center py-3 px-4 font-semibold text-red-600">Danger Signs</th>
              <th className="text-center py-3 px-4 font-semibold text-red-600">High Risk</th>
              <th className="text-center py-3 px-4 font-semibold text-yellow-600">Preterm</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="py-3 px-4 text-slate-900 font-medium">{row.region}</td>
                <td className="py-3 px-4 text-center text-slate-600">{row.tri1}</td>
                <td className="py-3 px-4 text-center text-slate-600">{row.tri2}</td>
                <td className="py-3 px-4 text-center text-slate-600">{row.tri3}</td>
                <td className="py-3 px-4 text-center text-red-600 font-medium">{row.danger}</td>
                <td className="py-3 px-4 text-center text-red-600 font-medium">{row.risk}</td>
                <td className="py-3 px-4 text-center text-yellow-600 font-medium">{row.preterm}</td>
                <td className="py-3 px-4 text-center text-slate-900 font-semibold">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function CohortCharts() {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="border border-slate-200 rounded-lg p-6 bg-white">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Gestational Age Distribution</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={gaData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="week" stroke="#64748b" style={{ fontSize: '10px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }} />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border border-slate-200 rounded-lg p-6 bg-white">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Danger Sign Prevalence — Top Regions</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={dangerData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis dataKey="region" type="category" stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }} />
            <Bar dataKey="percent" fill="#ef4444" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
