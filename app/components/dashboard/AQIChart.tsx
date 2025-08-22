'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/app/components/ui/Card'

interface AQIData {
  time: string
  aqi: number
}

export default function AQIChart() {
  const [data, setData] = useState<AQIData[]>([])

  useEffect(() => {
    // Generate sample historical data
    const now = new Date()
    const sampleData = Array.from({ length: 24 }, (_, i) => {
      const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000)
      return {
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        aqi: Math.floor(Math.random() * 100) + 20
      }
    })
    setData(sampleData)
  }, [])

  const maxAQI = Math.max(...data.map(d => d.aqi))

  return (
    <Card className="p-4">
      <h3 className="font-medium mb-3">24-Hour AQI Trend</h3>
      <div className="h-32 flex items-end justify-between gap-1">
        {data.map((point, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-gradient-to-t from-green-400 via-yellow-400 to-red-400 rounded-t"
              style={{ 
                height: `${(point.aqi / maxAQI) * 100}%`,
                minHeight: '4px'
              }}
            />
            {index % 4 === 0 && (
              <span className="text-xs text-gray-500 mt-1 rotate-45 origin-bottom-left">
                {point.time}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Good (0-50)</span>
        <span>Moderate (51-100)</span>
        <span>Unhealthy (101+)</span>
      </div>
    </Card>
  )
}
