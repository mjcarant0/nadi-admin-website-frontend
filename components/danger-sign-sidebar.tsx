'use client'

import { AlertCircle, Zap } from 'lucide-react'

export function DangerSignSidebar() {
  const criticalRegions = [
    { name: 'BARMM', cases: 487, change: '+18.4%' },
    { name: 'Caraga', cases: 412, change: '+12.1%' },
    { name: 'Eastern Visayas', cases: 378, change: '+9.7%' }
  ]

  const elevatedRegions = [
    { name: 'Zamboanga Peninsula', cases: 291, change: '+6.3%' },
    { name: 'Davao Region', cases: 264, change: '+4.8%' },
    { name: 'SOCCSKSARGEN', cases: 238, change: '+3.2%' }
  ]

  const escalationInsights = [
    { title: 'BARMM — Preeclampsia Surge', desc: '18.4% MoM increase — 3 consecutive months rising.', badge: 'Critical', color: 'red' },
    { title: 'Caraga — Hemorrhage Spike', desc: '12.1% rise in postpartum hemorrhage — blood product supply shortage flagged.', badge: 'Critical', color: 'red' },
    { title: 'Eastern Visayas — Multi-sign', desc: 'Co-occurring danger signs in 34% of cases. Eclampsia conversion rate elevated.', badge: 'Watch', color: 'yellow' },
    { title: 'National — Seasonal Peak', desc: 'Historical Q2 surge pattern detected. Pre-positioning of emergency kits advised.', badge: 'Advisory', color: 'blue' }
  ]

  const signBreakdown = [
    { name: 'Preeclampsia / Eclampsia', cases: 1634, percent: 33.9 },
    { name: 'Antepartum / PPH', cases: 1142, percent: 23.7 },
    { name: 'Severe Headache / Visual', cases: 819, percent: 17.0 },
    { name: 'Infection / Sepsis Signs', cases: 614, percent: 12.7 },
    { name: 'Other / Unclassified', cases: 612, percent: 12.7 }
  ]

  return (
    <div className="space-y-6">
      {/* Regional Danger Rankings */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Regional Danger Rankings</h3>
        
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase text-red-600 mb-3">Critical — Highest Incidence</h4>
          <div className="space-y-3">
            {criticalRegions.map((region, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-900">{region.name}</span>
                  <span className="text-xs font-bold text-red-600">{region.change}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: `${(region.cases / 500) * 100}%` }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">{region.cases} cases</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-yellow-600 mb-3">Elevated — Monitoring Required</h4>
          <div className="space-y-3">
            {elevatedRegions.map((region, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-900">{region.name}</span>
                  <span className="text-xs font-bold text-yellow-600">{region.change}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(region.cases / 500) * 100}%` }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">{region.cases} cases</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Escalation Insights */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Escalation Insights</h3>
          <span className="text-xs font-bold text-red-600">5 Escalations</span>
        </div>
        <div className="space-y-3">
          {escalationInsights.map((insight, i) => (
            <div key={i} className="flex gap-3">
              <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                insight.color === 'red' ? 'bg-red-600' :
                insight.color === 'yellow' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-semibold text-slate-900">{insight.title}</p>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    insight.color === 'red' ? 'bg-red-100 text-red-700' :
                    insight.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                  }`}>{insight.badge}</span>
                </div>
                <p className="text-xs text-slate-600">{insight.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sign Type Breakdown */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Sign Type Breakdown</h3>
        <div className="space-y-3">
          {signBreakdown.map((sign, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-slate-700">{sign.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-slate-900 font-semibold">{sign.cases}</span>
                <span className="text-slate-500">({sign.percent}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
