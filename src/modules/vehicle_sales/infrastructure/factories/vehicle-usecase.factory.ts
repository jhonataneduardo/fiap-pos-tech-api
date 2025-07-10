import { vehicleRepository, saleRepository } from "@/core/infrastructure/di/dependencies";
import { RegisterNewVehicleUseCase } from "../../application/usecases/vehicle/register-new-vehicle.usecase";
import { ListAllVehiclesUseCase } from "../../application/usecases/vehicle/list-all-vehicles.usecase";
import { UpdateVehicleUseCase } from "../../application/usecases/vehicle/update-vehicle.usecase";
import { FindSoldVehiclesUseCase } from "../../application/usecases/vehicle/find-sold-vehicles.usecase";

export const VehicleUseCaseFactory = {
    registerNewVehicleUseCase: () => new RegisterNewVehicleUseCase(vehicleRepository),
    listAllVehiclesUseCase: () => new ListAllVehiclesUseCase(vehicleRepository),
    updateVehicleUseCase: () => new UpdateVehicleUseCase(vehicleRepository),
    findSoldVehiclesUseCase: () => new FindSoldVehiclesUseCase(saleRepository)
}