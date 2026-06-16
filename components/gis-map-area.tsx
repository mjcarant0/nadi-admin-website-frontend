'use client'

import { ZoomIn, ZoomOut, Maximize2, Circle } from 'lucide-react'

export function GISMapArea() {
  return (
    <div className="relative bg-blue-50 rounded-lg border border-slate-200 aspect-video overflow-hidden">
      {/* Map Placeholder */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-blue-200 mb-4">🗺️</div>
          <p className="text-slate-400 font-medium">Philippines Geographic Map</p>
          <p className="text-slate-300 text-sm">Risk Intensity Layer Visualization</p>
        </div>
      </div>

      {/* Floating Map Controls - Top Right */}
      <div className="absolute top-4 right-4 flex flex-col gap-1 bg-white rounded-lg border border-slate-200 shadow-md overflow-hidden">
        <button className="p-2 hover:bg-slate-100 transition-colors" title="Zoom In">
          <ZoomIn className="w-4 h-4 text-slate-700" />
        </button>
        <div className="border-t border-slate-200"></div>
        <button className="p-2 hover:bg-slate-100 transition-colors" title="Zoom Out">
          <ZoomOut className="w-4 h-4 text-slate-700" />
        </button>
        <div className="border-t border-slate-200"></div>
        <button className="p-2 hover:bg-slate-100 transition-colors" title="Fullscreen">
          <Maximize2 className="w-4 h-4 text-slate-700" />
        </button>
      </div>

      {/* Floating Legend - Bottom Left */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg border border-slate-200 p-4 shadow-md w-56">
        <h4 className="font-semibold text-slate-900 text-sm mb-3">Risk Intensity</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-xs text-slate-700">Critical (&lt;60% ANC)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-xs text-slate-700">High (60-75%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-slate-700">Moderate (75-90%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="text-xs text-slate-700">Low (&gt;90%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-600 rounded-full border-2 border-red-800"></div>
            <span className="text-xs text-slate-700">Hotspot Cluster</span>
          </div>
        </div>
      </div>
    </div>
  )
}
