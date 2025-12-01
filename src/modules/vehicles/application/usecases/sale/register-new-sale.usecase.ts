import { UseCaseInterface } from "@/core/application/use-case.interface";
import { NotFoundError } from "@/core/application/errors/app.error";

import { SaleRepositoryInterface } from "@/modules/vehicles/domain/repositories/sale-respository.interface";
import { VehicleRepositoryInterface } from "@/modules/vehicles/domain/repositories/vehicle-respository.interface";
import { CustomerRepositoryInterface } from "@/modules/vehicles/domain/repositories/customer-respository.interface";
import { InputSaleDTO, OutputSaleDTO } from "@/modules/vehicles/application/dtos/sale.dto";
import { SaleEntityFactory } from "@/modules/vehicles/domain/entities/sale.entity";
import { SaleStatus } from "@/modules/vehicles/domain/entities/enums";

export class RegisterNewSaleUseCase implements UseCaseInterface<InputSaleDTO, OutputSaleDTO> {
    constructor(
        private readonly saleRepository: SaleRepositoryInterface,
        private readonly vehicleRepository: VehicleRepositoryInterface,
        private readonly customerRepository: CustomerRepositoryInterface
    ) { }

    async execute(request: InputSaleDTO): Promise<OutputSaleDTO> {
        const customer = await this.customerRepository.getCustomerByNationalId(request.customer_national_id);
        if (!customer) {
            throw new NotFoundError(`Customer with national ID ${request.customer_national_id} not found.`);
        }

        const vehicle = await this.vehicleRepository.getVehicleById(request.vehicle_id);
        if (!vehicle) {
            throw new NotFoundError(`Vehicle with ID ${request.vehicle_id} not found.`);
        }

        const dateNow = new Date();
        
        const newSale = await this.saleRepository.createSale(SaleEntityFactory.create({
            vehicleId: request.vehicle_id,
            customerId: customer.id,
            saleDate: dateNow,
            totalPrice: vehicle.price,
            status: SaleStatus.PENDING,
            createdAt: dateNow,
            updatedAt: dateNow,
        }));

        return {
            id: newSale.id,
            vehicle_id: newSale.vehicleId,
            customer_id: newSale.customerId,
            sale_date: newSale.saleDate,
            payment_code: newSale.paymentCode,
            total_price: newSale.totalPrice,
            status: newSale.status,
            created_at: newSale.createdAt,
            updated_at: newSale.updatedAt,
        } as OutputSaleDTO;
    }
}