import { UseCaseInterface } from "@/core/application/use-case.interface";
import { NotFoundError } from "@/core/application/errors/app.error";

import { CustomerRepositoryInterface } from "@/modules/vehicle_sales/domain/repositories/customer-respository.interface";
import { CustomerEntityFactory } from "@/modules/vehicle_sales/domain/entities/customer.entity";
import { InputCustomerDTO, OutputCustomerDTO } from "../../dtos/customer.dto";
import { CustomerStatus } from "@/modules/vehicle_sales/domain/entities/enums";

export class RegisterNewCustomerUseCase implements UseCaseInterface<InputCustomerDTO, OutputCustomerDTO> {
    constructor(private readonly customerRepository: CustomerRepositoryInterface) { }

    async execute(request: InputCustomerDTO): Promise<OutputCustomerDTO> {
        const existingCustomer = await this.customerRepository.getCustomerByNationalId(request.national_id);
        if (existingCustomer) {
            throw new NotFoundError(`Customer with national ID ${request.national_id} already exists.`);
        }

        const newCustomer = await this.customerRepository.createCustomer(CustomerEntityFactory.create({
            name: request.name,
            email: request.email,
            nationalId: request.national_id,
            status: request.status as CustomerStatus,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        return {
            id: newCustomer.id,
            name: newCustomer.name,
            email: newCustomer.email,
            national_id: newCustomer.nationalId,
            status: newCustomer.status,
            created_at: newCustomer.createdAt,
            updated_at: newCustomer.updatedAt,
        };
    }
}