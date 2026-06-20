/**
 * ============================================================
 * NADI Dashboard — Centralized Mock Data & TypeScript Interfaces
 * ============================================================
 *
 * PURPOSE:
 *   This file simulates backend API responses for the entire
 *   dashboard. All components import from here so that replacing
 *   mock data with real fetch() calls (REST / Supabase / GraphQL)
 *   requires changes in ONE place only.
 *
 * HOW TO SWAP TO REAL DATA:
 *   Replace the exported constants below with async fetch functions,
 *   e.g.:
 *     export async function getExecutiveDashboardKPIs(): Promise<ExecutiveDashboardKPI[]> {
 *       const { data } = await supabase.from('executive_kpis').select('*')
 *       return data
 *     }
 *
 *   Then update components to use React Query / SWR / useEffect.
 * ============================================================
 */

// ─────────────────────────────────────────────
// SECTION 1: SHARED / COMMON TYPES
// ─────────────────────────────────────────────

export type RiskLevel = 'critical' | 'high' | 'moderate' | 'low'
export type NodeStatus = 'Online' | 'Degraded' | 'Offline'
export type FacilityStatus = 'Submitted' | 'Partial' | 'Critical'
export type UptimeStatus = 'online' | 'degraded' | 'offline'
export type AlertSeverity = 'critical' | 'warning' | 'info'

// ─────────────────────────────────────────────
// SECTION 2: EXECUTIVE DASHBOARD
// ─────────────────────────────────────────────

export interface ExecutiveDashboardKPI {
  id: string
  title: string
  value: string
  trend: string | null
  trendPositive: boolean | null
  subtitle: string
  subtext?: string
  progress?: number // 0–100 for progress bar
  animationDelay: string
}

export interface ExecutivePriorityAlert {
  id: string
  severity: AlertSeverity
  title: string
  description: string
  animationDelay: string
}

export interface ANCTrendDataPoint {
  month: string
  anc1: number
  anc4: number
}

export interface PerformanceMetric {
  name: string
  value: number   // percentage
  color: string
}

export interface PerformancePieSlice {
  name: string
  value: number
  color: string
}

export interface DangerSignCategory {
  name: string
  value: number
  color: string
}

export interface RegionalRanking {
  name: string
  coverage: number // percentage
  category: 'top' | 'needs_attention'
}

export interface SystemStatusItem {
  id: string
  label: string
  status: 'Operational' | 'Pending' | 'Offline'
  statusColor: 'green' | 'yellow' | 'red'
  detail?: string
}

// ── Data ──

export const executiveDashboardKPIs: ExecutiveDashboardKPI[] = [
  {
    id: 'anc-coverage',
    title: 'National ANC Coverage',
    value: '87.4%',
    trend: '+3.2%',
    trendPositive: true,
    subtitle: 'Target: 95%',
    progress: 87.4,
    animationDelay: '0s',
  },
  {
    id: 'maternal-mortality',
    title: 'Maternal Mortality Ratio',
    value: '114',
    trend: '-5.3%',
    trendPositive: true,
    subtitle: 'per 100,000 live births - Q2 2025',
    subtext: 'Improved vs. Q4 2024 (120)',
    animationDelay: '0.05s',
  },
  {
    id: 'reporting-facilities',
    title: 'Reporting Facilities',
    value: '2,763',
    trend: null,
    trendPositive: null,
    subtitle: 'of 2,841 total',
    subtext: '78 facilities not synced',
    animationDelay: '0.1s',
  },
  {
    id: 'active-bhws',
    title: 'Active BHWs Reporting',
    value: '48,291',
    trend: null,
    trendPositive: null,
    subtitle: 'across 17 regions nationwide',
    subtext: '94.3% submission rate',
    animationDelay: '0.15s',
  },
]

export const executivePriorityAlerts: ExecutivePriorityAlert[] = [
  {
    id: 'barmm-anc',
    severity: 'critical',
    title: 'BARMM ANC Coverage Critical',
    description:
      'Coverage dropped to 52.1% — 19.3% below national target. Immediate intervention required.',
    animationDelay: '0s',
  },
  {
    id: 'eastern-visayas-danger',
    severity: 'warning',
    title: 'Eastern Visayas Danger Sign Spike',
    description:
      'Severe headache reports up 34% in the last 14 days. Review BHW field reports.',
    animationDelay: '0.05s',
  },
  {
    id: 'fhsis-deadline',
    severity: 'info',
    title: 'FHSIS Q2 Submission Deadline',
    description:
      '3 regions pending Q2 submission. Deadline: June 15, 2025. Reminder sent.',
    animationDelay: '0.1s',
  },
]

export const executiveANCTrend: ANCTrendDataPoint[] = [
  { month: 'Jan', anc1: 82, anc4: 70 },
  { month: 'Feb', anc1: 83, anc4: 71 },
  { month: 'Mar', anc1: 84, anc4: 72 },
  { month: 'Apr', anc1: 85, anc4: 72.5 },
  { month: 'May', anc1: 86.2, anc4: 73.2 },
  { month: 'Jun', anc1: 87.4, anc4: 74.2 },
]

export const executiveDangerSigns: DangerSignCategory[] = [
  { name: 'Severe Headache', value: 847, color: '#dc2626' },
  { name: 'Blurred Vision', value: 621, color: '#f97316' },
  { name: 'Vaginal Bleeding', value: 534, color: '#eab308' },
  { name: 'Swelling', value: 421, color: '#3b82f6' },
  { name: 'Other', value: 312, color: '#6b7280' },
]

export const executivePerformanceMetrics: PerformanceMetric[] = [
  { name: 'ANC Coverage', value: 87.4, color: '#3b82f6' },
  { name: 'Skilled Birth', value: 93.2, color: '#000000' },
  { name: 'Postnatal Care', value: 68.5, color: '#f59e0b' },
]

export const executivePerformancePie: PerformancePieSlice[] = [
  { name: 'ANC Coverage', value: 87, color: '#3b82f6' },
  { name: 'Skilled Birth', value: 9, color: '#f59e0b' },
  { name: 'Postnatal Care', value: 4, color: '#9ca3af' },
]

export const executiveRegionalRankings: RegionalRanking[] = [
  { name: 'NCR', coverage: 96.8, category: 'top' },
  { name: 'Central Luzon', coverage: 94.2, category: 'top' },
  { name: 'BARMM', coverage: 52.1, category: 'needs_attention' },
  { name: 'Caraga', coverage: 58.9, category: 'needs_attention' },
]

export const executiveSystemStatus: SystemStatusItem[] = [
  { id: 'sync-engine', label: 'Sync Engine', status: 'Operational', statusColor: 'green' },
  {
    id: 'node-network',
    label: 'Node Network',
    status: 'Operational',
    statusColor: 'green',
    detail: '2,763 / 2,841',
  },
  { id: 'fhsis', label: 'FHSIS Reporting', status: 'Pending', statusColor: 'yellow' },
]

// ─────────────────────────────────────────────
// SECTION 3: ANC ANALYTICS
// ─────────────────────────────────────────────

export interface ANCKPICard {
  id: string
  iconName: string // Lucide icon name — component resolves it
  trend: number    // positive = improvement
  trendColor: string
  value: string
  label: string
  progressColor: string
  progressPercent: number
}

export interface ANCCoverageTrendPoint {
  month: string
  anc1: number
  anc4: number
  target: number
  py2024: number
}

export interface ANCFunnelStage {
  stage: string
  value: number // percentage relative to ANC1 = 100
}

export interface ANCCohortDataPoint {
  quarter: string
  anc1Rate: number
  anc4Rate: number
}

export interface ANCRegionalCoverage {
  name: string
  coverage: number
  coverageColor: string
  anc4: number
  category: 'improvement' | 'urgent'
}

export interface ANCBenchmark {
  name: string
  value: number
  color: string
}

// ── Data ──

export const ancKPIs: ANCKPICard[] = [
  {
    id: 'national-anc-coverage',
    iconName: 'Heart',
    trend: 2.1,
    trendColor: 'text-green-600',
    value: '87.4%',
    label: 'National ANC Coverage',
    progressColor: 'bg-blue-500',
    progressPercent: 87,
  },
  {
    id: 'anc4-completion',
    iconName: 'Calendar',
    trend: 1.4,
    trendColor: 'text-green-600',
    value: '74.2%',
    label: 'ANC4+ Completion Rate',
    progressColor: 'bg-yellow-500',
    progressPercent: 74,
  },
  {
    id: 'first-trimester',
    iconName: 'Users',
    trend: 3.7,
    trendColor: 'text-green-600',
    value: '61.8%',
    label: '1st Trimester Enrollment',
    progressColor: 'bg-green-500',
    progressPercent: 62,
  },
  {
    id: 'dropout-rate',
    iconName: 'UserMinus',
    trend: -0.8,
    trendColor: 'text-red-600',
    value: '12.6%',
    label: 'Dropout Rate (ANC1→ANC4)',
    progressColor: 'bg-red-500',
    progressPercent: 13,
  },
  {
    id: 'who-target',
    iconName: 'Target',
    trend: -7.6,
    trendColor: 'text-red-600',
    value: '95.0%',
    label: 'WHO Benchmark Target',
    progressColor: 'bg-slate-400',
    progressPercent: 95,
  },
]

export const ancCoverageTrend: ANCCoverageTrendPoint[] = [
  { month: 'Jan', anc1: 88, anc4: 71, target: 95, py2024: 87 },
  { month: 'Feb', anc1: 88.5, anc4: 71.5, target: 95, py2024: 87.2 },
  { month: 'Mar', anc1: 89, anc4: 72, target: 95, py2024: 87.5 },
  { month: 'Apr', anc1: 89.3, anc4: 72.5, target: 95, py2024: 88 },
  { month: 'May', anc1: 89.5, anc4: 73, target: 95, py2024: 88.2 },
  { month: 'Jun', anc1: 89.8, anc4: 73.5, target: 95, py2024: 88.5 },
  { month: 'Jul', anc1: 90, anc4: 74, target: 95, py2024: 88.8 },
  { month: 'Aug', anc1: 90.2, anc4: 74.2, target: 95, py2024: 89 },
  { month: 'Sep', anc1: 90.3, anc4: 74.5, target: 95, py2024: 89.2 },
  { month: 'Oct', anc1: 90.5, anc4: 74.8, target: 95, py2024: 89.5 },
  { month: 'Nov', anc1: 90.7, anc4: 75, target: 95, py2024: 89.7 },
  { month: 'Dec', anc1: 90.9, anc4: 75.2, target: 95, py2024: 90 },
]

export const ancVisitFunnel: ANCFunnelStage[] = [
  { stage: 'ANC1', value: 100 },
  { stage: 'ANC2', value: 94.2 },
  { stage: 'ANC3', value: 88.7 },
  { stage: 'ANC4', value: 84.5 },
  { stage: 'ANC5', value: 76.8 },
  { stage: 'ANC6', value: 67.3 },
  { stage: 'ANC7', value: 54.2 },
  { stage: 'ANC8', value: 41.8 },
]

export const ancCohortPerformance: ANCCohortDataPoint[] = [
  { quarter: 'Q1 2025', anc1Rate: 91, anc4Rate: 67 },
  { quarter: 'Q2 2025', anc1Rate: 88, anc4Rate: 72 },
  { quarter: 'Q3 2025', anc1Rate: 87, anc4Rate: 71 },
  { quarter: 'Q4 2025', anc1Rate: 85, anc4Rate: 69 },
]

export const ancRegionalCoverage: ANCRegionalCoverage[] = [
  { name: 'MIMAROPA', coverage: 72.8, coverageColor: 'text-yellow-600', anc4: 61.2, category: 'improvement' },
  { name: 'Bicol Region', coverage: 74.1, coverageColor: 'text-yellow-600', anc4: 62.8, category: 'improvement' },
  { name: 'Eastern Visayas', coverage: 63.4, coverageColor: 'text-red-600', anc4: 48.1, category: 'urgent' },
  { name: 'Zamboanga Peninsula', coverage: 64.8, coverageColor: 'text-red-600', anc4: 49.3, category: 'urgent' },
  { name: 'Caraga', coverage: 58.9, coverageColor: 'text-red-600', anc4: 43.7, category: 'urgent' },
  { name: 'BARMM', coverage: 52.1, coverageColor: 'text-red-600', anc4: 36.4, category: 'urgent' },
]

export const ancBenchmarks: ANCBenchmark[] = [
  { name: 'Philippines (Current)', value: 87.4, color: '#3b82f6' },
  { name: 'WHO Target (95%)', value: 95.0, color: '#94a3b8' },
  { name: 'SE Asia Average', value: 84.1, color: '#eab308' },
  { name: 'Philippines (2024)', value: 85.3, color: '#94a3b8' },
]

// ─────────────────────────────────────────────
// SECTION 4: BHW COVERAGE
// ─────────────────────────────────────────────

export interface BHWKPIItem {
  id: string
  iconName: string
  label: string
  value: string
  subtitle: string
  description?: string
  color: string
  bgColor: string
  borderColor: string
}

export interface BHWRegionalRow {
  id: string
  region: string
  barangays: string
  active: number
  inactive: number
  gida: string
  ratio: string
  coverage: number // percentage
}

export interface BHWTrendPoint {
  month: string
  active: number
  inactive: number
}

export interface BHWCoverageCategory {
  name: string
  value: number
  color: string
}

export interface BHWCoverageGap {
  id: string
  severity: 'critical' | 'warning'
  title: string
  detail: string
}

// ── Data ──

export const bhwKPIs: BHWKPIItem[] = [
  {
    id: 'total-bhws',
    iconName: 'Users',
    label: 'Total',
    value: '42,816',
    subtitle: 'Total BHWs',
    description: 'Nationwide workforce',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-slate-200',
  },
  {
    id: 'active-bhws',
    iconName: 'UserCheck',
    label: 'Active',
    value: '38,941',
    subtitle: 'Active BHWs',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-slate-200',
  },
  {
    id: 'inactive-bhws',
    iconName: 'UserX',
    label: 'Inactive',
    value: '3,875',
    subtitle: 'Inactive BHWs',
    description: '9.1% of workforce',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-slate-200',
  },
  {
    id: 'active-barangays',
    iconName: 'MapPin',
    label: 'Covered',
    value: '41,082',
    subtitle: 'Active Barangays',
    description: 'of 42,046 total',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-slate-200',
  },
  {
    id: 'gida-gaps',
    iconName: 'Mountain',
    label: 'GIDA',
    value: '964',
    subtitle: 'GIDA Gaps',
    description: 'Uncovered barangays',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-slate-200',
  },
  {
    id: 'bhw-ratio',
    iconName: 'Scale',
    label: 'Review',
    value: '1:19',
    subtitle: 'Avg BHW:Household',
    description: 'DOH standard: 1:20',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-slate-200',
  },
]

export const bhwRegionalData: BHWRegionalRow[] = [
  { id: 'ncr', region: 'NCR', barangays: '1,708', active: 6824, inactive: 0, gida: 'None', ratio: '1:17', coverage: 100 },
  { id: 'central-luzon', region: 'Central Luzon', barangays: '3,102', active: 5814, inactive: 0, gida: 'None', ratio: '1:19', coverage: 100 },
  { id: 'calabarzon', region: 'CALABARZON', barangays: '4,010', active: 6219, inactive: 0, gida: '3 areas', ratio: '1:20', coverage: 99.4 },
  { id: 'eastern-visayas', region: 'Eastern Visayas', barangays: '4,390', active: 2891, inactive: 500, gida: '47 areas', ratio: '1:23', coverage: 82.3 },
  { id: 'davao', region: 'Davao Region', barangays: '1,162', active: 4102, inactive: 0, gida: '12 areas', ratio: '1:18', coverage: 97.8 },
  { id: 'barmm', region: 'BARMM', barangays: '2,241', active: 1204, inactive: 312, gida: '312 areas', ratio: '1:28', coverage: 53.7 },
]

export const bhwMonthlyTrend: BHWTrendPoint[] = [
  { month: 'Jan', active: 37500, inactive: 2800 },
  { month: 'Feb', active: 37800, inactive: 2700 },
  { month: 'Mar', active: 38200, inactive: 2500 },
  { month: 'Apr', active: 38500, inactive: 2300 },
  { month: 'May', active: 38800, inactive: 2100 },
  { month: 'Jun', active: 38941, inactive: 1875 },
]

export const bhwCoverageCategories: BHWCoverageCategory[] = [
  { name: 'Fully Covered', value: 33218, color: '#10b981' },
  { name: 'Partial', value: 7864, color: '#f59e0b' },
  { name: 'Zero Coverage', value: 964, color: '#ef4444' },
  { name: 'GIDA', value: 5842, color: '#9ca3af' },
]

export const bhwCoverageGaps: BHWCoverageGap[] = [
  { id: 'zero-bhw-gida', severity: 'critical', title: 'Zero BHW — 14 GIDA Barangays', detail: 'BARMM (8) • MIMAROPA (5)' },
  { id: 'over-ratio-barmm', severity: 'critical', title: 'Over-Ratio Alert — BARMM', detail: 'Avg ratio 1:28' },
  { id: 'high-inactivity-visayas', severity: 'warning', title: 'High Inactivity — Eastern Visayas', detail: '18% inactive rate' },
]

// ─────────────────────────────────────────────
// SECTION 5: DANGER SIGN TREND
// ─────────────────────────────────────────────

export interface DangerSignKPI {
  id: string
  iconName: string
  label: string
  value: string
  change: string
  changeColor: string
  borderColor: string
  bgColor: string
}

export interface DangerSignTimeSeriesPoint {
  date: string
  preeclampsia: number
  hemorrhage: number
  other: number
}

export interface DangerSignRegionalDistribution {
  name: string
  preeclampsia: number
  hemorrhage: number
}

export interface DangerSignTypeDistribution {
  name: string
  value: number
  percentage: number
  color: string
}

// ── Data ──

export const dangerSignKPIs: DangerSignKPI[] = [
  {
    id: 'total-cases',
    iconName: 'AlertCircle',
    label: 'Total Danger Sign Cases',
    value: '4,821',
    change: '+11.2%',
    changeColor: 'text-red-600',
    borderColor: 'border-red-300',
    bgColor: 'bg-red-50',
  },
  {
    id: 'preeclampsia',
    iconName: 'Heart',
    label: 'Preeclampsia Cases',
    value: '1,634',
    change: '+18.4%',
    changeColor: 'text-red-600',
    borderColor: 'border-red-300',
    bgColor: 'bg-red-50',
  },
  {
    id: 'hemorrhage',
    iconName: 'Droplet',
    label: 'Hemorrhage Cases',
    value: '1,142',
    change: '+9.1%',
    changeColor: 'text-red-600',
    borderColor: 'border-yellow-300',
    bgColor: 'bg-yellow-50',
  },
  {
    id: 'escalation-rate',
    iconName: 'TrendingUp',
    label: 'Escalation Rate',
    value: '34.7%',
    change: '+2.3pts',
    changeColor: 'text-red-600',
    borderColor: 'border-blue-300',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'other-signs',
    iconName: 'Briefcase',
    label: 'Other Danger Signs',
    value: '2,045',
    change: '+4.8%',
    changeColor: 'text-yellow-600',
    borderColor: 'border-slate-300',
    bgColor: 'bg-slate-50',
  },
]

export const dangerSignTimeSeries: DangerSignTimeSeriesPoint[] = [
  { date: 'Jun 24', preeclampsia: 87, hemorrhage: 65, other: 45 },
  { date: 'Jul 24', preeclampsia: 95, hemorrhage: 72, other: 52 },
  { date: 'Aug 24', preeclampsia: 103, hemorrhage: 78, other: 58 },
  { date: 'Sep 24', preeclampsia: 118, hemorrhage: 85, other: 63 },
  { date: 'Oct 24', preeclampsia: 125, hemorrhage: 92, other: 70 },
  { date: 'Nov 24', preeclampsia: 132, hemorrhage: 98, other: 76 },
  { date: 'Dec 24', preeclampsia: 138, hemorrhage: 104, other: 82 },
  { date: 'Jan 25', preeclampsia: 145, hemorrhage: 110, other: 88 },
  { date: 'Feb 25', preeclampsia: 156, hemorrhage: 115, other: 94 },
  { date: 'Mar 25', preeclampsia: 168, hemorrhage: 120, other: 100 },
  { date: 'Apr 25', preeclampsia: 178, hemorrhage: 125, other: 105 },
  { date: 'May 25', preeclampsia: 192, hemorrhage: 130, other: 110 },
]

export const dangerSignRegionalDistribution: DangerSignRegionalDistribution[] = [
  { name: 'BARMM', preeclampsia: 85, hemorrhage: 42 },
  { name: 'Caraga', preeclampsia: 68, hemorrhage: 38 },
  { name: 'E. Visayas', preeclampsia: 55, hemorrhage: 28 },
  { name: 'MIMAROPA', preeclampsia: 42, hemorrhage: 22 },
  { name: 'Bicol', preeclampsia: 38, hemorrhage: 18 },
  { name: 'Davao', preeclampsia: 35, hemorrhage: 15 },
]

export const dangerSignTypeDistribution: DangerSignTypeDistribution[] = [
  { name: 'Preeclampsia/Eclampsia', value: 1634, percentage: 33.9, color: '#ef4444' },
  { name: 'Antepartum/PPH', value: 1142, percentage: 23.7, color: '#f59e0b' },
  { name: 'Severe Headache/Visual', value: 819, percentage: 17.0, color: '#3b82f6' },
  { name: 'Infection/Sepsis Signs', value: 614, percentage: 12.7, color: '#d1d5db' },
  { name: 'Other', value: 612, percentage: 12.7, color: '#6b7280' },
]

// ─────────────────────────────────────────────
// SECTION 6: FHSIS REPORTING
// ─────────────────────────────────────────────

export interface FHSISKPIData {
  submissionRate: number
  submissionRateTrend: string
  reportsSubmitted: number
  totalFacilities: number
  awaitingSubmission: number
  validationErrors: number
  criticalErrors: number
  warnings: number
  complianceScore: number
  deadlineDaysLeft: number
}

export interface FHSISSubmissionDataPoint {
  date: string
  submitted: number
  target: number
  errors: number
}

export interface FHSISModuleCompleteness {
  module: string
  completion: number
}

export interface FHSISSubmissionTrendPoint {
  month: string
  rate: number
  target: number
}

export interface FHSISFacilityRow {
  id: string
  region: string
  facilities: string
  status: FacilityStatus
  completeness: number
  submitted: string
  errors: number
  deadline: string
}

// ── Data ──

export const fhsisKPIData: FHSISKPIData = {
  submissionRate: 78.4,
  submissionRateTrend: '+6.2%',
  reportsSubmitted: 1247,
  totalFacilities: 1590,
  awaitingSubmission: 343,
  validationErrors: 89,
  criticalErrors: 12,
  warnings: 77,
  complianceScore: 91.3,
  deadlineDaysLeft: 8,
}

export const fhsisSubmissionProgress: FHSISSubmissionDataPoint[] = [
  { date: 'Jun 1', submitted: 850, target: 900, errors: 12 },
  { date: 'Jun 2', submitted: 920, target: 920, errors: 18 },
  { date: 'Jun 3', submitted: 980, target: 940, errors: 14 },
  { date: 'Jun 4', submitted: 1050, target: 960, errors: 22 },
  { date: 'Jun 5', submitted: 1120, target: 980, errors: 28 },
  { date: 'Jun 6', submitted: 1180, target: 1000, errors: 35 },
  { date: 'Jun 7', submitted: 1247, target: 1020, errors: 45 },
]

export const fhsisModuleCompleteness: FHSISModuleCompleteness[] = [
  { module: 'M6: Disease Surveillance', completion: 85.6 },
  { module: 'M5: Immunization', completion: 84.2 },
  { module: 'M4: Nutrition', completion: 79.3 },
  { module: 'M3: Family Planning', completion: 84.7 },
  { module: 'M2: Child Health', completion: 88.1 },
  { module: 'M1: Maternal Care', completion: 92.43 },
]

export const fhsisSubmissionTrend: FHSISSubmissionTrendPoint[] = [
  { month: 'Dec 24', rate: 88.2, target: 90 },
  { month: 'Jan 25', rate: 89.1, target: 90 },
  { month: 'Feb 25', rate: 87.5, target: 90 },
  { month: 'Mar 25', rate: 89.8, target: 90 },
  { month: 'Apr 25', rate: 90.2, target: 90 },
  { month: 'May 25', rate: 91.3, target: 90 },
]

export const fhsisFacilityRows: FHSISFacilityRow[] = [
  { id: 'ncr', region: 'NCR', facilities: '214 of 218', status: 'Submitted', completeness: 98.2, submitted: 'Jun 2, 2025', errors: 0, deadline: 'Met' },
  { id: 'central-luzon', region: 'Central Luzon', facilities: '187 of 192', status: 'Submitted', completeness: 97.4, submitted: 'Jun 4, 2025', errors: 2, deadline: 'Met' },
  { id: 'calabarzon', region: 'CALABARZON', facilities: '142 of 176', status: 'Partial', completeness: 80.7, submitted: 'In Progress', errors: 7, deadline: '2 days' },
  { id: 'barmm', region: 'BARMM', facilities: '78 of 134', status: 'Critical', completeness: 58.2, submitted: 'Not Started', errors: 21, deadline: 'At Risk' },
  { id: 'caraga', region: 'Caraga', facilities: '61 of 95', status: 'Critical', completeness: 62.2, submitted: 'In Progress', errors: 18, deadline: 'At Risk' },
  { id: 'eastern-visayas', region: 'Eastern Visayas', facilities: '100 of 141', status: 'Partial', completeness: 77.3, submitted: 'In Progress', errors: 11, deadline: '5 days' },
]

// ─────────────────────────────────────────────
// SECTION 7: GIS / HEATMAP
// ─────────────────────────────────────────────

export interface GISKPICard {
  id: string
  iconName: string
  iconColor: string
  iconBg: string
  value: string
  label: string
}

export interface GISHotspotCluster {
  id: string
  name: string
  count: number
  type: 'critical' | 'high'
}

export interface GISGeographicDataPoint {
  name: string
  value: number
}

export interface GISRiskTrendPoint {
  month: string
  barmm: number
  caraga: number
  visayas: number
}

export interface GISRiskAlert {
  id: string
  severity: 'urgent' | 'watch'
  region: string
  message: string
  label: string
}

export interface RegionalRiskEntry {
  name: string
  percentage: number
  hotspots?: number
  dangerSigns?: number
  color: string
  riskLevel: RiskLevel
}

// ── Data ──

export const gisKPICards: GISKPICard[] = [
  { id: 'critical-regions', iconName: 'Flame', iconColor: 'text-red-500', iconBg: 'bg-red-50', value: '5', label: 'Critical Regions' },
  { id: 'active-hotspots', iconName: 'AlertTriangle', iconColor: 'text-yellow-500', iconBg: 'bg-yellow-50', value: '23', label: 'Active Hotspots' },
  { id: 'high-risk-municipalities', iconName: 'Target', iconColor: 'text-blue-500', iconBg: 'bg-blue-50', value: '148', label: 'High-Risk Municipalities' },
  { id: 'low-risk-regions', iconName: 'Shield', iconColor: 'text-green-500', iconBg: 'bg-green-50', value: '9', label: 'Low-Risk Regions' },
]

export const gisHotspotClusters: GISHotspotCluster[] = [
  { id: 'lanao-del-sur', name: 'Lanao del Sur', count: 847, type: 'critical' },
  { id: 'surigao-norte', name: 'Surigao del Norte', count: 621, type: 'critical' },
  { id: 'samar', name: 'Samar Island', count: 534, type: 'high' },
  { id: 'zamboanga-norte', name: 'Zamboanga del Norte', count: 489, type: 'high' },
  { id: 'cotabato', name: 'Cotabato Cluster', count: 278, type: 'high' },
]

export const gisGeographicComparison: GISGeographicDataPoint[] = [
  { name: 'Luzon', value: 89.2 },
  { name: 'Visayas', value: 80.1 },
  { name: 'Mindanao', value: 68.4 },
]

export const gisRiskTrend: GISRiskTrendPoint[] = [
  { month: 'Apr', barmm: 62, caraga: 62, visayas: 67 },
  { month: 'May', barmm: 57, caraga: 61, visayas: 65 },
  { month: 'Jun', barmm: 52, caraga: 60, visayas: 63 },
]

export const gisRiskAlerts: GISRiskAlert[] = [
  {
    id: 'barmm-flag',
    severity: 'urgent',
    region: 'BARMM',
    message: 'ANC declining 3 consecutive months',
    label: 'Urgent',
  },
  {
    id: 'evisayas-watch',
    severity: 'watch',
    region: 'Eastern Visayas',
    message: 'Danger signs +34% this month',
    label: 'Watch',
  },
]

export const regionalRiskIndex: RegionalRiskEntry[] = [
  { name: 'BARMM', percentage: 52.1, hotspots: 6, dangerSigns: 847, color: 'bg-red-500', riskLevel: 'critical' },
  { name: 'Caraga', percentage: 58.9, hotspots: 4, dangerSigns: 621, color: 'bg-red-500', riskLevel: 'critical' },
  { name: 'Eastern Visayas', percentage: 63.4, hotspots: 3, dangerSigns: 534, color: 'bg-red-500', riskLevel: 'critical' },
  { name: 'Zamboanga Peninsula', percentage: 64.8, hotspots: 5, dangerSigns: 489, color: 'bg-red-500', riskLevel: 'critical' },
  { name: 'Davao Occidental', percentage: 67.2, hotspots: 2, dangerSigns: 312, color: 'bg-red-500', riskLevel: 'critical' },
  { name: 'SOCCSKSARGEN', percentage: 70.3, color: 'bg-orange-500', riskLevel: 'high' },
  { name: 'MIMAROPA', percentage: 72.8, color: 'bg-orange-500', riskLevel: 'high' },
  { name: 'Bicol Region', percentage: 74.1, color: 'bg-orange-500', riskLevel: 'high' },
  { name: 'Cagayan Valley', percentage: 76.5, color: 'bg-blue-500', riskLevel: 'moderate' },
  { name: 'Western Visayas', percentage: 91.7, color: 'bg-green-500', riskLevel: 'moderate' },
  { name: 'NCR', percentage: 96.8, color: 'bg-green-500', riskLevel: 'low' },
  { name: 'Central Luzon', percentage: 94.2, color: 'bg-green-500', riskLevel: 'low' },
]

// ─────────────────────────────────────────────
// SECTION 8: NODE HEALTH
// ─────────────────────────────────────────────

export interface NodeKPICard {
  id: string
  iconName: string
  status: string
  statusColor: string
  value: string
  label: string
  subtext?: string
  subtextColor?: string
  borderColor: string
}

export interface NodeRegionalStatus {
  id: string
  region: string
  nodeCount: string
  status: NodeStatus
  uptime: string
  lastSync: string
  cpu: string
  readiness: string
  readinessColor: string
}

export interface NetworkUptimePoint {
  day: string
  ncr: number
  national: number
  caraga: number
  barmm: number
}

export interface ResourceUtilizationPoint {
  region: string
  cpu: number
  memory: number
}

export interface UptimeHistoryEntry {
  id: string
  name: string
  uptime: UptimeStatus[]
  rate: string
}

// ── Data ──

export const nodeKPICards: NodeKPICard[] = [
  { id: 'total-nodes', iconName: 'Server', status: 'Total', statusColor: 'text-blue-600', value: '1,247', label: 'Total Nodes', subtext: 'Across 16 regions', borderColor: 'border-b-blue-600' },
  { id: 'online-nodes', iconName: 'CheckCircle2', status: 'Healthy', statusColor: 'text-green-600', value: '1,186', label: 'Online Nodes', borderColor: 'border-b-4 border-b-green-600' },
  { id: 'degraded-nodes', iconName: 'AlertTriangle', status: 'Warning', statusColor: 'text-yellow-600', value: '53', label: 'Degraded Nodes', subtext: 'High load / partial', subtextColor: 'text-yellow-600', borderColor: 'border-b-yellow-600' },
  { id: 'offline-nodes', iconName: 'XCircle', status: 'Critical', statusColor: 'text-red-600', value: '8', label: 'Offline Nodes', subtext: 'BARMM / Caraga', subtextColor: 'text-red-600', borderColor: 'border-b-red-600' },
  { id: 'network-uptime', iconName: 'Clock', status: 'Good', statusColor: 'text-green-600', value: '99.2%', label: 'Avg Network Uptime', borderColor: 'border-b-green-600' },
  { id: 'op-readiness', iconName: 'Shield', status: 'Review', statusColor: 'text-yellow-600', value: '94.7%', label: 'Operational Readiness', subtext: '66 nodes need attention', subtextColor: 'text-yellow-600', borderColor: 'border-b-yellow-600' },
]

export const nodeRegionalStatus: NodeRegionalStatus[] = [
  { id: 'ncr', region: 'NCR', nodeCount: '218 / 218 nodes', status: 'Online', uptime: '99.9%', lastSync: '2 min ago', cpu: '34%', readiness: 'Operational', readinessColor: 'text-green-600' },
  { id: 'central-luzon', region: 'Central Luzon', nodeCount: '192 / 192 nodes', status: 'Online', uptime: '99.4%', lastSync: '4 min ago', cpu: '41%', readiness: 'Operational', readinessColor: 'text-green-600' },
  { id: 'calabarzon', region: 'CALABARZON', nodeCount: '159 / 176 nodes', status: 'Degraded', uptime: '96.9%', lastSync: '18 min ago', cpu: '72%', readiness: 'Partial', readinessColor: 'text-yellow-600' },
  { id: 'eastern-visayas', region: 'Eastern Visayas', nodeCount: '128 / 141 nodes', status: 'Degraded', uptime: '90.8%', lastSync: '31 min ago', cpu: '81%', readiness: 'Partial', readinessColor: 'text-yellow-600' },
  { id: 'barmm', region: 'BARMM', nodeCount: '120 / 134 nodes', status: 'Offline', uptime: '61.3%', lastSync: '6h 42m ago', cpu: '–', readiness: 'Critical', readinessColor: 'text-red-600' },
  { id: 'caraga', region: 'Caraga', nodeCount: '84 / 98 nodes', status: 'Offline', uptime: '57.8%', lastSync: '7h 19m ago', cpu: '–', readiness: 'Critical', readinessColor: 'text-red-600' },
]

export const networkUptimeData: NetworkUptimePoint[] = [
  { day: 'Jun 1', ncr: 100, national: 95, caraga: 78, barmm: 62 },
  { day: 'Jun 2', ncr: 99.8, national: 94.5, caraga: 76, barmm: 60 },
  { day: 'Jun 3', ncr: 100, national: 95, caraga: 75, barmm: 58 },
  { day: 'Jun 4', ncr: 99.9, national: 94, caraga: 72, barmm: 55 },
  { day: 'Jun 5', ncr: 100, national: 95.5, caraga: 70, barmm: 52 },
  { day: 'Jun 6', ncr: 99.8, national: 94.5, caraga: 65, barmm: 50 },
  { day: 'Jun 7', ncr: 100, national: 95, caraga: 60, barmm: 48 },
]

export const resourceUtilizationData: ResourceUtilizationPoint[] = [
  { region: 'NCR', cpu: 34, memory: 42 },
  { region: 'Central Luzon', cpu: 41, memory: 48 },
  { region: 'CALABARZON', cpu: 72, memory: 65 },
  { region: 'E. Visayas', cpu: 81, memory: 94 },
  { region: 'Davao', cpu: 38, memory: 45 },
  { region: 'BARMM', cpu: 0, memory: 0 },
  { region: 'Caraga', cpu: 0, memory: 0 },
]

// Helper: generate uptime history for a region deterministically
function generateUptimeHistory(
  onlineDays: number,
  degradedDays: number,
  totalDays: number = 90
): UptimeStatus[] {
  return Array.from({ length: totalDays }, (_, i) => {
    if (i < onlineDays) return 'online'
    if (i < onlineDays + degradedDays) return 'degraded'
    return 'offline'
  })
}

export const uptimeHistoryData: UptimeHistoryEntry[] = [
  { id: 'ncr', name: 'NCR', uptime: generateUptimeHistory(88, 2, 90), rate: '98.4%' },
  { id: 'central-luzon', name: 'Central Luzon', uptime: generateUptimeHistory(89, 1, 90), rate: '98.5%' },
  { id: 'calabarzon', name: 'CALABARZON', uptime: generateUptimeHistory(20, 40, 90), rate: '93.3%' },
  { id: 'eastern-visayas', name: 'Eastern Visayas', uptime: generateUptimeHistory(30, 40, 90), rate: '93.5%' },
  { id: 'davao', name: 'Davao Region', uptime: generateUptimeHistory(88, 0, 90), rate: '98.0%' },
  { id: 'barmm', name: 'BARMM', uptime: generateUptimeHistory(40, 0, 90), rate: '57.3%' },
  { id: 'caraga', name: 'Caraga', uptime: generateUptimeHistory(35, 0, 90), rate: '58.3%' },
]

// ─────────────────────────────────────────────
// SECTION 9: SYNC AUDIT
// ─────────────────────────────────────────────

export interface SyncKPICard {
  id: string
  iconName: string
  trend?: string
  trendColor?: string
  status?: string
  statusColor?: string
  value: string
  label: string
  subtext?: string
  subtextColor?: string
  borderColor: string
}

export interface SyncActivityPoint {
  time: string
  success: number
  failed: number
  volume: number
}

export interface SyncLatencyPoint {
  region: string
  latency: number
}

export interface SyncValidationPoint {
  day: string
  passed: number
  warnings: number
  rejected: number
}

export interface SyncNodeRow {
  id: string
  region: string
  nodeCount: string
  status: NodeStatus
  lastSync: string
  queue: string
  latency: string
  successRate: number
}

// ── Data ──

export const syncKPICards: SyncKPICard[] = [
  { id: 'total-sync', iconName: 'RefreshCw', trend: '+12.4%', trendColor: 'text-blue-600', value: '48,291', label: 'Total Sync Events', subtext: 'Last 24 hours', borderColor: 'border-b-blue-600' },
  { id: 'success-rate', iconName: 'CheckCircle2', status: 'Healthy', statusColor: 'text-green-600', value: '96.8%', label: 'Sync Success Rate', borderColor: 'border-b-4 border-b-green-600' },
  { id: 'upload-volume', iconName: 'CloudUpload', trend: '+8.1%', trendColor: 'text-yellow-600', value: '2.41 GB', label: 'Upload Volume', subtext: 'Today', borderColor: 'border-b-yellow-600' },
  { id: 'avg-latency', iconName: 'Clock', status: 'Normal', statusColor: 'text-blue-600', value: '142 ms', label: 'Avg Sync Latency', borderColor: 'border-b-blue-600' },
  { id: 'failed-syncs', iconName: 'AlertTriangle', status: 'Alert', statusColor: 'text-red-600', value: '1,534', label: 'Failed Syncs', subtext: '14 nodes offline', subtextColor: 'text-red-600', borderColor: 'border-b-red-600' },
  { id: 'validation-failures', iconName: 'XCircle', trend: '↑ Spike', trendColor: 'text-red-600', value: '287', label: 'Validation Failures', subtext: '23 in last cycle', subtextColor: 'text-red-600', borderColor: 'border-b-red-600' },
]

export const syncActivityData: SyncActivityPoint[] = [
  { time: '00:00', success: 1500, failed: 150, volume: 0.3 },
  { time: '02:00', success: 1800, failed: 120, volume: 0.4 },
  { time: '04:00', success: 2100, failed: 250, volume: 0.5 },
  { time: '06:00', success: 2400, failed: 320, volume: 0.6 },
  { time: '08:00', success: 2800, failed: 180, volume: 0.8 },
  { time: '10:00', success: 2600, failed: 140, volume: 0.7 },
  { time: '12:00', success: 2900, failed: 200, volume: 0.9 },
  { time: '14:00', success: 2700, failed: 280, volume: 0.75 },
  { time: '16:00', success: 2500, failed: 160, volume: 0.65 },
  { time: '18:00', success: 2800, failed: 120, volume: 0.8 },
  { time: '20:00', success: 2400, failed: 90, volume: 0.55 },
  { time: '22:00', success: 2100, failed: 70, volume: 0.4 },
]

export const syncLatencyData: SyncLatencyPoint[] = [
  { region: 'NCR', latency: 68 },
  { region: 'C. Luzon', latency: 112 },
  { region: 'CALABARZON', latency: 284 },
  { region: 'Davao', latency: 104 },
  { region: 'E. Visayas', latency: 341 },
]

export const syncValidationData: SyncValidationPoint[] = [
  { day: 'Jun 1', passed: 3800, warnings: 400, rejected: 150 },
  { day: 'Jun 2', passed: 3600, warnings: 380, rejected: 180 },
  { day: 'Jun 3', passed: 4000, warnings: 420, rejected: 200 },
  { day: 'Jun 4', passed: 4100, warnings: 450, rejected: 220 },
  { day: 'Jun 5', passed: 4200, warnings: 480, rejected: 180 },
  { day: 'Jun 6', passed: 4000, warnings: 500, rejected: 240 },
  { day: 'Jun 7', passed: 4100, warnings: 520, rejected: 290 },
]

export const syncNodeRows: SyncNodeRow[] = [
  { id: 'ncr', region: 'NCR', nodeCount: '218 nodes active', status: 'Online', lastSync: '2 min ago', queue: '0 pending', latency: '98ms', successRate: 99.4 },
  { id: 'central-luzon', region: 'Central Luzon', nodeCount: '192 nodes active', status: 'Online', lastSync: '4 min ago', queue: '3 pending', latency: '112ms', successRate: 98.1 },
  { id: 'calabarzon', region: 'CALABARZON', nodeCount: '169 / 176 nodes', status: 'Degraded', lastSync: '18 min ago', queue: '47 pending', latency: '284ms', successRate: 91.2 },
  { id: 'eastern-visayas', region: 'Eastern Visayas', nodeCount: '128 / 141 nodes', status: 'Degraded', lastSync: '31 min ago', queue: '89 pending', latency: '341ms', successRate: 84.7 },
  { id: 'barmm', region: 'BARMM', nodeCount: '120 / 134 nodes', status: 'Offline', lastSync: '6h 42m ago', queue: '312 pending', latency: '–', successRate: 61.3 },
  { id: 'caraga', region: 'Caraga', nodeCount: '84 / 98 nodes', status: 'Offline', lastSync: '7h 19m ago', queue: '267 pending', latency: '–', successRate: 57.8 },
]
