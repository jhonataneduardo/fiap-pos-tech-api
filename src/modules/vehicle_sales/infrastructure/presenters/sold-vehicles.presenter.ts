import { SoldVehicleDTO } from "@/modules/vehicle_sales/application/dtos/sale.dto";

/**
 * SoldVehiclesPresenter
 *
 * Responsável por formatar a saída do caso de uso FindSoldVehiclesUseCase
 * para uma representação adequada à camada de apresentação (API/HTTP).
 * Garante que apenas dados relevantes sejam expostos, sem vazar detalhes do domínio.
 */
export class SoldVehiclesPresenter {
    /**
     * Formata o resultado do use case (array de veículos vendidos) para view model HTTP
     */
    static present(soldVehicles: SoldVehicleDTO[]) {
        return soldVehicles.map(soldVehicle => ({
            sale_id: soldVehicle.sale_id,
            vehicle_id: soldVehicle.vehicle_id,
            vehicle_brand: soldVehicle.vehicle_brand,
            vehicle_model: soldVehicle.vehicle_model,
            vehicle_year: soldVehicle.vehicle_year,
            vehicle_color: soldVehicle.vehicle_color,
            vehicle_price: soldVehicle.vehicle_price,
            sale_date: soldVehicle.sale_date,
            sale_total_price: soldVehicle.sale_total_price,
            payment_code: soldVehicle.payment_code,
            sale_status: soldVehicle.sale_status,
        }));
    }
}
