'use client';

import { useEffect, useRef } from 'react';
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import PortalItem from "@arcgis/core/portal/PortalItem";
import Portal from "@arcgis/core/portal/Portal";
import { useArcGIS } from '@/hooks/useArcGIS';

interface ArcGISMapProps {
  webMapId: string; // Your Experience Builder map item ID
  className?: string;
}

export default function ArcGISMap({ webMapId, className }: ArcGISMapProps) {
  const mapDiv = useRef<HTMLDivElement>(null);
  const { isAuthenticated, portal } = useArcGIS();
  const mapViewRef = useRef<MapView | null>(null);

  useEffect(() => {
    if (isAuthenticated && portal && mapDiv.current) {
      initializeMap();
    }

    return () => {
      if (mapViewRef.current) {
        mapViewRef.current.destroy();
      }
    };
  }, [isAuthenticated, portal, webMapId]);

  const initializeMap = async () => {
    try {
      // Create portal item using your item ID
      const portalItem = new PortalItem({
        id: webMapId,
        portal: portal
      });

      // Create web map from portal item
      const webMap = new WebMap({
        portalItem: portalItem
      });

      // Create map view
      const mapView = new MapView({
        container: mapDiv.current!,
        map: webMap,
        zoom: 12,
        center: [82.9739, 25.3176] // Varanasi coordinates
      });

      await mapView.when();
      mapViewRef.current = mapView;

      // Add air quality data layers
      await addAirQualityLayers(mapView);

    } catch (error) {
      console.error('Map initialization error:', error);
    }
  };

  const addAirQualityLayers = async (mapView: MapView) => {
    // Add your air quality monitoring stations
    const airQualityLayer = new (await import("@arcgis/core/layers/FeatureLayer")).default({
      // Use your portal-hosted feature service
      portalItem: new PortalItem({
        id: "your-air-quality-layer-id", // Replace with your item ID
        portal: portal
      }),
      outFields: ["*"],
      popupTemplate: {
        title: "Air Quality Station: {station_name}",
        content: [
          {
            type: "fields",
            fieldInfos: [
              { fieldName: "PM2_5", label: "PM2.5 (μg/m³)" },
              { fieldName: "PM10", label: "PM10 (μg/m³)" },
              { fieldName: "CO2", label: "CO2 (PPM)" }
            ]
          }
        ]
      }
    });

    mapView.map.add(airQualityLayer);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p className="text-gray-600">Please sign in to view the map</p>
      </div>
    );
  }

  return (
    <div 
      ref={mapDiv} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
}
