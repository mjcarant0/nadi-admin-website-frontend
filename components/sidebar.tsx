'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Heart, BarChart3, MapPin, TrendingUp, FileText, CheckSquare, AlertTriangle, Database, Users, Activity } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && (pathname === '/' || pathname === '')) return true
    return pathname.startsWith(path)
  }

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900">N.A.D.I.</h1>
            <p className="text-xs text-slate-500">DOH Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-8">
        {/* Overview Section */}
        <div>
          <h3 className="text-xs font-semibold uppercase text-slate-500 px-3 mb-3">Overview</h3>
          <ul className="space-y-1">
            <li>
              <Link 
                href="/" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/') && pathname === '/'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Executive Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/gis-heatmap" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/gis-heatmap')
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <MapPin className="w-4 h-4" />
                GIS Maternal Risk Heatmap
              </Link>
            </li>
            <li>
              <Link 
                href="/anc-analytics" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/anc-analytics')
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                ANC Coverage Analytics
              </Link>
            </li>
          </ul>
        </div>

        {/* Monitoring Section */}
        <div>
          <h3 className="text-xs font-semibold uppercase text-slate-500 px-3 mb-3">Monitoring</h3>
          <ul className="space-y-1">
            <li>
              <Link 
                href="/danger-sign-trend" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/danger-sign-trend')
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                Danger Sign Trend Analysis
              </Link>
            </li>
            <li>
              <Link 
                href="/fhsis-reporting" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/fhsis-reporting')
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                FHSIS Reporting Center
              </Link>
            </li>
            <li>
              <Link 
                href="/sync-audit" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/sync-audit')
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                Sync Audit Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/node-health" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/node-health')
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Activity className="w-4 h-4" />
                Node Health Monitoring
              </Link>
            </li>
          </ul>
        </div>

        {/* Field Operations Section */}
        <div>
          <h3 className="text-xs font-semibold uppercase text-slate-500 px-3 mb-3">Field Operations</h3>
          <ul className="space-y-1">
            <li>
              <Link 
                href="/bhw-coverage" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/bhw-coverage')
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Users className="w-4 h-4" />
                BHW Coverage Monitoring
              </Link>
            </li>
            <li>
              <Link 
                href="/cohort-analytics" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/cohort-analytics')
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Database className="w-4 h-4" />
                Cohort Analytics
              </Link>
            </li>
          </ul>
        </div>

        {/* Data Section */}
        <div>
          <h3 className="text-xs font-semibold uppercase text-slate-500 px-3 mb-3">Data</h3>
          <ul className="space-y-1">
            <li>
              <Link 
                href="/data-export" 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/data-export')
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                Data Export Center
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* User Profile Footer */}
      <div className="p-6 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-semibold">
            MS
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Dr. Maria Santos</p>
            <p className="text-xs text-slate-500">National Officer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
