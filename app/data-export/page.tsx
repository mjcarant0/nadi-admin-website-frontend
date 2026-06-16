'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ExportAlert } from '@/components/export-alert'
import { ExportConfiguration, ExportHistory } from '@/components/export-config'
import { ExportStats } from '@/components/export-sidebar'
import { useSidebar } from '@/components/sidebar-context'

export default function DataExport() {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header 
        title="Data Export Center" 
        subtitle="CSV & JSON Exports • Permission-Aware Downloads • Filter Selection • Export History • Last updated: June 7, 2025" 
        showExportMap={false} 
      />

      <main className={`pt-24 px-8 pb-8 flex-1 content-transition ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <ExportAlert />

        <div className="grid grid-cols-[1fr_300px] gap-6">
          <div>
            <ExportConfiguration />
            <ExportHistory />
          </div>
          <ExportStats />
        </div>
      </main>

      <Footer />
    </div>
  )
}
