import { CustomerStatus } from "../../domain/entities/enums";

export interface InputCustomerDTO {
    name: string;
    email: string;
    national_id: string;
    status: string;
}

export interface OutputCustomerDTO {
    id: string;
    name: string;
    email: string;
    national_id: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}