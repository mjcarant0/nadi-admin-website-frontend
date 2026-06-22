// Typed client for the N.A.D.I. Admin Website Backend.
// Base URL comes from NEXT_PUBLIC_API_URL (see .env.example).

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? 'http://localhost:8100'

const API_PREFIX = '/api/v1'

const TOKEN_KEY = 'nadi_admin_token'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

type Query = Record<string, string | number | boolean | undefined | null>

function buildUrl(path: string, query?: Query): string {
  const url = new URL(`${API_BASE_URL}${API_PREFIX}${path}`)
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v))
    }
  }
  return url.toString()
}

async function request<T>(
  path: string,
  opts: { method?: string; query?: Query; body?: unknown; auth?: boolean } = {},
): Promise<T> {
  const { method = 'GET', query, body, auth = true } = opts
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  let res: Response
  try {
    res = await fetch(buildUrl(path, query), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(0, 'Cannot reach the API server. Is the backend running?')
  }

  if (res.status === 401) {
    clearToken()
    throw new ApiError(401, 'Session expired. Please sign in again.')
  }
  if (!res.ok) {
    let detail = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data?.detail) detail = typeof data.detail === 'string' ? data.detail : detail
    } catch {
      /* non-JSON error body */
    }
    throw new ApiError(res.status, detail)
  }

  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}

// ── Types (mirror app/schemas on the backend) ───────────────────────────

export interface LoginResponse {
  access_token: string
  token_type: string
  role: string
}

export interface RiskPoint {
  encounter_id: string
  psgc_code: string | null
  latitude: number | null
  longitude: number | null
  risk_level: string
  timestamp: string
}

export interface DashboardStats {
  total_active_pregnancies: number
  critical_triage_queue_count: number
  offline_syncs_pending: number
  regional_risk_points: RiskPoint[]
}

export interface HeatmapCell {
  psgc_code: string
  encounter_count: number
  flagged_count: number
  centroid: { type: string; coordinates: [number, number] } | null
}

export interface CoverageRow {
  psgc_code: string
  total_registered: number
  completed_4_visits: number
  coverage_rate_percent: number
}

export interface SyncLogRow {
  bhw_id: string
  bhw_name: string
  assigned_barangay_psgc: string | null
  last_encounter_date: string | null
  records_synced: number
  confirmed_synced: number
  pending_sync: number
}

export interface BhwCoverageRow {
  assigned_barangay_psgc: string | null
  last_submission: string | null
  total_records: number
  coverage_status: 'ACTIVE' | 'SILENT'
}

export interface AnonymisedRow {
  psgc_code: string
  month: string
  total_visits: number
  avg_sbp: number | null
  avg_dbp: number | null
  avg_spo2: number | null
  danger_flag_count: number
}

// ── Secondary analytics (derived endpoints) ───────────────────────────────

export interface AncCoverageTrendRow {
  month: string
  anc1: number
  anc4: number
}

export interface AncFunnelRow {
  stage: string
  value: number
}

export interface AncRegionalRow {
  psgc_code: string
  total_registered: number
  anc1_count: number
  anc4_count: number
  coverage_rate: number
}

export interface AncAnalytics {
  coverage_trend: AncCoverageTrendRow[]
  funnel: AncFunnelRow[]
  regional_coverage: AncRegionalRow[]
}

export interface DangerTimeSeriesRow {
  month: string
  [dangerType: string]: number | string
}

export interface DangerRegionalRow {
  psgc_code: string
  alert_type: string
  count: number
}

export interface DangerTypeRow {
  alert_type: string
  count: number
}

export interface DangerSignTrend {
  danger_types: string[]
  time_series: DangerTimeSeriesRow[]
  regional_distribution: DangerRegionalRow[]
  type_distribution: DangerTypeRow[]
}

export interface CohortRow {
  psgc_code: string
  total: number
  tri1: number
  tri2: number
  tri3: number
  danger: number
}

export interface CohortAnalytics {
  cohorts: CohortRow[]
}

export interface NodeHealthRow {
  node_id: string
  region: string | null
  psgc_code: string | null
  status: string
  last_heartbeat: string | null
  cpu_pct: number | null
  memory_pct: number | null
  uptime_pct: number | null
  queued_syncs: number | null
  app_version: string | null
}

export interface NodeHealth {
  kpis: {
    total: number
    online: number
    degraded: number
    offline: number
    avg_uptime: number
  }
  nodes: NodeHealthRow[]
}

// ── Endpoints ────────────────────────────────────────────────────────────

export const api = {
  login(mobile_number: string, password: string) {
    return request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: { mobile_number, password },
      auth: false,
    })
  },

  dashboard() {
    return request<DashboardStats>('/admin/dashboard')
  },

  heatmap(params?: {
    danger_sign?: string
    psgc_prefix?: string
    date_from?: string
    date_to?: string
  }) {
    return request<HeatmapCell[]>('/admin/heatmap', { query: params })
  },

  coverage(psgc_code?: string) {
    return request<{ coverage_by_barangay: CoverageRow[] }>('/admin/coverage', {
      query: { psgc_code },
    })
  },

  ancAnalytics(psgc_prefix?: string) {
    return request<AncAnalytics>('/admin/anc-analytics', { query: { psgc_prefix } })
  },

  dangerSignTrend(psgc_prefix?: string) {
    return request<DangerSignTrend>('/admin/danger-sign-trend', { query: { psgc_prefix } })
  },

  cohortAnalytics(psgc_prefix?: string) {
    return request<CohortAnalytics>('/admin/cohort-analytics', { query: { psgc_prefix } })
  },

  nodeHealth() {
    return request<NodeHealth>('/admin/node-health')
  },

  syncLog(limit = 100) {
    return request<SyncLogRow[]>('/admin/audit/sync-log', { query: { limit } })
  },

  bhwCoverage() {
    return request<BhwCoverageRow[]>('/admin/audit/bhw-coverage')
  },

  anonymised(params?: { date_from?: string; date_to?: string }) {
    return request<AnonymisedRow[]>('/admin/export/anonymised', { query: params })
  },

  // FHSIS export returns a CSV stream (or JSON) — fetch as a blob for download.
  async fhsisBlob(reporting_month: string, format: 'csv' | 'json' = 'csv'): Promise<Blob> {
    const headers: Record<string, string> = {}
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(
      buildUrl('/admin/export/fhsis', { reporting_month, format }),
      { headers },
    )
    if (!res.ok) throw new ApiError(res.status, `FHSIS export failed (${res.status})`)
    return res.blob()
  },
}
