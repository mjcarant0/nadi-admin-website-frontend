'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { PriorityAlerts } from '@/components/priority-alerts'
import { KPICards } from '@/components/kpi-cards'
import {
  ANCCoverageTrendChart,
  PerformanceBreakdownChart,
  DangerSignsChart,
  RegionalRankingsCard,
  SystemStatusCard,
} from '@/components/charts'
import { Footer } from '@/components/footer'
import { useSidebar } from '@/components/sidebar-context'

export default function ExecutiveDashboard() {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header title="Executive Dashboard" subtitle="National KPI Overview — As of June 7, 2025, 06:45 PHT" />

      {/* Main Content */}
      <main className={`pt-24 px-8 pb-8 flex-1 content-transition ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Priority Alerts */}
        <div className="fade-in">
          <PriorityAlerts />
        </div>

        {/* KPI Cards */}
        <div className="fade-in" style={{ animationDelay: '0.1s' }}>
          <KPICards />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-3 gap-6 mb-6 fade-in" style={{ animationDelay: '0.2s' }}>
          <ANCCoverageTrendChart />
          <PerformanceBreakdownChart />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-6 fade-in" style={{ animationDelay: '0.3s' }}>
          <DangerSignsChart />
          <RegionalRankingsCard />
          <SystemStatusCard />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
