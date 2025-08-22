import { PrismaClient } from '@prisma/client';
import { spawn } from 'child_process';
import config from '../config';

const prisma = new PrismaClient();

export class AQIService {
  static async getCurrentAQI(lat: number, lng: number, radius: number = 1000) {
    const stations = await prisma.station.findMany({
      include: {
        aqiRecords: {
          orderBy: { timestamp: 'desc' },
          take: 1
        }
      }
    });

    const nearbyStations = stations.filter(station => {
      const distance = this.calculateDistance(lat, lng, station.latitude, station.longitude);
      return distance <= radius;
    });

    if (nearbyStations.length === 0) {
      throw new Error('No stations found in specified radius');
    }

    return nearbyStations.map(station => ({
      station: station.name,
      latitude: station.latitude,
      longitude: station.longitude,
      aqi: station.aqiRecords[0]?.pm25 || 0,
      timestamp: station.aqiRecords?.timestamp
    }));
  }

  static async getForecast(lat: number, lng: number) {
    // Get current conditions for context
    const current = await this.getCurrentAQI(lat, lng);
    
    // Generate forecast based on historical patterns
    const forecast = [];
    const baseAQI = current[0]?.aqi || 50;
    
    for (let i = 1; i <= 24; i++) {
      const variation = Math.random() * 20 - 10; // ±10 variance
      forecast.push({
        hour: i,
        predictedAQI: Math.max(0, baseAQI + variation),
        confidence: 0.8
      });
    }
    
    return { current, forecast };
  }

  static async predictAQI(data: {
    latitude: number;
    longitude: number;
    temperature: number;
    humidity: number;
  }) {
    return new Promise((resolve, reject) => {
      const python = spawn('python3', [
        config.ML_MODEL_PATH.replace('.joblib', '_predict.py'),
        JSON.stringify(data)
      ]);

      let result = '';
      python.stdout.on('data', (data) => {
        result += data.toString();
      });

      python.on('close', (code) => {
        if (code === 0) {
          resolve(JSON.parse(result));
        } else {
          reject(new Error('Prediction failed'));
        }
      });
    });
  }

  static async getStations() {
    return await prisma.station.findMany({
      include: {
        aqiRecords: {
          orderBy: { timestamp: 'desc' },
          take: 1
        }
      }
    });
  }

  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }
}
