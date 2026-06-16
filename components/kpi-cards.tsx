'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'

export function KPICards() {
  const cards = [
    {
      title: 'National ANC Coverage',
      value: '87.4%',
      trend: '+3.2%',
      trendPositive: true,
      subtitle: 'Target: 95%',
      progress: 87.4,
      delay: '0s'
    },
    {
      title: 'Maternal Mortality Ratio',
      value: '114',
      trend: '-5.3%',
      trendPositive: true,
      subtitle: 'per 100,000 live births - Q2 2025',
      subtext: 'Improved vs. Q4 2024 (120)',
      delay: '0.05s'
    },
    {
      title: 'Reporting Facilities',
      value: '2,763',
      trend: null,
      subtitle: 'of 2,841 total',
      subtext: '78 facilities not synced',
      delay: '0.1s'
    },
    {
      title: 'Active BHWs Reporting',
      value: '48,291',
      trend: null,
      subtitle: 'across 17 regions nationwide',
      subtext: '94.3% submission rate',
      delay: '0.15s'
    }
  ]

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {cards.map((card, idx) => (
        <div 
          key={idx}
          className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 hover:scale-105 hover:-translate-y-1 card-animate cursor-pointer"
          style={{ animationDelay: card.delay }}
        >
          <p className="text-sm text-slate-500 font-medium mb-2 transition-colors duration-300">{card.title}</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-slate-900 transition-colors duration-300">{card.value}</span>
            {card.trend && (
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300 ${
                card.trendPositive 
                  ? 'bg-green-100' 
                  : 'bg-red-100'
              }`}>
                {card.trendPositive ? (
                  <TrendingUp className="w-3 h-3 text-green-600" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-600" />
                )}
                <span className={`text-xs font-semibold ${
                  card.trendPositive 
                    ? 'text-green-700' 
                    : 'text-red-700'
                }`}>
                  {card.trend}
                </span>
              </span>
            )}
          </div>
          {card.progress && (
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-500 ease-out" 
                style={{ width: `${card.progress}%` }}
              ></div>
            </div>
          )}
          <p className="text-xs text-slate-500 mt-3 transition-colors duration-300">{card.subtitle}</p>
          {card.subtext && (
            <p className={`text-xs mt-2 transition-colors duration-300 ${
              idx === 2 ? 'text-orange-600' : 'text-green-600'
            }`}>
              {card.subtext}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
