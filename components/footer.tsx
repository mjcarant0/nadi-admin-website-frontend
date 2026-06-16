'use client'

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-4 px-8 text-xs text-slate-600">
      <div className="flex items-center justify-between">
        <p>© 2025 Republic of the Philippines — Department of Health • N.A.D.I. v2.4.1</p>
        <div className="flex items-center gap-2">
          <span>Data Privacy Act Compliant •</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
