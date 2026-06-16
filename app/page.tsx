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

export default function ExecutiveDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header title="Executive Dashboard" subtitle="National KPI Overview — As of June 7, 2025, 06:45 PHT" />

      {/* Main Content */}
      <main className="ml-64 pt-24 px-8 pb-8 flex-1">
        {/* Priority Alerts */}
        <PriorityAlerts />

        {/* KPI Cards */}
        <KPICards />

        {/* Charts Grid */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <ANCCoverageTrendChart />
          <PerformanceBreakdownChart />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-6">
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
