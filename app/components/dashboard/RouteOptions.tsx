'use client'

import { Card } from '@/app/components/ui/Card'

interface RouteOptionsProps {
  selected: 'cleanest' | 'fastest' | 'shortest'
  onSelect: (option: 'cleanest' | 'fastest' | 'shortest') => void
  routeData: any
}

export default function RouteOptions({ selected, onSelect, routeData }: RouteOptionsProps) {
  const options = [
    {
      id: 'cleanest' as const,
      label: 'Cleanest',
      icon: '🌿',
      description: 'Lowest pollution exposure'
    },
    {
      id: 'fastest' as const,
      label: 'Fastest',
      icon: '⚡',
      description: 'Shortest travel time'
    },
    {
      id: 'shortest' as const,
      label: 'Shortest',
      icon: '📏',
      description: 'Minimum distance'
    }
  ]

  return (
    <Card className="p-4">
      <h3 className="font-medium mb-3">Route Options</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full p-3 rounded-lg text-left transition-colors ${
              selected === option.id
                ? 'bg-green-50 border border-green-200'
                : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{option.icon}</span>
              <div>
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-600">{option.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {routeData && (
        <div className="mt-4 pt-4 border-t">
          <div className="text-sm text-gray-600 space-y-1">
            <div>Distance: {routeData.distance?.toFixed(1)} km</div>
            <div>Duration: {Math.round(routeData.time)} min</div>
            {routeData.avgAQI && (
              <div>Avg AQI: {routeData.avgAQI.toFixed(0)}</div>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
