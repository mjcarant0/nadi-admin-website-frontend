'use client'

import { useState } from 'react'
import { AlertCircle, Loader2 } from 'lucide-react'
import { api, ApiError } from '@/lib/api'

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

const datasets = [
  { name: 'ANC Coverage Data', detail: 'Antenatal coverage metrics by region, facility, trimester', rows: '~48,284 rows' },
  { name: 'Danger Sign Reports', detail: 'Classified danger sign events with regional breakdown', rows: '~17,325 rows' },
  { name: 'Cohort Analytics', detail: 'Maternal cohort segments by GA, risk level, facility', rows: '~6,284 rows' },
  { name: 'BHW Coverage', detail: 'Barangay health worker coverage metrics by province', rows: '~8,914 rows' },
  { name: 'FHSIS Summary Reports', detail: 'Field health service information system aggregates', rows: '~12,481 rows' },
  { name: 'Sync Audit Logs', detail: 'Node synchronization events and status history', rows: '~31,847 rows' }
]

export function ExportConfiguration() {
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7))
  const [kind, setKind] = useState<'fhsis-csv' | 'fhsis-json' | 'anonymised'>('fhsis-csv')

  async function handleGenerate() {
    setBusy(true)
    setMsg(null)
    try {
      if (kind === 'anonymised') {
        const rows = await api.anonymised()
        triggerDownload(
          new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' }),
          `anonymised_export_${new Date().toISOString().slice(0, 10)}.json`,
        )
      } else if (kind === 'fhsis-json') {
        const blob = await api.fhsisBlob(month, 'json')
        triggerDownload(blob, `FHSIS_${month}.json`)
      } else {
        const blob = await api.fhsisBlob(month, 'csv')
        triggerDownload(blob, `FHSIS_${month}.csv`)
      }
      setMsg({ kind: 'ok', text: 'Export downloaded.' })
    } catch (e) {
      setMsg({
        kind: 'err',
        text: e instanceof ApiError ? e.message : 'Export failed.',
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="border border-slate-200 rounded-lg p-6 bg-white mb-6">
      <h3 className="text-sm font-semibold text-slate-900 mb-6">Export Configuration</h3>
      <p className="text-xs text-slate-600 mb-6">Select dataset, filters, format, and download options</p>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Dataset Selection */}
        <div>
          <h4 className="text-xs font-semibold text-slate-700 mb-4 uppercase">1. Dataset Selection</h4>
          <div className="space-y-2">
            {datasets.map((dataset, idx) => (
              <label key={idx} className={`block p-3 border-2 rounded cursor-pointer transition ${
                idx === 0 
                  ? 'border-slate-900 bg-slate-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}>
                <input type="radio" name="dataset" defaultChecked={idx === 0} className="mr-2" />
                <div className="font-medium text-sm text-slate-900">{dataset.name}</div>
                <div className="text-xs text-slate-500 mt-1">{dataset.detail}</div>
                <div className="text-xs text-slate-400 mt-1">{dataset.rows}</div>
              </label>
            ))}
          </div>
        </div>

        {/* Filter Selection */}
        <div>
          <h4 className="text-xs font-semibold text-slate-700 mb-4 uppercase">2. Filter Selection</h4>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-2">Date Range</label>
              <div className="flex gap-2">
                <input type="date" defaultValue="2025-01-01" className="flex-1 px-2 py-1.5 border border-slate-200 rounded text-xs" />
                <span className="text-xs text-slate-500 px-2 py-1.5">—</span>
                <input type="date" defaultValue="2025-06-07" className="flex-1 px-2 py-1.5 border border-slate-200 rounded text-xs" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-2">Region</label>
              <select className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs">
                <option>All Regions (17)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-2">Facility Level</label>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-slate-900 text-white text-xs rounded">BHS</button>
                <button className="px-3 py-1 bg-slate-900 text-white text-xs rounded">RHU</button>
                <button className="px-3 py-1 bg-slate-900 text-white text-xs rounded">District</button>
                <button className="px-3 py-1 bg-white border border-slate-300 text-slate-700 text-xs rounded hover:bg-slate-50">Provincial</button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-2">Risk Classification</label>
              <div className="flex flex-wrap gap-2">
                <button className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-medium">High Risk</button>
                <button className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded font-medium">Moderate</button>
                <button className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">Low Risk</button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-2">Area Classification</label>
              <div className="flex flex-wrap gap-2">
                <button className="px-2 py-1 bg-slate-900 text-white text-xs rounded">Urban</button>
                <button className="px-2 py-1 bg-slate-900 text-white text-xs rounded">Rural</button>
                <button className="px-2 py-1 bg-white border border-slate-300 text-slate-700 text-xs rounded hover:bg-slate-50">GIDA</button>
                <button className="px-2 py-1 bg-white border border-slate-300 text-slate-700 text-xs rounded hover:bg-slate-50">Island</button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-2">Columns to Include</label>
              <div className="space-y-1 text-xs">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Region / Province / Municipality</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Facility Code & Level</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>ANC Visit & Trimester</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Risk Classification</span>
              </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Danger Sign Flags</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Sync Timestamps</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Node IDs (Audit Only)</span>
                </label>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <div className="flex gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-700">
                  <p className="font-medium">Data Privacy Notice</p>
                  <p className="mt-1">Patient identifiers (name, PhilHealth ID, contact) are automatically excluded. Only anonymized, aggregated population-level data is exported per RA 10173.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Format & Download */}
        <div>
          <h4 className="text-xs font-semibold text-slate-700 mb-4 uppercase">3. Format & Download</h4>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-2">Output Format</label>
              <div className="space-y-2">
                {[
                  { format: 'CSV', desc: 'Comma-separated, Excel-compatible' },
                  { format: 'JSON', desc: 'Structured, API-ready format' },
                  { format: 'XLSX', desc: 'Excel workbook with formatting' },
                  { format: 'PDF', desc: 'Summary report, print-ready' }
                ].map((opt, idx) => (
                  <label key={idx} className={`block p-2 border-2 rounded cursor-pointer transition ${
                    opt.format === 'CSV'
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <div className="flex items-center">
                      <input type="radio" name="format" defaultChecked={opt.format === 'CSV'} className="mr-2" />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-slate-900">{opt.format}</div>
                        <div className="text-xs text-slate-500">{opt.desc}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-2">Encoding & Options</label>
              <select className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs mb-3">
                <option>UTF-8 (Recommended)</option>
              </select>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2">
                  <input type="radio" name="compression" defaultChecked />
                  <span>None</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="compression" />
                  <span>ZIP (Recommended)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="compression" />
                  <span>GZ</span>
                </label>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-2">Delivery Method</label>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2">
                  <input type="radio" name="delivery" defaultChecked />
                  <span>Direct Download</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="delivery" />
                  <span>Email to dr.santos@doh.gov.ph</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="delivery" />
                  <span>Secure FTP / SFTP</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="delivery" />
                  <span>Schedule (Recurring)</span>
                </label>
              </div>
            </div>
            <div className="bg-slate-100 rounded p-3 mt-4 space-y-3">
              <p className="text-xs font-medium text-slate-700">Live Export (connected to backend)</p>
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Export Type</label>
                <select
                  value={kind}
                  onChange={(e) => setKind(e.target.value as typeof kind)}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs bg-white"
                >
                  <option value="fhsis-csv">FHSIS Monthly (CSV)</option>
                  <option value="fhsis-json">FHSIS Monthly (JSON)</option>
                  <option value="anonymised">Anonymised Aggregate (JSON)</option>
                </select>
              </div>
              {kind !== 'anonymised' && (
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Reporting Month
                  </label>
                  <input
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs bg-white"
                  />
                </div>
              )}
            </div>
            {msg && (
              <p
                className={`text-xs rounded px-3 py-2 ${
                  msg.kind === 'ok'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {msg.text}
              </p>
            )}
            <button
              onClick={handleGenerate}
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded font-medium text-sm hover:bg-slate-800 disabled:opacity-60 mt-4"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {busy ? 'Generating…' : 'Generate Export'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ExportHistory() {
  const exports = [
    { id: '001', dataset: 'ANC Coverage Data', format: 'CSV', rows: 48284, size: '3.2 MB', by: 'Dr. Santos', date: 'Jun 7, 14:32', status: 'Done' },
    { id: '002', dataset: 'Danger Sign Reports', format: 'JSON', rows: 17325, size: '8.7 MB', by: 'R. Reyes', date: 'Jun 7, 11:14', status: 'Processing' },
    { id: '003', dataset: 'Cohort Analytics', format: 'XLSX', rows: 6284, size: '1.1 MB', by: 'A. Cruz', date: 'Jun 7, 09:47', status: 'Processing' },
    { id: '004', dataset: 'BHW Coverage', format: 'CSV', rows: 8914, size: '0.9 MB', by: 'J. Dela Cruz', date: 'Jun 6, 16:22', status: 'Done' },
    { id: '005', dataset: 'FHSIS Summary Reports', format: 'PDF', rows: 12481, size: '4.8 MB', by: 'Dr. Santos', date: 'Jun 6, 10:05', status: 'Done' },
    { id: '006', dataset: 'Sync Audit Logs', format: 'JSON', rows: 3847, size: '2.1 MB', by: 'M. Bautista', date: 'Jun 5, 14:51', status: 'Failed' },
    { id: '007', dataset: 'ANC Coverage Data', format: 'CSV', rows: 11842, size: '1.4 MB', by: 'I. Mendoza', date: 'Jun 5, 09:30', status: 'Done' }
  ]

  return (
    <div className="border border-slate-200 rounded-lg p-6 bg-white">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Export History</h3>
      <div className="flex gap-4 mb-4">
        <select className="px-3 py-1.5 border border-slate-200 rounded text-sm">
          <option>All Datasets</option>
        </select>
        <select className="px-3 py-1.5 border border-slate-200 rounded text-sm">
          <option>All Statuses</option>
        </select>
        <input type="text" placeholder="Search..." className="flex-1 px-3 py-1.5 border border-slate-200 rounded text-sm" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">#</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Dataset</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Format</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Rows</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Size</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Exported By</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Timestamp</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {exports.map((exp, idx) => (
              <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="py-3 px-4 text-slate-600 font-medium">{exp.id}</td>
                <td className="py-3 px-4 text-slate-900">{exp.dataset}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    exp.format === 'CSV' ? 'bg-green-100 text-green-700' :
                    exp.format === 'JSON' ? 'bg-blue-100 text-blue-700' :
                    exp.format === 'XLSX' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {exp.format}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600">{exp.rows.toLocaleString()}</td>
                <td className="py-3 px-4 text-slate-600">{exp.size}</td>
                <td className="py-3 px-4 text-slate-600 text-xs">{exp.by}</td>
                <td className="py-3 px-4 text-slate-600 text-xs">{exp.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    exp.status === 'Done' ? 'bg-green-100 text-green-700' :
                    exp.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {exp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-slate-600">Showing 7 of 247 export records</p>
        <div className="flex gap-2">
          <button className="px-2 py-1 border border-slate-200 rounded text-xs hover:bg-slate-50">←</button>
          <button className="px-2 py-1 bg-slate-900 text-white rounded text-xs">1</button>
          <button className="px-2 py-1 border border-slate-200 rounded text-xs hover:bg-slate-50">2</button>
          <button className="px-2 py-1 border border-slate-200 rounded text-xs hover:bg-slate-50">→</button>
        </div>
      </div>
    </div>
  )
}
