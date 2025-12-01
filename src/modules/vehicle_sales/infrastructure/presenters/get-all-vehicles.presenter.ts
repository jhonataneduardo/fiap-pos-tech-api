import { OutputVehicleDTO } from "@/modules/vehicle_sales/application/dtos/vehicle.dto";

/**
 * GetAllVehiclesPresenter
 *
 * Responsável por formatar a saída do caso de uso GetAllVehiclesUseCase
 * para uma representação adequada à camada de apresentação (API/HTTP).
 */
export class GetAllVehiclesPresenter {
    /**
     * Formata o resultado do use case para view model HTTP
     */
    static present(vehicles: OutputVehicleDTO[]) {
        return vehicles.map(vehicle => ({
            id: vehicle.id,
            model: vehicle.model,
            brand: vehicle.brand,
            year: vehicle.year,
            price: vehicle.price,
            color: vehicle.color,
            created_at: vehicle.created_at,
            updated_at: vehicle.updated_at,
        }));
    }
}
