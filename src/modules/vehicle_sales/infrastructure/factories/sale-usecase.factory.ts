import { saleRepository, vehicleRepository, customerRepository } from "@/core/infrastructure/di/dependencies";
import { RegisterNewSaleUseCase } from "../../application/usecases/sale/register-new-sale.usecase";

export const SaleUseCaseFactory = {
    registerNewSaleUseCase: () => new RegisterNewSaleUseCase(saleRepository, vehicleRepository, customerRepository)
}
