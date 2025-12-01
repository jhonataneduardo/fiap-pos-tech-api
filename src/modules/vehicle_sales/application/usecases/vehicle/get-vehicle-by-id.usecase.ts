import { UseCaseInterface } from "@/core/application/use-case.interface";
import { NotFoundError } from "@/core/application/errors/app.error";

import { VehicleRepositoryInterface } from "@/modules/vehicle_sales/domain/repositories/vehicle-respository.interface";
import { OutputVehicleDTO } from "@/modules/vehicle_sales/application/dtos/vehicle.dto";

export class GetVehicleByIdUseCase implements UseCaseInterface<string, OutputVehicleDTO> {
    constructor(
        private readonly vehicleRepository: VehicleRepositoryInterface
    ) { }

    async execute(vehicleId: string): Promise<OutputVehicleDTO> {
        const vehicle = await this.vehicleRepository.getVehicleById(vehicleId);
        
        if (!vehicle) {
            throw new NotFoundError(`Vehicle with ID ${vehicleId} not found.`);
        }

        return {
            id: vehicle.id,
            model: vehicle.model,
            brand: vehicle.brand,
            year: vehicle.year,
            price: vehicle.price,
            color: vehicle.color,
            created_at: vehicle.createdAt,
            updated_at: vehicle.updatedAt,
        } as OutputVehicleDTO;
    }
}
