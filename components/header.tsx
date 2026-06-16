'use client'

import { Download, Radio, Bell, Map } from 'lucide-react'
import { useSidebar } from './sidebar-context'

interface HeaderProps {
  title?: string
  subtitle?: string
  showExportMap?: boolean
}

export function Header({ title = 'Executive Dashboard', subtitle = 'National KPI Overview — As of June 7, 2025, 06:45 PHT', showExportMap = false }: HeaderProps) {
  const { isCollapsed } = useSidebar()

  return (
    <header className={`fixed top-0 right-0 bg-white border-b border-slate-200 z-40 h-24 transition-all duration-300 ease-in-out ${isCollapsed ? 'left-20' : 'left-64'}`}>
      <div className="h-full px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="fade-in">
            <div className="flex items-center gap-2 transition-all duration-300">
              <h2 className="text-2xl font-bold text-slate-900 transition-colors duration-300">{title}</h2>
              <div className="flex items-center gap-1.5 bg-blue-100 px-2.5 py-1 rounded-full transition-all duration-300">
                <Radio className="w-3 h-3 text-blue-600 fill-blue-600 animate-pulse" />
                <span className="text-xs font-semibold text-blue-700">LIVE</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-1 transition-colors duration-300">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {showExportMap && (
            <>
              <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200">
                National View
              </button>
              <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:border-slate-300 transition-all duration-200">
                <option>Q2 2025</option>
                <option>Q1 2025</option>
                <option>Q4 2024</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:scale-105 transition-all duration-200">
                <Map className="w-4 h-4" />
                Export Map
              </button>
            </>
          )}
          {!showExportMap && (
            <>
              <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:border-slate-300 transition-all duration-200">
                <option>Q2 2025</option>
                <option>Q1 2025</option>
                <option>Q4 2024</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:scale-105 transition-all duration-200">
                <Download className="w-4 h-4" />
                Export
              </button>
            </>
          )}
          <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-all duration-200">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">3</span>
          </button>
        </div>
      </div>
    </header>
  )
}
