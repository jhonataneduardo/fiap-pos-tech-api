import { UseCaseInterface } from "@/core/application/use-case.interface";

import { VehicleRepositoryInterface } from "@/modules/vehicles/domain/repositories/vehicle-respository.interface";
import { InputVehicleDTO, OutputVehicleDTO } from "@/modules/vehicles/application/dtos/vehicle.dto";
import { VehicleEntityFactory } from "@/modules/vehicles/domain/entities/vehicle.entity";

export class RegisterNewVehicleUseCase implements UseCaseInterface<InputVehicleDTO, OutputVehicleDTO> {
    constructor(private readonly vehicleRepository: VehicleRepositoryInterface) { }

    async execute(request: InputVehicleDTO): Promise<OutputVehicleDTO> {
        const dateNow = new Date();

        const vehicle = await this.vehicleRepository.createVehicle(VehicleEntityFactory.create({
            model: request.model,
            brand: request.brand,
            year: request.year,
            price: request.price,
            color: request.color,
            createdAt: dateNow,
            updatedAt: dateNow,
        }));

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