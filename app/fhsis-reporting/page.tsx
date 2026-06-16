'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { FHSISAlert } from '@/components/fhsis-alert'
import { FHSISKPICards } from '@/components/fhsis-kpi'
import { FHSISTabs } from '@/components/fhsis-tabs'
import { MonthlySubmissionProgressChart, ReportCompletenessChart, SubmissionTrendChart } from '@/components/fhsis-charts'
import { FHSISFacilityTable } from '@/components/fhsis-facility-table'
import { FHSISSidebar } from '@/components/fhsis-sidebar'
import { Footer } from '@/components/footer'

export default function FHSISReportingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header 
        title="FHSIS Reporting Center"
        subtitle="Monthly Report Workflow — Reporting Period: May 2025 - Due: June 15, 2025"
        showExportMap={false}
      />

      {/* Main Content */}
      <main className="ml-64 pt-24 px-8 pb-8 flex-1">
        {/* Alert Banner */}
        <FHSISAlert />

        {/* KPI Cards */}
        <FHSISKPICards />

        {/* Tab Navigation */}
        <FHSISTabs />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-[65%_35%] gap-6 mb-6">
          {/* Left Column - Charts and Table */}
          <div className="space-y-6">
            <MonthlySubmissionProgressChart />
            
            {/* Facility Table */}
            <FHSISFacilityTable />

            {/* Bottom Charts Grid */}
            <div className="grid grid-cols-2 gap-6">
              <ReportCompletenessChart />
              <SubmissionTrendChart />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <FHSISSidebar />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
