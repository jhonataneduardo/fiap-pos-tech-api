import express from 'express';
import { CustomerApiController } from '../controllers/http/customer-api.controller';
import { authenticate } from '@core/infrastructure/http/middlewares/auth.middleware';

const CustomerRouter = express.Router();

// Todas as rotas de customers requerem autenticação
CustomerRouter.post('/customers', authenticate, CustomerApiController.createCustomer);
CustomerRouter.get('/customers', authenticate, CustomerApiController.getAllCustomers);

export default CustomerRouter;
