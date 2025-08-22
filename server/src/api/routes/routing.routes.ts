import { Router } from 'express';
import { RoutingController } from '../controllers/routing.controller';

const router = Router();

router.post('/optimize', RoutingController.getOptimizedRoute);
router.get('/alternatives', RoutingController.getAlternativeRoutes);

export default router;
