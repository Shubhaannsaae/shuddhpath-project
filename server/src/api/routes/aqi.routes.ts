import { Router } from 'express';
import { AQIController } from '../controllers/aqi.controller';

const router = Router();

router.get('/current', AQIController.getCurrentAQI);
router.get('/forecast', AQIController.getForecast);
router.post('/predict', AQIController.predictAQI);
router.get('/stations', AQIController.getStations);

export default router;
