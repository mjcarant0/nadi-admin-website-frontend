import {
  Users,
  UserCheck,
  UserX,
  MapPin,
  Mountain,
  Scale,
} from 'lucide-react'
import { bhwKPIs, type BHWKPIItem } from '@/lib/mock-data'

const ICON_MAP: Record<string, React.ElementType> = {
  Users,
  UserCheck,
  UserX,
  MapPin,
  Mountain,
  Scale,
}

export function BHWKPI() {
  const kpis: BHWKPIItem[] = bhwKPIs

  return (
    <div className="grid grid-cols-6 gap-4 mb-6">
      {kpis.map((kpi) => {
        const Icon = ICON_MAP[kpi.iconName] ?? Users
        return (
          <div
            key={kpi.id}
            className={`border ${kpi.borderColor} rounded-lg p-4 ${kpi.bgColor} flashcard-interactive`}
          >
            <div className="flex items-start justify-between mb-3">
              <Icon className={`w-5 h-5 ${kpi.color}`} />
              <span className={`text-xs font-semibold ${kpi.color}`}>{kpi.label}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{kpi.value}</p>
            <p className="text-xs font-medium text-slate-700 mb-1">{kpi.subtitle}</p>
            {kpi.description && (
              <p className={`text-xs ${kpi.color}`}>{kpi.description}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
