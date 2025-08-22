import axios from 'axios';

export class ArcGISService {
  private portalUrl: string;
  private token: string | null = null;

  constructor(portalUrl: string) {
    this.portalUrl = portalUrl;
  }

  async authenticateWithUserToken(token: string) {
    this.token = token;
  }

  async queryAirQualityData(itemId: string, whereClause = '1=1') {
    if (!this.token) {
      throw new Error('Authentication required');
    }

    const queryUrl = `${this.portalUrl}/rest/services/Hosted/${itemId}/FeatureServer/0/query`;
    
    const response = await axios.get(queryUrl, {
      params: {
        where: whereClause,
        outFields: '*',
        f: 'json',
        token: this.token,
        orderByFields: 'local_time_ist DESC'
      }
    });

    return response.data;
  }

  async getRouteOptimization(startPoint: [number, number], endPoint: [number, number]) {
    // Use ArcGIS routing service with current air quality data
    const routeUrl = `${this.portalUrl}/rest/services/Network/Route/NAServer/Route/solve`;
    
    const response = await axios.post(routeUrl, {
      stops: {
        type: 'features',
        features: [
          { geometry: { x: startPoint[0], y: startPoint[1] } },
          { geometry: { x: endPoint, y: endPoint[1] } }
        ]
      },
      token: this.token,
      f: 'json'
    });

    return response.data;
  }
}
