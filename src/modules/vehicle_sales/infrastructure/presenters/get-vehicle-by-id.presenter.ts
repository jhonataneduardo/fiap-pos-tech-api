import { OutputVehicleDTO } from "@/modules/vehicle_sales/application/dtos/vehicle.dto";

/**
 * GetVehicleByIdPresenter
 *
 * Responsável por formatar a saída do caso de uso GetVehicleByIdUseCase
 * para uma representação adequada à camada de apresentação (API/HTTP).
 */
export class GetVehicleByIdPresenter {
    /**
     * Formata o resultado do use case para view model HTTP
     */
    static present(vehicle: OutputVehicleDTO) {
        return {
            id: vehicle.id,
            model: vehicle.model,
            brand: vehicle.brand,
            year: vehicle.year,
            price: vehicle.price,
            color: vehicle.color,
            created_at: vehicle.created_at,
            updated_at: vehicle.updated_at,
        };
    }
}
