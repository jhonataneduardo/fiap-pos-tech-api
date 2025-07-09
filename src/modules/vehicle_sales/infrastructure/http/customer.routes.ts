import express from 'express';
import { CustomerController } from '../controllers/customer.controller';

const CustomerRouter = express.Router();

CustomerRouter.post('/customers', CustomerController.createCustomer);
CustomerRouter.get('/customers/:nationalId', CustomerController.getCustomerByNationalId);

export default CustomerRouter;
