import { UseCaseInterface } from "@/core/application/use-case.interface";

import { CustomerRepositoryInterface } from "@/modules/vehicle_sales/domain/repositories/customer-respository.interface";
import { OutputCustomerDTO } from "@/modules/vehicle_sales/application/dtos/customer.dto";

export class ListAllCustomersUseCase implements UseCaseInterface<void, OutputCustomerDTO[]> {
    constructor(private readonly customerRepository: CustomerRepositoryInterface) { }

    async execute(): Promise<OutputCustomerDTO[]> {
        const customers = await this.customerRepository.getAllCustomers();

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
