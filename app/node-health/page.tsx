'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { NodeHealthAlert } from '@/components/node-health-alert'
import { NodeKPICards } from '@/components/node-kpi'
import { NodeTabs } from '@/components/node-tabs'
import { NetworkUptimeChart, ResourceUtilizationChart, UptimeHistoryGrid } from '@/components/node-charts'
import { NodeStatusTable } from '@/components/node-status-table'
import { NodeSidebar } from '@/components/node-sidebar'
import { Footer } from '@/components/footer'

export default function NodeHealthMonitoring() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header 
        title="Node Health Monitoring" 
        subtitle="Infrastructure Status — 1,247 nodes tracked • Last refresh: 1 min ago • June 7, 2025"
        showExportMap={false}
      />

      <main className="ml-64 pt-24 px-8 pb-8 flex-1">
        {/* Alert */}
        <NodeHealthAlert />

        {/* KPI Cards */}
        <NodeKPICards />

        {/* Tabs */}
        <NodeTabs />

        {/* Main Content Grid */}
        <div className="grid grid-cols-[65%_35%] gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-6">
            <NodeStatusTable />
            
            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
              <NetworkUptimeChart />
              <ResourceUtilizationChart />
            </div>

            {/* Uptime History */}
            <UptimeHistoryGrid />
          </div>

          {/* Right Column */}
          <NodeSidebar />
        </div>
      </main>

      <Footer />
    </div>
  )
}
