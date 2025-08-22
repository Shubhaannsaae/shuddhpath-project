'use client'

import dynamic from 'next/dynamic'
import { Loader } from '@/app/components/ui/Loader'

const ArcGISMap = dynamic(
  () => import('@/app/components/map/ArcGISMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }
)

export default function MapView() {
  return <ArcGISMap />
}
