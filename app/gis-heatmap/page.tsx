'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { MapControls } from '@/components/gis-map-controls'
import { GISKPICards } from '@/components/gis-kpi-cards'
import { GISMapArea } from '@/components/gis-map-area'
import { RegionalRiskIndex } from '@/components/regional-risk-index'
import { HotspotClustersCard, GeographicComparisonCard, RiskTrendCard } from '@/components/gis-analytics'
import { Footer } from '@/components/footer'
import { useSidebar } from '@/components/sidebar-context'

export default function GISHeatmapPage() {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Sidebar />
      <Header title="GIS Maternal Risk Heatmap" subtitle="Geographic Risk Intelligence — As of June 7, 2025, 06:45 PHT" showExportMap={true} />

      {/* Main Content */}
      <main className={`pt-24 px-8 pb-8 flex-1 content-transition ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Map Controls Toolbar */}
        <MapControls />

        {/* KPI Cards */}
        <GISKPICards />

        {/* Map and Risk Index Grid */}
        <div className="grid grid-cols-[70%_30%] gap-6 mb-6">
          <GISMapArea />
          <RegionalRiskIndex />
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <HotspotClustersCard />
          <GeographicComparisonCard />
          <RiskTrendCard />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
