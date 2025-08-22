import { Router } from 'express';
import aqiRoutes from './routes/aqi.routes';
import routingRoutes from './routes/routing.routes';

const router = Router();

router.use('/aqi', aqiRoutes);
router.use('/routing', routingRoutes);

export default router;
