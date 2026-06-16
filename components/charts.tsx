'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const trendData = [
  { month: 'Jan', anc1: 82, anc4: 70 },
  { month: 'Feb', anc1: 83, anc4: 71 },
  { month: 'Mar', anc1: 84, anc4: 72 },
  { month: 'Apr', anc1: 85, anc4: 72.5 },
  { month: 'May', anc1: 86.2, anc4: 73.2 },
  { month: 'Jun', anc1: 87.4, anc4: 74.2 },
]

const dangerSignsData = [
  { name: 'Severe Headache', value: 847, color: '#dc2626' },
  { name: 'Blurred Vision', value: 621, color: '#f97316' },
  { name: 'Vaginal Bleeding', value: 534, color: '#eab308' },
  { name: 'Swelling', value: 421, color: '#3b82f6' },
  { name: 'Other', value: 312, color: '#6b7280' },
]

const performanceData = [
  { name: 'ANC Coverage', value: 87.4, color: '#3b82f6' },
  { name: 'Skilled Birth', value: 93.2, color: '#000000' },
  { name: 'Postnatal Care', value: 68.5, color: '#f59e0b' },
]

const pieData = [
  { name: 'ANC Coverage', value: 87, color: '#3b82f6' },
  { name: 'Skilled Birth', value: 9, color: '#f59e0b' },
  { name: 'Postnatal Care', value: 4, color: '#9ca3af' },
]

export function ANCCoverageTrendChart() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm col-span-2">
      <h3 className="text-lg font-bold text-slate-900 mb-6">National ANC Coverage Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis stroke="#64748b" style={{ fontSize: '12px' }} domain={[70, 95]} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
          <Line type="monotone" dataKey="anc1" stroke="#2563eb" strokeWidth={3} dot={false} name="ANC1" />
          <Line type="monotone" dataKey="anc4" stroke="#f59e0b" strokeWidth={3} dot={false} name="ANC4+" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PerformanceBreakdownChart() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm col-span-1">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Performance Breakdown</h3>
      <div className="space-y-3 mb-6">
        {performanceData.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm font-medium text-slate-600">{item.name}</span>
              <span className="text-sm font-bold text-slate-900">{item.value}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: `${item.value}%` }}></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xl font-bold text-slate-900">80.2%</span>
            <span className="text-xs text-slate-500">Avg</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DangerSignsChart() {
  const sortedData = dangerSignsData.sort((a, b) => b.value - a.value)
  
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm col-span-1">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Danger Signs Reported</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={true} vertical={false} />
          <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
          <YAxis type="category" dataKey="name" width={110} stroke="#64748b" style={{ fontSize: '11px' }} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
          <Bar dataKey="value" fill="#dc2626" radius={[0, 4, 4, 0]}>
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function RegionalRankingsCard() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Regional ANC Rankings</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3">Top Performers</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-700">NCR</span>
              <span className="text-sm font-bold text-green-600">96.8%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-600 h-full" style={{ width: '96.8%' }}></div>
            </div>
          </div>
          <div className="space-y-2 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-700">Central Luzon</span>
              <span className="text-sm font-bold text-green-600">94.2%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-600 h-full" style={{ width: '94.2%' }}></div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3">Needs Attention</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-700">BARMM</span>
              <span className="text-sm font-bold text-red-600">52.1%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-red-600 h-full" style={{ width: '52.1%' }}></div>
            </div>
          </div>
          <div className="space-y-2 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-700">Caraga</span>
              <span className="text-sm font-bold text-orange-600">58.9%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-orange-600 h-full" style={{ width: '58.9%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SystemStatusCard() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-4">System Status</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <span className="text-sm text-slate-700">Sync Engine</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span className="text-xs font-semibold text-green-600">Operational</span>
          </div>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <span className="text-sm text-slate-700">Node Network</span>
          <span className="text-xs font-semibold text-slate-700">2,763 / 2,841</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-700">FHSIS Reporting</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-xs font-semibold text-yellow-600">Pending</span>
          </div>
        </div>
      </div>
    </div>
  )
}
