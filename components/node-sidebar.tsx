import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { AlertCircle, Activity, CheckCircle2, AlertTriangle, Wifi, RotateCw } from 'lucide-react'

const readinessData = [
  { name: 'Fully Operational', value: 10, color: '#22c55e' },
  { name: 'Partial Readiness', value: 4, color: '#eab308' },
  { name: 'Critical / Offline', value: 2, color: '#dc2626' }
]

export function NodeSidebar() {
  return (
    <div className="space-y-6">
      {/* Infrastructure Health */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Infrastructure Health</h3>
        <div className="mb-6">
          <div className="text-sm text-slate-600 mb-2">Overall Node Health</div>
          <div className="text-4xl font-bold text-green-600 mb-2">95.1%</div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="h-2 rounded-full bg-green-600" style={{ width: '95.1%' }}></div>
          </div>
        </div>
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Online</span>
            <span className="font-semibold text-slate-900">1,186</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Degraded</span>
            <span className="font-semibold text-slate-900">53</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Offline</span>
            <span className="font-semibold text-slate-900">8</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">High CPU (&gt;80%)</span>
            <span className="font-semibold text-slate-900">19 nodes</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">High Memory (&gt;90%)</span>
            <span className="font-semibold text-slate-900">11 nodes</span>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Uptime Ranking by Region</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">#1 NCR</span>
              <div className="flex items-center gap-2 flex-1 mx-2">
                <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-green-600" style={{ width: '99.9%' }}></div>
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">#16 Caraga</span>
              <div className="flex items-center gap-2 flex-1 mx-2">
                <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-red-600" style={{ width: '57.8%' }}></div>
                </div>
              </div>
              <span className="text-xs font-semibold text-red-600">57.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Failure Alerts */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Active Failure Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Node Offline — BHS Maguindanao</p>
              <p className="text-xs text-slate-500 mt-1">CPU: 0% • Memory: 0% • Unreachable</p>
            </div>
          </div>
          <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">High Memory — RHU Surigao Norte</p>
              <p className="text-xs text-slate-500 mt-1">Memory at 94% — threshold exceeded</p>
            </div>
          </div>
          <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">High CPU — BHS Leyte Central</p>
              <p className="text-xs text-slate-500 mt-1">CPU at 88% for 45 min</p>
            </div>
          </div>
          <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
            <Wifi className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Connectivity Degraded — RHU Batangas</p>
              <p className="text-xs text-slate-500 mt-1">Intermittent packet loss • 12% nodes affected</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RotateCw className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Auto-Restart Triggered — BHS Lanao</p>
              <p className="text-xs text-slate-500 mt-1">Node restarted after unresponsive 30 min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Readiness */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Operational Readiness</h3>
        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={readinessData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                  {readinessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-slate-900">94.7%</div>
              <div className="text-xs text-slate-600">Readiness</div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              <span className="text-xs text-slate-600">Fully Operational</span>
            </div>
            <span className="text-xs font-semibold text-slate-900">10 regions</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
              <span className="text-xs text-slate-600">Partial Readiness</span>
            </div>
            <span className="text-xs font-semibold text-slate-900">4 regions</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600"></div>
              <span className="text-xs text-slate-600">Critical / Offline</span>
            </div>
            <span className="text-xs font-semibold text-slate-900">2 regions</span>
          </div>
        </div>
      </div>
    </div>
  )
}
