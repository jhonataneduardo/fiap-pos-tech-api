import { Router } from 'express';

import VehicleRouter from '@/modules/vehicle_sales/infrastructure/http/vehicle.routes';
import CustomerRouter from '@/modules/vehicle_sales/infrastructure/http/customer.routes';

const mainRouter = Router();

mainRouter.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

mainRouter.use('/', CustomerRouter);
mainRouter.use('/', VehicleRouter);

export default mainRouter;