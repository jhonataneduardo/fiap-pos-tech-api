import express from 'express';
import { VehicleApiController } from '../controllers/http/vehicle-api.controller';
import { authenticate } from '@core/infrastructure/http/middlewares/auth.middleware';

const VehicleRouter = express.Router();

// Todas as rotas de vehicles requerem autenticação
// Read endpoints moved to fiap-pos-tech-api-read service
VehicleRouter.post('/vehicles', authenticate, VehicleApiController.createVehicle);
VehicleRouter.patch('/vehicles/:id', authenticate, VehicleApiController.updateVehicle);
VehicleRouter.get('/vehicles/:id', authenticate, VehicleApiController.getVehicleById);

export default VehicleRouter;