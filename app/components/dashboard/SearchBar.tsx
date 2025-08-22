'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/Button'
import { Card } from '@/app/components/ui/Card'

interface SearchBarProps {
  onRouteCalculated: (data: any) => void
}

export default function SearchBar({ onRouteCalculated }: SearchBarProps) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!origin.trim() || !destination.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/routing/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          destination,
          routeType: 'cleanest',
          travelMode: 'walking'
        })
      })

      if (response.ok) {
        const data = await response.json()
        onRouteCalculated(data)
      }
    } catch (error) {
      console.error('Route search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-4">
      <h3 className="font-medium mb-3">Route Planning</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter starting point"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <Button 
          onClick={handleSearch}
          disabled={loading || !origin.trim() || !destination.trim()}
          className="w-full"
        >
          {loading ? 'Calculating...' : 'Find Clean Routes'}
        </Button>
      </div>
    </Card>
  )
}
