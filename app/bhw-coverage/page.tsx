'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BHWAlert } from '@/components/bhw-alert'
import { BHWKPI } from '@/components/bhw-kpi'
import { BHWTabs } from '@/components/bhw-tabs'
import { BHWRegionalTable, BHWCharts, BHWSidebar } from '@/components/bhw-content'

export default function BHWCoverage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header 
        title="BHW Coverage Monitoring" 
        subtitle="Workforce Distribution & GIDA Analysis — 42,816 BHWs tracked • Last updated: June 7, 2025" 
        showExportMap={false} 
      />

      <main className="ml-64 pt-24 px-8 pb-8 flex-1">
        <BHWAlert />
        <BHWKPI />
        <BHWTabs />

        <div className="grid grid-cols-[1fr_300px] gap-6">
          <div>
            <BHWRegionalTable />
            <BHWCharts />
          </div>
          <BHWSidebar />
        </div>
      </main>

      <Footer />
    </div>
  )
}
