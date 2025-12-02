import { OutputCustomerDTO } from "@/modules/vehicles/application/dtos/customer.dto";

/**
 * RegisterCustomerPresenter
 *
 * Responsável por formatar a saída do caso de uso RegisterNewCustomerUseCase
 * para uma representação adequada à camada de apresentação (API/HTTP).
 * Garante que apenas dados relevantes sejam expostos, sem vazar detalhes do domínio.
 */
export class RegisterCustomerPresenter {
    /**
     * Formata o resultado do use case para view model HTTP
     */
    static present(customer: OutputCustomerDTO) {
        return {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            national_id: customer.national_id,
            status: customer.status,
            created_at: customer.created_at,
            updated_at: customer.updated_at,
        };
    }
}
