'use client'

import { Globe, ToggleLeft, ToggleRight, Layers } from 'lucide-react'

export function MapControls() {
  return (
    <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200">
      {/* Left Side - Location Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-700">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">Philippines</span>
        </div>
        
        {/* Location Toggle Group */}
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
          <button className="px-4 py-2 rounded bg-slate-900 text-white text-sm font-medium pill-interactive">National</button>
          <button className="px-4 py-2 rounded text-slate-700 text-sm font-medium hover:bg-white pill-interactive">Regional</button>
          <button className="px-4 py-2 rounded text-slate-700 text-sm font-medium hover:bg-white pill-interactive">Municipal</button>
        </div>
      </div>

      {/* Right Side - Layer Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-700">
          <Layers className="w-4 h-4" />
          <span className="text-sm font-medium">Layer:</span>
        </div>
        
        {/* Layer Toggle Group */}
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
          <button className="px-3 py-2 rounded bg-slate-900 text-white text-sm font-medium pill-interactive">Risk Intensity</button>
          <button className="px-3 py-2 rounded text-slate-700 text-sm font-medium hover:bg-white pill-interactive">Hotspot Clusters</button>
          <button className="px-3 py-2 rounded text-slate-700 text-sm font-medium hover:bg-white pill-interactive">ANC Gap</button>
          <button className="px-3 py-2 rounded text-slate-700 text-sm font-medium hover:bg-white pill-interactive">Danger Signs</button>
        </div>

        {/* Compare Regions Button */}
        <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 pill-interactive">
          Compare Regions
        </button>
      </div>
    </div>
  )
}
