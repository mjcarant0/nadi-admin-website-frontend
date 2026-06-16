'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { ANCCoverageAlert } from '@/components/anc-coverage-alert'
import { ANCKPICards } from '@/components/anc-kpi-cards'
import { ANCTabs } from '@/components/anc-tabs'
import { NationalANCCoverageTrendChart, ANCVisitCompletionFunnel, CohortPerformanceChart } from '@/components/anc-charts'
import { ANCRegionalRankings, BenchmarkComparisonCard } from '@/components/anc-regional-rankings'
import { InterventionFlagsCard } from '@/components/anc-intervention-flags'
import { Footer } from '@/components/footer'
import { useSidebar } from '@/components/sidebar-context'

export default function ANCAnalyticsPage() {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header 
        title="ANC Coverage Analytics" 
        subtitle="Antenatal Care Delivery Performance — As of June 7, 2025, 06:45 PHT" 
        showExportMap={false} 
      />

      {/* Main Content */}
      <main className={`pt-24 px-8 pb-8 flex-1 content-transition ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Coverage Alert Banner */}
        <ANCCoverageAlert />

        {/* KPI Cards */}
        <ANCKPICards />

        {/* Tab Navigation */}
        <ANCTabs />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-[65%_35%] gap-6 mb-6">
          {/* Left Column - Charts */}
          <div className="space-y-6">
            <NationalANCCoverageTrendChart />
            
            {/* Bottom Charts Grid */}
            <div className="grid grid-cols-2 gap-6">
              <ANCVisitCompletionFunnel />
              <CohortPerformanceChart />
            </div>
          </div>

          {/* Right Column - Rankings and Comparison */}
          <div className="space-y-6">
            <ANCRegionalRankings />
            <BenchmarkComparisonCard />
          </div>
        </div>

        {/* Intervention Flags */}
        <InterventionFlagsCard />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
