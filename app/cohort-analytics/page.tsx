'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CohortAlert, AdvancedCohortFilters } from '@/components/cohort-filters'
import { CohortTable, CohortCharts } from '@/components/cohort-content'
import { CohortSidebar } from '@/components/cohort-sidebar'
import { useSidebar } from '@/components/sidebar-context'
import { useApi } from '@/lib/use-api'
import { api } from '@/lib/api'
import { toCohortTableRows } from '@/lib/analytics-adapters'

export default function CohortAnalytics() {
  const { isCollapsed } = useSidebar()
  // Live cohort cross-tab from /admin/cohort-analytics (trimester × barangay,
  // derived from LMP vs encounter date). Falls back to mock while loading.
  const { data } = useApi(() => api.cohortAnalytics())
  const cohortRows = data ? toCohortTableRows(data.cohorts) : undefined

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header 
        title="Cohort Analytics" 
        subtitle="Advanced Filtering — Gestational Age • Danger Signs • Region • Facility Cohorts • Cross-Tab Analysis • Last updated: June 7, 2025" 
        showExportMap={false} 
      />

      <main className={`pt-24 px-8 pb-8 flex-1 content-transition ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <CohortAlert />
        <AdvancedCohortFilters />

        <div className="grid grid-cols-[1fr_320px] gap-6">
          <div>
            <CohortTable data={cohortRows} />
            <CohortCharts />
          </div>
          <CohortSidebar />
        </div>
      </main>

      <Footer />
    </div>
  )
}
