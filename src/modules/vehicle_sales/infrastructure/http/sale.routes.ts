import express from 'express';
import { SaleApiController } from '../controllers/http/sale-api.controller';

const SaleRouter = express.Router();

SaleRouter.post('/sales', SaleApiController.createSale);
SaleRouter.post('/webhook/payment', SaleApiController.updatePaymentStatus);

export default SaleRouter;
