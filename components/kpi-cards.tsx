'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'

export function KPICards() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {/* Card 1: National ANC Coverage */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <p className="text-sm text-slate-500 font-medium mb-2">National ANC Coverage</p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold text-slate-900">87.4%</span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <span className="text-xs font-semibold text-green-700">+3.2%</span>
          </span>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full" style={{ width: '87.4%' }}></div>
        </div>
        <p className="text-xs text-slate-500 mt-3">Target: 95%</p>
      </div>

      {/* Card 2: Maternal Mortality Ratio */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <p className="text-sm text-slate-500 font-medium mb-2">Maternal Mortality Ratio</p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold text-slate-900">114</span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
            <TrendingDown className="w-3 h-3 text-green-600" />
            <span className="text-xs font-semibold text-green-700">-5.3%</span>
          </span>
        </div>
        <p className="text-xs text-slate-500">per 100,000 live births - Q2 2025</p>
        <p className="text-xs text-slate-500 mt-2">Improved vs. Q4 2024 (120)</p>
      </div>

      {/* Card 3: Reporting Facilities */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <p className="text-sm text-slate-500 font-medium mb-2">Reporting Facilities</p>
        <div className="mb-4">
          <span className="text-4xl font-bold text-slate-900">2,763</span>
        </div>
        <p className="text-xs text-slate-500">of 2,841 total</p>
        <p className="text-xs text-orange-600 mt-2">78 facilities not synced</p>
      </div>

      {/* Card 4: Active BHWs Reporting */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <p className="text-sm text-slate-500 font-medium mb-2">Active BHWs Reporting</p>
        <div className="mb-4">
          <span className="text-4xl font-bold text-slate-900">48,291</span>
        </div>
        <p className="text-xs text-slate-500">across 17 regions nationwide</p>
        <p className="text-xs text-green-600 mt-2">94.3% submission rate</p>
      </div>
    </div>
  )
}
