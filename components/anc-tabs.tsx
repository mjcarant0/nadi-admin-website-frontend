'use client'

import { BarChart3, LayoutGrid, Users, Target, LineChart } from 'lucide-react'
import { useState } from 'react'

interface Tab {
  id: string
  label: string
  icon: React.ReactNode
}

export function ANCTabs() {
  const [activeTab, setActiveTab] = useState('trends')

  const tabs: Tab[] = [
    { id: 'trends', label: 'Coverage Trends', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'regional', label: 'Regional Breakdown', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'cohort', label: 'Cohort Performance', icon: <Users className="w-4 h-4" /> },
    { id: 'benchmark', label: 'Benchmark Comparison', icon: <Target className="w-4 h-4" /> },
    { id: 'visit', label: 'Visit Completion', icon: <LineChart className="w-4 h-4" /> },
  ]

  return (
    <div className="mb-6 border-b border-slate-200">
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white border-b-slate-900'
                : 'text-slate-600 border-b-transparent hover:text-slate-900'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
