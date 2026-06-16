import { AlertCircle, X } from 'lucide-react'

export function CohortAlert() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium text-blue-900">
          Cohort Workspace: Apply filters below to segment maternal cohorts by gestational age, danger sign classification, region, and facility type. Cross-tab analysis updates dynamically. Currently showing 24,817 records matching active filter criteria.
        </p>
      </div>
      <button className="text-blue-600 hover:text-blue-700">
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}

export function AdvancedCohortFilters() {
  return (
    <div className="border border-slate-200 rounded-lg p-6 mb-6 bg-white">
      <h3 className="text-sm font-semibold text-slate-900 mb-6">Advanced Cohort Filters</h3>
      <div className="grid grid-cols-4 gap-6">
        {/* Gestational Age */}
        <div>
          <label className="text-xs font-semibold text-slate-700 mb-3 block">Gestational Age (Weeks)</label>
          <div className="mb-4">
            <input type="range" min="4" max="42" className="w-full" />
            <div className="flex justify-between text-xs text-slate-600 mt-2">
              <span>4 — 42 wks</span>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-slate-600">1st (4-13)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-slate-600">2nd (14-26)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-slate-600">3rd (27-42)</span>
            </label>
          </div>
          <div className="mt-4 space-y-2 text-xs border-t border-slate-200 pt-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span className="text-slate-600">Post-Term ≥40w</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-slate-600">{'Preterm <37w'}</span>
            </div>
          </div>
        </div>

        {/* Danger Signs */}
        <div>
          <label className="text-xs font-semibold text-slate-700 mb-3 block">Danger Sign Classification</label>
          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-slate-600">Severe Headache</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-slate-600">Blurred Vision</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-slate-600">Vaginal Bleeding</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-slate-600">Edema (Hands/Face)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-slate-600">Fever ≥38°C</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-slate-600">Convulsions</span>
            </label>
          </div>
        </div>

        {/* Region & Area */}
        <div>
          <label className="text-xs font-semibold text-slate-700 mb-3 block">Region & Area Type</label>
          <div className="mb-4">
            <select className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs">
              <option>All Regions (17)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-xs font-medium text-slate-600 block mb-2">Area Classification</label>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-slate-900 text-white text-xs rounded">Urban</button>
              <button className="px-3 py-1 bg-white border border-slate-300 text-slate-700 text-xs rounded hover:bg-slate-50">Rural</button>
              <button className="px-3 py-1 bg-white border border-red-300 text-red-700 text-xs rounded hover:bg-red-50">GIDA Only</button>
            </div>
          </div>
          <div>
            <select className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs">
              <option>All Provinces</option>
            </select>
          </div>
        </div>

        {/* Facility */}
        <div>
          <label className="text-xs font-semibold text-slate-700 mb-3 block">Facility & Cohort Type</label>
          <div className="space-y-2 text-xs mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-slate-600">Barangay Health Station</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-slate-600">Rural Health Unit (RHU)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-slate-600">District Hospital</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-slate-600">Provincial Hospital</span>
            </label>
          </div>
          <div className="border-t border-slate-200 pt-4">
            <label className="text-xs font-medium text-slate-600 block mb-2">Cohort Segment</label>
            <div className="space-y-1 text-xs">
              <div className="text-blue-600 cursor-pointer hover:underline">High Risk + Low Risk</div>
              <div className="text-blue-600 cursor-pointer hover:underline">Multiparous Primigravida</div>
              <div className="text-blue-600 cursor-pointer hover:underline">Adolescent Elderly Gravida</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium text-slate-600">Active segments:</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">All Trimesters</span>
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">2 Danger Signs</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">All Regions</span>
        </div>
        <button className="px-6 py-2 bg-slate-900 text-white rounded text-sm font-medium hover:bg-slate-800">
          Apply Filters & Analyze
        </button>
      </div>
    </div>
  )
}
