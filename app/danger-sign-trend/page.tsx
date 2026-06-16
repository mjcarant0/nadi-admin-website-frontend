'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { DangerSignAlert } from '@/components/danger-sign-alert'
import { DangerSignKPI } from '@/components/danger-sign-kpi'
import { DangerSignTabs } from '@/components/danger-sign-tabs'
import { DangerSignTimeSeriesChart, RegionalCaseDistributionChart, DangerSignDistributionChart } from '@/components/danger-sign-charts'
import { DangerSignSidebar } from '@/components/danger-sign-sidebar'
import { Footer } from '@/components/footer'
import { useSidebar } from '@/components/sidebar-context'

export default function DangerSignTrendPage() {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header 
        title="Danger Sign Trend Analysis" 
        subtitle="Maternal Danger Sign Surveillance — As of June 7, 2025, 06:45 PHT"
        showExportMap={false}
      />

      {/* Main Content */}
      <main className={`pt-24 px-8 pb-8 flex-1 content-transition ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Alert Banner */}
        <DangerSignAlert />

        {/* KPI Cards */}
        <DangerSignKPI />

        {/* Tab Navigation */}
        <DangerSignTabs />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-[65%_35%] gap-6 mb-6">
          {/* Left Column - Charts */}
          <div className="space-y-6">
            <DangerSignTimeSeriesChart />
            
            {/* Bottom Charts Grid */}
            <div className="grid grid-cols-2 gap-6">
              <RegionalCaseDistributionChart />
              <DangerSignDistributionChart />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <DangerSignSidebar />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
