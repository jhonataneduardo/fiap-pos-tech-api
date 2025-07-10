import { UseCaseInterface } from "@/core/application/use-case.interface";

import { SaleRepositoryInterface } from "@/modules/vehicle_sales/domain/repositories/sale-respository.interface";
import { SoldVehicleDTO } from "@/modules/vehicle_sales/application/dtos/sale.dto";

export class FindSoldVehiclesUseCase implements UseCaseInterface<void, SoldVehicleDTO[]> {
    constructor(private readonly saleRepository: SaleRepositoryInterface) { }

    async execute(): Promise<SoldVehicleDTO[]> {
        const salesWithVehicles = await this.saleRepository.getSalesWithVehicles();

        return salesWithVehicles.map(saleWithVehicle => ({
            sale_id: saleWithVehicle.sale.id,
            vehicle_id: saleWithVehicle.vehicle.id,
            vehicle_brand: saleWithVehicle.vehicle.brand,
            vehicle_model: saleWithVehicle.vehicle.model,
            vehicle_year: saleWithVehicle.vehicle.year,
            vehicle_color: saleWithVehicle.vehicle.color,
            vehicle_price: saleWithVehicle.vehicle.price,
            sale_date: saleWithVehicle.sale.saleDate,
            sale_total_price: saleWithVehicle.sale.totalPrice,
            payment_code: saleWithVehicle.sale.paymentCode,
            sale_status: saleWithVehicle.sale.status,
        } as SoldVehicleDTO));
    }
}