'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Heart, BarChart3, MapPin, TrendingUp, FileText, 
  CheckSquare, AlertTriangle, Database, Users, 
  Activity, ChevronLeft, ChevronRight 
} from 'lucide-react'
import { useSidebar } from './sidebar-context'

const navGroups = [
  {
    title: 'Overview',
    items: [
      { label: 'Executive Dashboard', href: '/', icon: BarChart3, exact: true },
      { label: 'GIS Maternal Risk Heatmap', href: '/gis-heatmap', icon: MapPin },
      { label: 'ANC Coverage Analytics', href: '/anc-analytics', icon: TrendingUp },
    ]
  },
  {
    title: 'Monitoring',
    items: [
      { label: 'Danger Sign Trend Analysis', href: '/danger-sign-trend', icon: AlertTriangle },
      { label: 'FHSIS Reporting Center', href: '/fhsis-reporting', icon: FileText },
      { label: 'Sync Audit Dashboard', href: '/sync-audit', icon: CheckSquare },
      { label: 'Node Health Monitoring', href: '/node-health', icon: Activity },
    ]
  },
  {
    title: 'Field Operations',
    items: [
      { label: 'BHW Coverage Monitoring', href: '/bhw-coverage', icon: Users },
      { label: 'Cohort Analytics', href: '/cohort-analytics', icon: Database },
    ]
  },
  {
    title: 'Data',
    items: [
      { label: 'Data Export Center', href: '/data-export', icon: FileText },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed } = useSidebar()

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) return pathname === path || (path === '/' && pathname === '')
    return pathname.startsWith(path)
  }

  return (
    <div className={`bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 transition-[width] duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Absolute Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-8 p-1.5 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 hover:scale-110 rounded-full transition-all duration-300 z-50 flex items-center justify-center text-slate-600 focus:outline-none"
        aria-label="Toggle sidebar"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Logo Section */}
      <div className={`py-5 border-b border-slate-200 flex items-center transition-all duration-500 ${isCollapsed ? 'justify-center px-0' : 'px-6'}`}>
        <div className="flex items-center overflow-hidden">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-105 shadow-md">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div className={`transition-all duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] whitespace-nowrap overflow-hidden flex flex-col justify-center ${isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-32 opacity-100 ml-3'}`}>
            <h1 className="font-bold text-lg text-slate-900 leading-none mb-1">N.A.D.I.</h1>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 leading-none">DOH Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-6 space-y-8 scrollbar-hide">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <h3 className={`text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 transition-all duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] whitespace-nowrap overflow-hidden ${isCollapsed ? 'w-0 opacity-0 h-0 m-0 px-0' : 'w-auto opacity-100 h-auto px-3'}`}>
              {group.title}
            </h3>
            <ul className="space-y-1.5">
              {group.items.map((item, itemIdx) => {
                const active = isActive(item.href, item.exact);
                const Icon = item.icon;
                
                return (
                  <li key={itemIdx} className="group relative">
                    <Link 
                      href={item.href} 
                      className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-all duration-300 ease-[cubic-bezier(0.2,1,0.2,1)] ${
                        active
                          ? 'bg-slate-900 text-white font-medium shadow-md hover:shadow-lg'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      } ${isCollapsed ? 'justify-center' : ''}`}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${!active && 'group-hover:scale-110'}`} />
                      <span className={`transition-all duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] whitespace-nowrap overflow-hidden ${isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-[160px] opacity-100 ml-3'}`}>
                        {item.label}
                      </span>
                    </Link>
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="fixed left-20 ml-2 px-3 py-2 bg-slate-900 text-white text-xs font-semibold rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] whitespace-nowrap shadow-xl">
                        {item.label}
                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-[5px] border-y-transparent border-r-[5px] border-r-slate-900"></div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <div className={`flex items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center text-slate-600 font-bold flex-shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer">
            MS
          </div>
          <div className={`transition-all duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] whitespace-nowrap overflow-hidden flex flex-col justify-center cursor-pointer ${isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-32 opacity-100 ml-3'}`}>
            <p className="text-sm font-semibold text-slate-900 leading-tight">Dr. Maria Santos</p>
            <p className="text-xs text-slate-500 leading-tight mt-0.5">National Officer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
