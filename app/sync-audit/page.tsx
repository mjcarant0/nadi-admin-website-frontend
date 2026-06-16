'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { SyncAuditAlert } from '@/components/sync-audit-alert'
import { SyncKPICards } from '@/components/sync-kpi'
import { SyncTabs } from '@/components/sync-tabs'
import { SyncActivityChart, SyncLatencyChart, ValidationOutcomesChart } from '@/components/sync-charts'
import { SyncNodeTable } from '@/components/sync-node-table'
import { SyncSidebar } from '@/components/sync-sidebar'
import { Footer } from '@/components/footer'
import { useSidebar } from '@/components/sidebar-context'

export default function SyncAuditDashboard() {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header 
        title="Sync Audit Dashboard" 
        subtitle="Network Sync Activity — Last sync: 2 min ago • 1,247 active nodes • June 7, 2025"
        showExportMap={false}
      />

      <main className={`pt-24 px-8 pb-8 flex-1 content-transition ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Alert */}
        <SyncAuditAlert />

        {/* KPI Cards */}
        <SyncKPICards />

        {/* Tabs */}
        <SyncTabs />

        {/* Main Content Grid */}
        <div className="grid grid-cols-[65%_35%] gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-6">
            <SyncActivityChart />
            <SyncNodeTable />
            
            {/* Bottom Charts */}
            <div className="grid grid-cols-2 gap-6">
              <SyncLatencyChart />
              <ValidationOutcomesChart />
            </div>
          </div>

          {/* Right Column */}
          <SyncSidebar />
        </div>
      </main>

      <Footer />
    </div>
  )
}
