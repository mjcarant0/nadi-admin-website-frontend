'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CohortAlert, AdvancedCohortFilters } from '@/components/cohort-filters'
import { CohortTable, CohortCharts } from '@/components/cohort-content'
import { CohortSidebar } from '@/components/cohort-sidebar'

export default function CohortAnalytics() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header 
        title="Cohort Analytics" 
        subtitle="Advanced Filtering — Gestational Age • Danger Signs • Region • Facility Cohorts • Cross-Tab Analysis • Last updated: June 7, 2025" 
        showExportMap={false} 
      />

      <main className="ml-64 pt-24 px-8 pb-8 flex-1">
        <CohortAlert />
        <AdvancedCohortFilters />

        <div className="grid grid-cols-[1fr_320px] gap-6">
          <div>
            <CohortTable />
            <CohortCharts />
          </div>
          <CohortSidebar />
        </div>
      </main>

      <Footer />
    </div>
  )
}
