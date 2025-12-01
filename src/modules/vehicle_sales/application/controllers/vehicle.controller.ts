import { RegisterNewVehicleUseCase } from "../usecases/vehicle/register-new-vehicle.usecase";
import { UpdateVehicleUseCase } from "../usecases/vehicle/update-vehicle.usecase";
import { GetVehicleByIdUseCase } from "../usecases/vehicle/get-vehicle-by-id.usecase";
import { InputVehicleDTO, UpdateVehicleDTO } from "../dtos/vehicle.dto";
import { RegisterVehiclePresenter } from "@/modules/vehicle_sales/infrastructure/presenters/register-vehicle.presenter";
import { UpdateVehiclePresenter } from "@/modules/vehicle_sales/infrastructure/presenters/update-vehicle.presenter";
import { GetVehicleByIdPresenter } from "@/modules/vehicle_sales/infrastructure/presenters/get-vehicle-by-id.presenter";

/**
 * VehicleController (Clean Architecture)
 *
 * Controller da camada de aplicação que orquestra use cases e presenters.
 * NÃO conhece detalhes de HTTP (Request/Response).
 * Recebe dados já parseados e retorna view models formatados.
 */
export class VehicleController {
    constructor(
        private readonly registerNewVehicleUseCase: RegisterNewVehicleUseCase,
        private readonly updateVehicleUseCase: UpdateVehicleUseCase,
        private readonly getVehicleByIdUseCase: GetVehicleByIdUseCase
    ) { }

    /**
     * Registra um novo vehicle
     */
    async registerVehicle(input: InputVehicleDTO) {
        const vehicle = await this.registerNewVehicleUseCase.execute(input);
        return RegisterVehiclePresenter.present(vehicle);
    }

    /**
     * Atualiza um vehicle existente
     */
    async updateVehicle(vehicleId: string, updateData: UpdateVehicleDTO) {
        const vehicle = await this.updateVehicleUseCase.execute({ vehicleId, updateData });
        return UpdateVehiclePresenter.present(vehicle);
    }

    /**
     * Busca um vehicle por ID
     */
    async getVehicleById(vehicleId: string) {
        const vehicle = await this.getVehicleByIdUseCase.execute(vehicleId);
        return GetVehicleByIdPresenter.present(vehicle);
    }
}
