'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Heart, BarChart3, MapPin, TrendingUp, FileText, CheckSquare, AlertTriangle, Database, Users, Activity, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSidebar } from './sidebar-context'

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed } = useSidebar()

  const isActive = (path: string) => {
    if (path === '/' && (pathname === '/' || pathname === '')) return true
    return pathname.startsWith(path)
  }

  return (
    <div className={`bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo Section */}
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={`w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110`}>
            <Heart className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="transition-opacity duration-300 fade-in">
              <h1 className="font-bold text-lg text-slate-900">N.A.D.I.</h1>
              <p className="text-xs text-slate-500">DOH Admin Portal</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-slate-100 rounded-lg transition-all duration-200 ml-auto flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-slate-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          )}
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-8">
        {/* Overview Section */}
        <div>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold uppercase text-slate-500 px-3 mb-3 transition-opacity duration-300">Overview</h3>
          )}
          <ul className="space-y-1">
            <li className="group">
              <Link 
                href="/" 
                title={isCollapsed ? "Executive Dashboard" : ""}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive('/') && pathname === '/'
                    ? 'bg-slate-900 text-white font-medium shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <BarChart3 className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>Executive Dashboard</span>}
              </Link>
            </li>
            <li className="group">
              <Link 
                href="/gis-heatmap" 
                title={isCollapsed ? "GIS Maternal Risk Heatmap" : ""}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive('/gis-heatmap')
                    ? 'bg-slate-900 text-white font-medium shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <MapPin className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>GIS Maternal Risk Heatmap</span>}
              </Link>
            </li>
            <li className="group">
              <Link 
                href="/anc-analytics" 
                title={isCollapsed ? "ANC Coverage Analytics" : ""}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive('/anc-analytics')
                    ? 'bg-slate-900 text-white font-medium shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <TrendingUp className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>ANC Coverage Analytics</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* Monitoring Section */}
        <div>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold uppercase text-slate-500 px-3 mb-3 transition-opacity duration-300">Monitoring</h3>
          )}
          <ul className="space-y-1">
            <li>
              <Link 
                href="/danger-sign-trend" 
                title={isCollapsed ? "Danger Sign Trend Analysis" : ""}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive('/danger-sign-trend')
                    ? 'bg-slate-900 text-white font-medium shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>Danger Sign Trend Analysis</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/fhsis-reporting" 
                title={isCollapsed ? "FHSIS Reporting Center" : ""}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive('/fhsis-reporting')
                    ? 'bg-slate-900 text-white font-medium shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <FileText className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>FHSIS Reporting Center</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/sync-audit" 
                title={isCollapsed ? "Sync Audit Dashboard" : ""}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive('/sync-audit')
                    ? 'bg-slate-900 text-white font-medium shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <CheckSquare className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>Sync Audit Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/node-health" 
                title={isCollapsed ? "Node Health Monitoring" : ""}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive('/node-health')
                    ? 'bg-slate-900 text-white font-medium shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Activity className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>Node Health Monitoring</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* Field Operations Section */}
        <div>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold uppercase text-slate-500 px-3 mb-3 transition-opacity duration-300">Field Operations</h3>
          )}
          <ul className="space-y-1">
            <li>
              <Link 
                href="/bhw-coverage" 
                title={isCollapsed ? "BHW Coverage Monitoring" : ""}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive('/bhw-coverage')
                    ? 'bg-slate-900 text-white font-medium shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Users className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>BHW Coverage Monitoring</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/cohort-analytics" 
                title={isCollapsed ? "Cohort Analytics" : ""}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive('/cohort-analytics')
                    ? 'bg-slate-900 text-white font-medium shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Database className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>Cohort Analytics</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* Data Section */}
        <div>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold uppercase text-slate-500 px-3 mb-3 transition-opacity duration-300">Data</h3>
          )}
          <ul className="space-y-1">
            <li>
              <Link 
                href="/data-export" 
                title={isCollapsed ? "Data Export Center" : ""}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive('/data-export')
                    ? 'bg-slate-900 text-white font-medium shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <FileText className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>Data Export Center</span>}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* User Profile Footer */}
      <div className={`p-4 border-t border-slate-200 transition-all duration-300 ${isCollapsed ? 'px-3' : ''}`}>
        <div className={`flex items-center gap-3 ${isCollapsed ? 'flex-col' : ''}`}>
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-semibold flex-shrink-0 transition-transform duration-200 hover:scale-110">
            MS
          </div>
          {!isCollapsed && (
            <div className="transition-opacity duration-300">
              <p className="text-sm font-medium text-slate-900">Dr. Maria Santos</p>
              <p className="text-xs text-slate-500">National Officer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
