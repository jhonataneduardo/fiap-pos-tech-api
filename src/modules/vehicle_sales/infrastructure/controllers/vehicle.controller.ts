import { Request, Response } from 'express';
import { ApiResponseHandler } from '@/core/infrastructure/http/responses';
import { VehicleUseCaseFactory } from '@/modules/vehicle_sales/infrastructure/factories/vehicle-usecase.factory';
import { InputVehicleDTO, UpdateVehicleDTO } from '@/modules/vehicle_sales/application/dtos/vehicle.dto';

export class VehicleController {
    static async createVehicle(req: Request, res: Response) {
        try {
            const body = req.body as InputVehicleDTO;

            const useCase = VehicleUseCaseFactory.registerNewVehicleUseCase();
            const response = await useCase.execute(body);

            ApiResponseHandler.success(res, response, 201);
        } catch (error) {
            console.error('Error creating vehicle:', error);
            ApiResponseHandler.error(res, error as Error);
        }
    }

    static async getAllVehicles(req: Request, res: Response) {
        try {
            const useCase = VehicleUseCaseFactory.listAllVehiclesUseCase();
            const response = await useCase.execute();

            ApiResponseHandler.success(res, response, 200);
        } catch (error) {
            console.error('Error fetching all vehicles:', error);
            ApiResponseHandler.error(res, error as Error);
        }
    }

    static async updateVehicle(req: Request, res: Response) {
        try {
            const vehicleId = req.params.id as string;
            const updateData = req.body as UpdateVehicleDTO;

            const useCase = VehicleUseCaseFactory.updateVehicleUseCase();
            const response = await useCase.execute({ vehicleId, updateData });

            ApiResponseHandler.success(res, response, 200);
        } catch (error) {
            console.error('Error updating vehicle:', error);
            ApiResponseHandler.error(res, error as Error);
        }
    }

    static async getAvailableVehicles(req: Request, res: Response) {
        // Implement your logic to get available vehicles
    }

    static async getSoldVehicles(req: Request, res: Response) {
        // Implement your logic to get sold vehicles
    }
}