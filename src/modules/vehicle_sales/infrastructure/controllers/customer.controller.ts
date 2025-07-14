import { Request, Response } from 'express';
import { ApiResponseHandler } from '@/core/infrastructure/http/responses';

import { CustomerUseCaseFactory } from '@/modules/vehicle_sales/infrastructure/factories/customer-usecase.factory';
import { InputCustomerDTO } from '@/modules/vehicle_sales/application/dtos/customer.dto';

export class CustomerController {
    static async createCustomer(req: Request, res: Response) {
        try {
            const body = req.body as InputCustomerDTO;

            const useCase = CustomerUseCaseFactory.registerNewCustomerUseCase();
            const response = await useCase.execute(body);

            ApiResponseHandler.success(res, response, 201);
        } catch (error) {
            console.error('Error creating customer:', error);
            ApiResponseHandler.error(res, error as Error);
        }
    }

    static async getAllCustomers(req: Request, res: Response) {
        try {
            const useCase = CustomerUseCaseFactory.listAllCustomersUseCase();
            const response = await useCase.execute();

            ApiResponseHandler.success(res, response, 200);
        } catch (error) {
            console.error('Error fetching all customers:', error);
            ApiResponseHandler.error(res, error as Error);
        }
    }

    static async getCustomerByNationalId(req: Request, res: Response) {
        const { nationalId } = req.params;

        // Implement your logic to get a customer by national ID
        // For example, you might call a service method here
        // const customer = await customerService.getCustomerByNationalId(nationalId);

        // res.status(200).json(customer);
    }
}