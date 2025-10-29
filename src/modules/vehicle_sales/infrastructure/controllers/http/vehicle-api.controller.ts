import { Request, Response } from "express";
import { container } from "@/core/infrastructure/di/container";
import { VehicleController } from "@/modules/vehicle_sales/application/controllers/vehicle.controller";
import { ApiResponseHandler } from "@/core/infrastructure/http/responses";

/**
 * VehicleApiController (HTTP Adapter)
 *
 * Controller da camada de infraestrutura que adapta HTTP (Express) para Clean Architecture.
 * Responsável por:
 * - Extrair dados do Request (body, params, query)
 * - Delegar processamento para o VehicleController (Clean)
 * - Formatar Response HTTP com status codes adequados
 */
export class VehicleApiController {
    /**
     * POST /vehicles - Cria um novo vehicle
     */
    static async createVehicle(req: Request, res: Response): Promise<void> {
        try {
            const vehicleController = container.resolve<VehicleController>('VehicleController');

            const input = {
                model: req.body.model,
                brand: req.body.brand,
                year: req.body.year,
                price: req.body.price,
                color: req.body.color,
            };

            const vehicle = await vehicleController.registerVehicle(input);

            ApiResponseHandler.success(res, vehicle, 201);
        } catch (error) {
            console.error("Error creating vehicle:", error);
            ApiResponseHandler.error(res, error as Error);
        }
    }

    /**
     * GET /vehicles - Lista todos os vehicles
     */
    static async getAllVehicles(req: Request, res: Response): Promise<void> {
        try {
            const vehicleController = container.resolve<VehicleController>('VehicleController');

            const vehicles = await vehicleController.listAllVehicles();

            ApiResponseHandler.success(res, vehicles);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
            ApiResponseHandler.error(res, error as Error);
        }
    }

    /**
     * PATCH /vehicles/:id - Atualiza um vehicle
     */
    static async updateVehicle(req: Request, res: Response): Promise<void> {
        try {
            const vehicleController = container.resolve<VehicleController>('VehicleController');

            const vehicleId = req.params.id;
            const updateData = {
                model: req.body.model,
                brand: req.body.brand,
                year: req.body.year,
                price: req.body.price,
                color: req.body.color,
            };

            const vehicle = await vehicleController.updateVehicle(vehicleId, updateData);

            ApiResponseHandler.success(res, vehicle);
        } catch (error) {
            console.error("Error updating vehicle:", error);
            ApiResponseHandler.error(res, error as Error);
        }
    }

    /**
     * GET /vehicles/available - Lista vehicles disponíveis
     */
    static async getAvailableVehicles(req: Request, res: Response): Promise<void> {
        try {
            const vehicleController = container.resolve<VehicleController>('VehicleController');

            const vehicles = await vehicleController.listAvailableVehicles();

            ApiResponseHandler.success(res, vehicles);
        } catch (error) {
            console.error("Error fetching available vehicles:", error);
            ApiResponseHandler.error(res, error as Error);
        }
    }

    /**
     * GET /vehicles/sold - Lista vehicles vendidos
     */
    static async getSoldVehicles(req: Request, res: Response): Promise<void> {
        try {
            const vehicleController = container.resolve<VehicleController>('VehicleController');

            const soldVehicles = await vehicleController.listSoldVehicles();

            ApiResponseHandler.success(res, soldVehicles);
        } catch (error) {
            console.error("Error fetching sold vehicles:", error);
            ApiResponseHandler.error(res, error as Error);
        }
    }
}
