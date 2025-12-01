import { CustomerEntity } from "../entities/customer.entity";

export interface CustomerFilters {
    national_id?: string;
}

export interface CustomerRepositoryInterface {
    createCustomer(customer: CustomerEntity, txContext?: unknown): Promise<CustomerEntity>;
    getCustomerByNationalId(nationalId: string, txContext?: unknown): Promise<CustomerEntity | null>;
    getAllCustomers(filters?: CustomerFilters, txContext?: unknown): Promise<CustomerEntity[]>;
}