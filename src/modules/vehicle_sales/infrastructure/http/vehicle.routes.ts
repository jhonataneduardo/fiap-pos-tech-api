import express from 'express';
import { VehicleApiController } from '../controllers/http/vehicle-api.controller';

const VehicleRouter = express.Router();

VehicleRouter.post('/vehicles', VehicleApiController.createVehicle);
VehicleRouter.get('/vehicles', VehicleApiController.getAllVehicles);
VehicleRouter.patch('/vehicles/:id', VehicleApiController.updateVehicle);
VehicleRouter.get('/vehicles/available', VehicleApiController.getAvailableVehicles);
VehicleRouter.get('/vehicles/sold', VehicleApiController.getSoldVehicles);

export default VehicleRouter;