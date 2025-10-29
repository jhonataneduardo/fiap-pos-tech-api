import { RegisterNewVehicleUseCase } from "../usecases/vehicle/register-new-vehicle.usecase";
import { ListAllVehiclesUseCase } from "../usecases/vehicle/list-all-vehicles.usecase";
import { UpdateVehicleUseCase } from "../usecases/vehicle/update-vehicle.usecase";
import { FindAvailableVehiclesUseCase } from "../usecases/vehicle/find-available-vehicles.usecase";
import { FindSoldVehiclesUseCase } from "../usecases/vehicle/find-sold-vehicles.usecase";
import { InputVehicleDTO, UpdateVehicleDTO } from "../dtos/vehicle.dto";
import { RegisterVehiclePresenter } from "@/modules/vehicle_sales/infrastructure/presenters/register-vehicle.presenter";
import { ListVehiclesPresenter } from "@/modules/vehicle_sales/infrastructure/presenters/list-vehicles.presenter";
import { UpdateVehiclePresenter } from "@/modules/vehicle_sales/infrastructure/presenters/update-vehicle.presenter";
import { AvailableVehiclesPresenter } from "@/modules/vehicle_sales/infrastructure/presenters/available-vehicles.presenter";
import { SoldVehiclesPresenter } from "@/modules/vehicle_sales/infrastructure/presenters/sold-vehicles.presenter";

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
        private readonly listAllVehiclesUseCase: ListAllVehiclesUseCase,
        private readonly updateVehicleUseCase: UpdateVehicleUseCase,
        private readonly findAvailableVehiclesUseCase: FindAvailableVehiclesUseCase,
        private readonly findSoldVehiclesUseCase: FindSoldVehiclesUseCase
    ) {}

    /**
     * Registra um novo vehicle
     */
    async registerVehicle(input: InputVehicleDTO) {
        const vehicle = await this.registerNewVehicleUseCase.execute(input);
        return RegisterVehiclePresenter.present(vehicle);
    }

    /**
     * Lista todos os vehicles
     */
    async listAllVehicles() {
        const vehicles = await this.listAllVehiclesUseCase.execute();
        return ListVehiclesPresenter.present(vehicles);
    }

    /**
     * Atualiza um vehicle existente
     */
    async updateVehicle(vehicleId: string, updateData: UpdateVehicleDTO) {
        const vehicle = await this.updateVehicleUseCase.execute({ vehicleId, updateData });
        return UpdateVehiclePresenter.present(vehicle);
    }

    /**
     * Lista vehicles disponíveis (sem vendas)
     */
    async listAvailableVehicles() {
        const vehicles = await this.findAvailableVehiclesUseCase.execute();
        return AvailableVehiclesPresenter.present(vehicles);
    }

    /**
     * Lista vehicles vendidos (com informações de venda)
     */
    async listSoldVehicles() {
        const soldVehicles = await this.findSoldVehiclesUseCase.execute();
        return SoldVehiclesPresenter.present(soldVehicles);
    }
}
