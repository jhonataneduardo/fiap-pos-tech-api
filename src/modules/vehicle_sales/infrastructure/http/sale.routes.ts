import express from 'express';
import { SaleController } from '../controllers/sale.controller';

const SaleRouter = express.Router();

SaleRouter.post('/sales', SaleController.createSale);
SaleRouter.post('/webhook/payment', SaleController.updatePaymentStatus);

export default SaleRouter;
