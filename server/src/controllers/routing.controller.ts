import { Request, Response } from 'express';
import { ArcGISService } from '../services/arcgis.service';

export class RoutingController {
  static async getOptimizedRoute(req: Request, res: Response) {
    try {
      const { origin, destination, routeType, travelMode } = req.body;
      
      if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination required' });
      }

      const route = await ArcGISService.getOptimizedRoute({
        origin,
        destination,
        routeType: routeType || 'balanced',
        travelMode: travelMode || 'walking'
      });

      res.json(route);
    } catch (error) {
      res.status(500).json({ error: 'Route optimization failed' });
    }
  }

  static async getAlternativeRoutes(req: Request, res: Response) {
    try {
      const { origin, destination } = req.query;
      
      if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination required' });
      }

      const routes = await ArcGISService.getAlternativeRoutes(
        origin as string,
        destination as string
      );

      res.json(routes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch alternative routes' });
    }
  }
}
