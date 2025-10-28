import express from 'express';
import { VehicleApiController } from '../controllers/http/vehicle-api.controller';
import { authenticate } from '@core/infrastructure/http/middlewares/auth.middleware';

const VehicleRouter = express.Router();

// Todas as rotas de vehicles requerem autenticação
VehicleRouter.post('/vehicles', authenticate, VehicleApiController.createVehicle);
VehicleRouter.get('/vehicles', authenticate, VehicleApiController.getAllVehicles);
VehicleRouter.patch('/vehicles/:id', authenticate, VehicleApiController.updateVehicle);
VehicleRouter.get('/vehicles/available', authenticate, VehicleApiController.getAvailableVehicles);
VehicleRouter.get('/vehicles/sold', authenticate, VehicleApiController.getSoldVehicles);

export default VehicleRouter;