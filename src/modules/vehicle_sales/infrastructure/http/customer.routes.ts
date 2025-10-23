import express from 'express';
import { CustomerApiController } from '../controllers/http/customer-api.controller';

const CustomerRouter = express.Router();

CustomerRouter.post('/customers', CustomerApiController.createCustomer);
CustomerRouter.get('/customers', CustomerApiController.getAllCustomers);

export default CustomerRouter;
