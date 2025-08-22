import { Request, Response } from 'express';
import { AQIService } from '../services/aqi.service';

export class AQIController {
  static async getCurrentAQI(req: Request, res: Response) {
    try {
      const { lat, lng, radius } = req.query;
      
      if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and longitude required' });
      }

      const aqi = await AQIService.getCurrentAQI(
        parseFloat(lat as string),
        parseFloat(lng as string),
        radius ? parseFloat(radius as string) : 1000
      );

      res.json(aqi);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch AQI data' });
    }
  }

  static async getForecast(req: Request, res: Response) {
    try {
      const { lat, lng } = req.query;
      
      if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and longitude required' });
      }

      const forecast = await AQIService.getForecast(
        parseFloat(lat as string),
        parseFloat(lng as string)
      );

      res.json(forecast);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch forecast' });
    }
  }

  static async predictAQI(req: Request, res: Response) {
    try {
      const { latitude, longitude, temperature, humidity } = req.body;
      
      const prediction = await AQIService.predictAQI({
        latitude,
        longitude,
        temperature,
        humidity
      });

      res.json(prediction);
    } catch (error) {
      res.status(500).json({ error: 'Prediction failed' });
    }
  }

  static async getStations(req: Request, res: Response) {
    try {
      const stations = await AQIService.getStations();
      res.json(stations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stations' });
    }
  }
}
