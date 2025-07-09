import { CustomerEntity } from "../entities/customer.entity";

export interface CustomerRepositoryInterface {
    createCustomer(customer: CustomerEntity, txContext?: unknown): Promise<CustomerEntity>;
    getCustomerByNationalId(nationalId: string, txContext?: unknown): Promise<CustomerEntity | null>;
}