// Adapters mapping the backend's derived analytics payloads into the display
// shapes the existing chart/table components already render. Keeping presentation
// (icons, colours, labels) here means the SQL endpoints stay clean domain data and
// the components are reused unchanged via their optional props.

import type {
  AncFunnelRow,
  CohortRow,
  DangerSignTrend,
  NodeHealth,
  NodeHealthRow,
} from './api'
import type { NodeKPICard, NodeRegionalStatus, NodeStatus } from './mock-data'
import type { CohortTableRow } from '@/components/cohort-content'
import type { DangerSeries } from '@/components/danger-sign-charts'

/** "2 min ago" / "6h 42m ago" from an ISO timestamp (or '—' when absent). */
export function relativeTime(iso: string | null): string {
  if (!iso) return '—'
  const secs = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 90) return `${Math.round(secs)}s ago`
  const mins = Math.floor(secs / 60)
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.floor(mins / 60)
  return `${hrs}h ${mins % 60}m ago`
}

function statusLabel(status: string): NodeStatus {
  if (status === 'online') return 'Online'
  if (status === 'degraded') return 'Degraded'
  return 'Offline'
}

function readinessFor(status: string): { readiness: string; readinessColor: string } {
  if (status === 'online') return { readiness: 'Operational', readinessColor: 'text-green-600' }
  if (status === 'degraded') return { readiness: 'Partial', readinessColor: 'text-yellow-600' }
  return { readiness: 'Critical', readinessColor: 'text-red-600' }
}

/** API node rows → the regional status table shape. */
export function toNodeRegionalStatus(nodes: NodeHealthRow[]): NodeRegionalStatus[] {
  return nodes.map((n) => ({
    id: n.node_id,
    region: n.region ?? n.node_id,
    nodeCount: n.node_id,
    status: statusLabel(n.status),
    uptime: n.uptime_pct != null ? `${n.uptime_pct}%` : '—',
    lastSync: relativeTime(n.last_heartbeat),
    cpu: n.cpu_pct != null && n.status !== 'offline' ? `${Math.round(n.cpu_pct)}%` : '—',
    ...readinessFor(n.status),
  }))
}

/** ANC funnel rows (stage + patient count) → the funnel chart shape. */
export function toAncFunnel(funnel: AncFunnelRow[]): { stage: string; value: number }[] {
  return funnel.map((f) => ({ stage: f.stage, value: f.value }))
}

/** Cohort rows → the cohort cross-tab table shape (risk/preterm not yet derived). */
export function toCohortTableRows(cohorts: CohortRow[]): CohortTableRow[] {
  return cohorts.map((c) => ({
    region: c.psgc_code,
    tri1: c.tri1,
    tri2: c.tri2,
    tri3: c.tri3,
    danger: c.danger,
    risk: 0,
    preterm: 0,
    total: c.total,
  }))
}

// Display metadata for the real WHO danger-sign types (matches the enum the
// backend reports). Pivoted time-series rows already carry one numeric column
// per type, so these keys line up directly.
const DANGER_SERIES_META: Record<string, { name: string; color: string }> = {
  SEVERE_PREECLAMPSIA: { name: 'Severe pre-eclampsia', color: '#ef4444' },
  HYPERTENSION: { name: 'Hypertension', color: '#f59e0b' },
  HYPOXIA: { name: 'Hypoxia', color: '#3b82f6' },
  ABNORMAL_FHR: { name: 'Abnormal FHR', color: '#8b5cf6' },
  INFECTION_SEPSIS: { name: 'Infection / sepsis', color: '#10b981' },
}

/** Build the chart's series descriptors from the backend's danger_types list. */
export function toDangerSeries(dangerTypes: string[]): DangerSeries[] {
  return dangerTypes.map((t) => ({
    key: t,
    name: DANGER_SERIES_META[t]?.name ?? t,
    color: DANGER_SERIES_META[t]?.color ?? '#9ca3af',
  }))
}

/** Time-series rows use `month`; the chart's x-axis key is configurable. */
export function dangerTimeSeriesData(
  trend: DangerSignTrend,
): Array<Record<string, number | string>> {
  return trend.time_series
}

/** API rollup KPIs → the 6 node KPI cards. */
export function toNodeKPICards(kpis: NodeHealth['kpis']): NodeKPICard[] {
  return [
    { id: 'total-nodes', iconName: 'Server', status: 'Total', statusColor: 'text-blue-600',
      value: String(kpis.total), label: 'Total Nodes', borderColor: 'border-b-blue-600' },
    { id: 'online-nodes', iconName: 'CheckCircle2', status: 'Healthy', statusColor: 'text-green-600',
      value: String(kpis.online), label: 'Online Nodes', borderColor: 'border-b-4 border-b-green-600' },
    { id: 'degraded-nodes', iconName: 'AlertTriangle', status: 'Warning', statusColor: 'text-yellow-600',
      value: String(kpis.degraded), label: 'Degraded Nodes', subtext: 'High load / partial',
      subtextColor: 'text-yellow-600', borderColor: 'border-b-yellow-600' },
    { id: 'offline-nodes', iconName: 'XCircle', status: 'Critical', statusColor: 'text-red-600',
      value: String(kpis.offline), label: 'Offline Nodes', subtextColor: 'text-red-600',
      borderColor: 'border-b-red-600' },
    { id: 'network-uptime', iconName: 'Clock', status: 'Good', statusColor: 'text-green-600',
      value: `${kpis.avg_uptime}%`, label: 'Avg Network Uptime', borderColor: 'border-b-green-600' },
    { id: 'op-readiness', iconName: 'Shield', status: 'Review', statusColor: 'text-yellow-600',
      value: kpis.total ? `${Math.round((kpis.online / kpis.total) * 100)}%` : '0%',
      label: 'Operational Readiness', borderColor: 'border-b-yellow-600' },
  ]
}
