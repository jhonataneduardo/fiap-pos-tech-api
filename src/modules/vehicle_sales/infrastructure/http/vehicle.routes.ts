import express from 'express';
import { VehicleController } from '../controllers/vehicle.controller';

const VehicleRouter = express.Router();

VehicleRouter.post('/vehicles', VehicleController.createVehicle);
VehicleRouter.put('/vehicles/:id', VehicleController.updateVehicle);
VehicleRouter.get('/vehicles/available', VehicleController.getAvailableVehicles);
VehicleRouter.get('/vehicles/sold', VehicleController.getSoldVehicles);
VehicleRouter.put('/vehicles/:id/payment-status', VehicleController.updatePaymentStatus);

export default VehicleRouter;