import { UseCaseInterface } from "@/core/application/use-case.interface";
import { BadRequestError, NotFoundError } from "@/core/application/errors/app.error";

import { VehicleRepositoryInterface } from "@/modules/vehicles/domain/repositories/vehicle-respository.interface";
import { UpdateVehicleDTO, OutputVehicleDTO } from "@/modules/vehicles/application/dtos/vehicle.dto";

export interface UpdateVehicleRequest {
    vehicleId: string;
    updateData: UpdateVehicleDTO;
}

export class UpdateVehicleUseCase implements UseCaseInterface<UpdateVehicleRequest, OutputVehicleDTO> {
    constructor(private readonly vehicleRepository: VehicleRepositoryInterface) { }

    async execute(request: UpdateVehicleRequest): Promise<OutputVehicleDTO> {
        const { vehicleId, updateData } = request;

        // Verificar se o veículo existe
        const existingVehicle = await this.vehicleRepository.getVehicleById(vehicleId);
        if (!existingVehicle) {
            throw new NotFoundError(`Vehicle with ID ${vehicleId} not found.`);
        }

        // Verificar se há pelo menos um campo para atualizar
        const hasDataToUpdate = Object.keys(updateData).some(key => 
            updateData[key as keyof UpdateVehicleDTO] !== undefined
        );

        if (!hasDataToUpdate) {
            throw new BadRequestError("No data provided for update.");
        }

        // Atualizar o veículo
        const updatedVehicle = await this.vehicleRepository.updateVehiclePartial(vehicleId, {
            model: updateData.model,
            brand: updateData.brand,
            year: updateData.year,
            price: updateData.price,
            color: updateData.color,
        });

        return {
            id: updatedVehicle.id,
            model: updatedVehicle.model,
            brand: updatedVehicle.brand,
            year: updatedVehicle.year,
            price: updatedVehicle.price,
            color: updatedVehicle.color,
            created_at: updatedVehicle.createdAt,
            updated_at: updatedVehicle.updatedAt,
        } as OutputVehicleDTO;
    }
}