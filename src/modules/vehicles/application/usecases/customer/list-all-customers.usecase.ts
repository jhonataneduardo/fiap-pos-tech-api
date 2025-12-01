import { UseCaseInterface } from "@/core/application/use-case.interface";

import { CustomerRepositoryInterface } from "@/modules/vehicles/domain/repositories/customer-respository.interface";
import { OutputCustomerDTO, CustomerQueryFiltersDTO } from "@/modules/vehicles/application/dtos/customer.dto";

export class ListAllCustomersUseCase implements UseCaseInterface<CustomerQueryFiltersDTO | undefined, OutputCustomerDTO[]> {
    constructor(private readonly customerRepository: CustomerRepositoryInterface) { }

    async execute(filters?: CustomerQueryFiltersDTO): Promise<OutputCustomerDTO[]> {
        // Converter o DTO de filtros para o formato do repositório
        const repositoryFilters = filters ? {
            national_id: filters.national_id
        } : undefined;

        const customers = await this.customerRepository.getAllCustomers(repositoryFilters);

        return customers.map(customer => ({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            national_id: customer.nationalId,
            status: customer.status,
            created_at: customer.createdAt,
            updated_at: customer.updatedAt,
        } as OutputCustomerDTO));
    }
}
