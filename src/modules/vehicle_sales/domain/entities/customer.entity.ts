import { v7 as uuidv7 } from 'uuid';

import { BaseEntity, BaseEntityProps } from "@/core/domain/entities/base.entity";
import { CustomerStatus } from './enums';

export interface CustomerEntityProps extends BaseEntityProps {
    name: string
    email: string
    nationalId: string
    status: CustomerStatus
}

export class CustomerEntity extends BaseEntity {
    public name: string;
    public email: string;
    public nationalId: string;
    public status: CustomerStatus;

    constructor(props: CustomerEntityProps) {
        super(props);
        this.name = props.name;
        this.email = props.email;
        this.nationalId = props.nationalId;
        this.status = props.status;
    }
}

export class CustomerEntityFactory {
    static create(props: Omit<CustomerEntityProps, 'id'>): CustomerEntity {
        const id = uuidv7();
        return new CustomerEntity({ ...props, id });
    }
}