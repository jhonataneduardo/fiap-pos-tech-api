import { Request, Response } from 'express';
import { ApiResponseHandler } from '@/core/infrastructure/http/responses';
import { SaleUseCaseFactory } from '@/modules/vehicle_sales/infrastructure/factories/sale-usecase.factory';
import { InputSaleDTO } from '@/modules/vehicle_sales/application/dtos/sale.dto';

export class SaleController {
    static async createSale(req: Request, res: Response) {
        try {
            const body = req.body as InputSaleDTO;

            const useCase = SaleUseCaseFactory.registerNewSaleUseCase();
            const response = await useCase.execute(body);

            ApiResponseHandler.success(res, response, 201);
        } catch (error) {
            console.error('Error creating sale:', error);
            ApiResponseHandler.error(res, error as Error);
        }
    }

    static async updatePaymentStatus(req: Request, res: Response) {
        // Implement your logic to update payment status
    }
}