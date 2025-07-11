import { saleRepository, vehicleRepository, customerRepository } from "@/core/infrastructure/di/dependencies";
import { RegisterNewSaleUseCase } from "../../application/usecases/sale/register-new-sale.usecase";
import { UpdatePaymentStatusUseCase } from "../../application/usecases/sale/update-payment-status.usecase";

export const SaleUseCaseFactory = {
    registerNewSaleUseCase: () => new RegisterNewSaleUseCase(saleRepository, vehicleRepository, customerRepository),
    updatePaymentStatusUseCase: () => new UpdatePaymentStatusUseCase(saleRepository)
}
