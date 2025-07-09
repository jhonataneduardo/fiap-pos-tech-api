import { customerRepository } from "@/core/infrastructure/di/dependencies";
import { RegisterNewCustomerUseCase } from "../../application/usecases/customer/register-new-customer.usecase";

export const CustomerUseCaseFactory = {
    registerNewCustomerUseCase: () => new RegisterNewCustomerUseCase(customerRepository)
}