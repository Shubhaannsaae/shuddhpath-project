'use client'

import { useState } from 'react'
import SearchBar from '@/app/components/dashboard/SearchBar'
import RouteOptions from '@/app/components/dashboard/RouteOptions'
import AQIChart from '@/app/components/dashboard/AQIChart'
import { Card } from '@/app/components/ui/Card'
import { useAuth } from '@/app/hooks/useAuth'

export default function Dashboard() {
  const { user } = useAuth()
  const [selectedRoute, setSelectedRoute] = useState<'cleanest' | 'fastest' | 'shortest'>('cleanest')
  const [routeData, setRouteData] = useState(null)

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="pb-4 border-b">
        <h1 className="text-xl font-semibold text-gray-900">ShuddhPath</h1>
        <p className="text-sm text-gray-600">Welcome, {user?.name || 'User'}</p>
      </div>

      {/* Search */}
      <SearchBar onRouteCalculated={setRouteData} />

      {/* Route Options */}
      <RouteOptions 
        selected={selectedRoute}
        onSelect={setSelectedRoute}
        routeData={routeData}
      />

      {/* Current AQI */}
      <Card className="p-4">
        <h3 className="font-medium mb-3">Current Air Quality</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">PM2.5</span>
            <span className="text-sm font-medium">42 μg/m³</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">PM10</span>
            <span className="text-sm font-medium">58 μg/m³</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">AQI</span>
            <span className="text-sm font-medium text-orange-600">Moderate</span>
          </div>
        </div>
      </Card>

      {/* Historical Chart */}
      <AQIChart />
    </div>
  )
}
