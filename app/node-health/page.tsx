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
import { useSidebar } from '@/components/sidebar-context'
import { useApi } from '@/lib/use-api'
import { api } from '@/lib/api'
import { toNodeKPICards, toNodeRegionalStatus } from '@/lib/analytics-adapters'

export default function NodeHealthMonitoring() {
  const { isCollapsed } = useSidebar()
  // Live edge-node telemetry from /admin/node-health (seeded + heartbeat-fed).
  // While loading or on error, the components fall back to their mock defaults.
  const { data } = useApi(() => api.nodeHealth())
  const kpiCards = data ? toNodeKPICards(data.kpis) : undefined
  const regionalNodes = data ? toNodeRegionalStatus(data.nodes) : undefined

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header 
        title="Node Health Monitoring" 
        subtitle="Infrastructure Status — 1,247 nodes tracked • Last refresh: 1 min ago • June 7, 2025"
        showExportMap={false}
      />

      <main className={`pt-24 px-8 pb-8 flex-1 content-transition ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Alert */}
        <NodeHealthAlert />

        {/* KPI Cards */}
        <NodeKPICards cards={kpiCards} />

        {/* Tabs */}
        <NodeTabs />

        {/* Main Content Grid */}
        <div className="grid grid-cols-[65%_35%] gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-6">
            <NodeStatusTable nodes={regionalNodes} />
            
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
