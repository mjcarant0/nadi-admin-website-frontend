'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { executiveDashboardKPIs, type ExecutiveDashboardKPI } from '@/lib/mock-data'

export function KPICards() {
  const cards: ExecutiveDashboardKPI[] = executiveDashboardKPIs

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm card-animate flashcard-interactive"
          style={{ animationDelay: card.animationDelay }}
        >
          <p className="text-sm text-slate-500 font-medium mb-2 transition-colors duration-300">{card.title}</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-slate-900 transition-colors duration-300">{card.value}</span>
            {card.trend && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300 ${
                  card.trendPositive ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                {card.trendPositive ? (
                  <TrendingUp className="w-3 h-3 text-green-600" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-600" />
                )}
                <span
                  className={`text-xs font-semibold ${
                    card.trendPositive ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {card.trend}
                </span>
              </span>
            )}
          </div>
          {card.progress != null && (
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-500 ease-out"
                style={{ width: `${card.progress}%` }}
              />
            </div>
          )}
          <p className="text-xs text-slate-500 mt-3 transition-colors duration-300">{card.subtitle}</p>
          {card.subtext && (
            <p
              className={`text-xs mt-2 transition-colors duration-300 ${
                card.id === 'reporting-facilities' ? 'text-orange-600' : 'text-green-600'
              }`}
            >
              {card.subtext}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
