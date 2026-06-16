import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react'

const healthData = [
  { name: 'Online', value: 1186, color: '#22c55e' },
  { name: 'Degraded', value: 61, color: '#eab308' },
  { name: 'Offline', value: 41, color: '#dc2626' }
]

export function SyncSidebar() {
  return (
    <div className="space-y-6">
      {/* Network Sync Health */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Network Sync Health</h3>
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-green-600 mb-2">96.8%</div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="h-2 rounded-full bg-green-600" style={{ width: '96.8%' }}></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span className="text-sm text-slate-600">Online Nodes</span>
            </div>
            <span className="font-semibold text-slate-900">1,186</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
              <span className="text-sm text-slate-600">Degraded Nodes</span>
            </div>
            <span className="font-semibold text-slate-900">61</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span className="text-sm text-slate-600">Offline Nodes</span>
            </div>
            <span className="font-semibold text-slate-900">41</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <span className="text-sm text-slate-600">Queue Backlog</span>
            <span className="font-semibold text-slate-900">715 records</span>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Region Sync Ranking</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">#1 NCR</span>
              <div className="flex items-center gap-2 flex-1 mx-2">
                <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-green-600" style={{ width: '99.4%' }}></div>
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600">99.4%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">#15 BARMM</span>
              <div className="flex items-center gap-2 flex-1 mx-2">
                <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-red-600" style={{ width: '61.3%' }}></div>
                </div>
              </div>
              <span className="text-xs font-semibold text-red-600">61.3%</span>
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

      {/* Recent Audit Events */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Recent Audit Events</h3>
          <span className="text-xs font-semibold text-blue-600">Live Feed</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Sync Failure — BHS Maguindanao</p>
              <p className="text-xs text-slate-500">06:31 AM</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Validation Rejected — RHU Surigao</p>
              <p className="text-xs text-slate-500">06:18 AM</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">High Latency Warning — Leyte</p>
              <p className="text-xs text-slate-500">05:54 AM</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Bulk Sync Completed — NCR</p>
              <p className="text-xs text-slate-500">05:38 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Volume by Type */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Upload Volume by Type</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={healthData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
              {healthData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-4">
          {healthData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs text-slate-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
