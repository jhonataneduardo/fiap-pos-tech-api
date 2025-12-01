import { OutputCustomerDTO } from "@/modules/vehicles/application/dtos/customer.dto";

/**
 * ListCustomersPresenter
 *
 * Responsável por formatar a saída do caso de uso ListAllCustomersUseCase
 * para uma representação adequada à camada de apresentação (API/HTTP).
 * Garante que apenas dados relevantes sejam expostos, sem vazar detalhes do domínio.
 */
export class ListCustomersPresenter {
    /**
     * Formata o resultado do use case (array de customers) para view model HTTP
     */
    static present(customers: OutputCustomerDTO[]) {
        return customers.map(customer => ({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            national_id: customer.national_id,
            status: customer.status,
            created_at: customer.created_at,
            updated_at: customer.updated_at,
        }));
    }
}
