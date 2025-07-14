import { customerRepository } from "@/core/infrastructure/di/dependencies";
import { RegisterNewCustomerUseCase } from "../../application/usecases/customer/register-new-customer.usecase";
import { ListAllCustomersUseCase } from "../../application/usecases/customer/list-all-customers.usecase";

export const CustomerUseCaseFactory = {
    registerNewCustomerUseCase: () => new RegisterNewCustomerUseCase(customerRepository),
    listAllCustomersUseCase: () => new ListAllCustomersUseCase(customerRepository)
}