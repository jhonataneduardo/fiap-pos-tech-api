import { UseCaseInterface } from "@/core/application/use-case.interface";

import { VehicleRepositoryInterface } from "@/modules/vehicle_sales/domain/repositories/vehicle-respository.interface";
import { OutputVehicleDTO } from "@/modules/vehicle_sales/application/dtos/vehicle.dto";

export class ListAllVehiclesUseCase implements UseCaseInterface<void, OutputVehicleDTO[]> {
    constructor(private readonly vehicleRepository: VehicleRepositoryInterface) { }

    async execute(): Promise<OutputVehicleDTO[]> {
        const vehicles = await this.vehicleRepository.getAllVehicles();

        return vehicles.map(vehicle => ({
            id: vehicle.id,
            model: vehicle.model,
            brand: vehicle.brand,
            year: vehicle.year,
            price: vehicle.price,
            color: vehicle.color,
            created_at: vehicle.createdAt,
            updated_at: vehicle.updatedAt,
        } as OutputVehicleDTO));
    }
}
