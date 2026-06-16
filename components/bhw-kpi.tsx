import { Users, UserCheck, UserX, MapPin, Mountain, Scale } from 'lucide-react'

export function BHWKPI() {
  const kpis = [
    {
      icon: Users,
      label: 'Total',
      value: '42,816',
      subtitle: 'Total BHWs',
      description: 'Nationwide workforce',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-slate-200'
    },
    {
      icon: UserCheck,
      label: 'Active',
      value: '38,941',
      subtitle: 'Active BHWs',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-slate-200'
    },
    {
      icon: UserX,
      label: 'Inactive',
      value: '3,875',
      subtitle: 'Inactive BHWs',
      description: '9.1% of workforce',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-slate-200'
    },
    {
      icon: MapPin,
      label: 'Covered',
      value: '41,082',
      subtitle: 'Active Barangays',
      description: 'of 42,046 total',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-slate-200'
    },
    {
      icon: Mountain,
      label: 'GIDA',
      value: '964',
      subtitle: 'GIDA Gaps',
      description: 'Uncovered barangays',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-slate-200'
    },
    {
      icon: Scale,
      label: 'Review',
      value: '1:19',
      subtitle: 'Avg BHW:Household',
      description: 'DOH standard: 1:20',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-slate-200'
    }
  ]

  return (
    <div className="grid grid-cols-6 gap-4 mb-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon
        return (
          <div key={idx} className={`border ${kpi.borderColor} rounded-lg p-4 ${kpi.bgColor} flashcard-interactive`}>
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
