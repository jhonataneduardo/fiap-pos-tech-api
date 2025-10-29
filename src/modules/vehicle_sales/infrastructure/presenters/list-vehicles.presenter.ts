import { OutputVehicleDTO } from "@/modules/vehicle_sales/application/dtos/vehicle.dto";

/**
 * ListVehiclesPresenter
 *
 * Responsável por formatar a saída do caso de uso ListAllVehiclesUseCase
 * para uma representação adequada à camada de apresentação (API/HTTP).
 * Garante que apenas dados relevantes sejam expostos, sem vazar detalhes do domínio.
 */
export class ListVehiclesPresenter {
    /**
     * Formata o resultado do use case (array de vehicles) para view model HTTP
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
