'use client'

import { AlertCircle, Clock, AlertTriangle } from 'lucide-react'
import {
  executivePriorityAlerts,
  type ExecutivePriorityAlert,
  type AlertSeverity,
} from '@/lib/mock-data'

function getSeverityStyles(severity: AlertSeverity) {
  switch (severity) {
    case 'critical':
      return { border: 'border-red-200', icon: AlertCircle, iconColor: 'text-red-600', textColor: 'text-red-600' }
    case 'warning':
      return { border: 'border-orange-200', icon: AlertCircle, iconColor: 'text-orange-600', textColor: 'text-orange-600' }
    case 'info':
    default:
      return { border: 'border-yellow-200', icon: Clock, iconColor: 'text-yellow-600', textColor: 'text-yellow-600' }
  }
}

function AlertCard({ alert }: { alert: ExecutivePriorityAlert }) {
  const { border, icon: Icon, iconColor, textColor } = getSeverityStyles(alert.severity)

  return (
    <div
      className={`bg-white border ${border} rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer card-animate`}
      style={{ animationDelay: alert.animationDelay }}
    >
      <div className="flex items-start gap-2 mb-2">
        <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5 transition-transform duration-300`} />
        <div className="flex-1">
          <p className={`font-semibold ${textColor} text-sm transition-colors duration-300`}>{alert.title}</p>
          <p className="text-xs text-slate-600 mt-2 transition-colors duration-300">{alert.description}</p>
        </div>
      </div>
    </div>
  )
}

export function PriorityAlerts() {
  const alerts: ExecutivePriorityAlert[] = executivePriorityAlerts

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 mb-6 fade-in transition-all duration-300">
      <div className="flex items-start gap-3 mb-4 animate-pulse">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <h3 className="text-lg font-bold text-slate-900">PRIORITY ALERTS FOR LEADERSHIP</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  )
}
