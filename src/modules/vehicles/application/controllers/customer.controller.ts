import { RegisterNewCustomerUseCase } from "../usecases/customer/register-new-customer.usecase";
import { ListAllCustomersUseCase } from "../usecases/customer/list-all-customers.usecase";
import { InputCustomerDTO, CustomerQueryFiltersDTO } from "../dtos/customer.dto";
import { RegisterCustomerPresenter } from "@/modules/vehicles/infrastructure/presenters/register-customer.presenter";
import { ListCustomersPresenter } from "@/modules/vehicles/infrastructure/presenters/list-customers.presenter";

/**
 * CustomerController (Clean Architecture)
 *
 * Controller da camada de aplicação que orquestra use cases e presenters.
 * NÃO conhece detalhes de HTTP (Request/Response).
 * Recebe dados já parseados e retorna view models formatados.
 */
export class CustomerController {
    constructor(
        private readonly registerNewCustomerUseCase: RegisterNewCustomerUseCase,
        private readonly listAllCustomersUseCase: ListAllCustomersUseCase
    ) {}

    /**
     * Registra um novo customer
     */
    async registerCustomer(input: InputCustomerDTO) {
        const customer = await this.registerNewCustomerUseCase.execute(input);
        return RegisterCustomerPresenter.present(customer);
    }

    /**
     * Lista todos os customers (com filtros opcionais)
     */
    async listAllCustomers(filters?: CustomerQueryFiltersDTO) {
        const customers = await this.listAllCustomersUseCase.execute(filters);
        return ListCustomersPresenter.present(customers);
    }
}
