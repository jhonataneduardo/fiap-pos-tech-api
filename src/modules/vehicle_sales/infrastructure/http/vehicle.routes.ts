import express from 'express';
import { VehicleController } from '../controllers/vehicle.controller';

const VehicleRouter = express.Router();

VehicleRouter.post('/vehicles', VehicleController.createVehicle);
VehicleRouter.get('/vehicles', VehicleController.getAllVehicles);
VehicleRouter.patch('/vehicles/:id', VehicleController.updateVehicle);
VehicleRouter.get('/vehicles/available', VehicleController.getAvailableVehicles);
VehicleRouter.get('/vehicles/sold', VehicleController.getSoldVehicles);

export default VehicleRouter;