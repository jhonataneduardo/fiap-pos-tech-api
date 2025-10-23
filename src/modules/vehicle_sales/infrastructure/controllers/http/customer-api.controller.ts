import { Request, Response } from "express";
import { container } from "@/core/infrastructure/di/container";
import { CustomerController } from "@/modules/vehicle_sales/application/controllers/customer.controller";
import { ApiResponseHandler } from "@/core/infrastructure/http/responses";

/**
 * CustomerApiController (HTTP Adapter)
 *
 * Controller da camada de infraestrutura que adapta HTTP (Express) para Clean Architecture.
 * Responsável por:
 * - Extrair dados do Request (body, params, query)
 * - Delegar processamento para o CustomerController (Clean)
 * - Formatar Response HTTP com status codes adequados
 */
export class CustomerApiController {
    /**
     * POST /customers - Cria um novo customer
     */
    static async createCustomer(req: Request, res: Response): Promise<void> {
        try {
            const customerController = container.resolve<CustomerController>('CustomerController');

            const input = {
                name: req.body.name,
                email: req.body.email,
                national_id: req.body.national_id,
                status: req.body.status,
            };

            const customer = await customerController.registerCustomer(input);

            ApiResponseHandler.success(res, customer, 201);
        } catch (error) {
            console.error("Error creating customer:", error);
            ApiResponseHandler.error(res, error as Error);
        }
    }

    /**
     * GET /customers - Lista todos os customers (com filtros opcionais)
     */
    static async getAllCustomers(req: Request, res: Response): Promise<void> {
        try {
            const customerController = container.resolve<CustomerController>('CustomerController');

            const filters = req.query.national_id
                ? { national_id: req.query.national_id as string }
                : undefined;

            const customers = await customerController.listAllCustomers(filters);

            ApiResponseHandler.success(res, customers);
        } catch (error) {
            console.error("Error fetching customers:", error);
            ApiResponseHandler.error(res, error as Error);
        }
    }
}
