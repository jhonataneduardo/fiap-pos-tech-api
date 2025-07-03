import { v7 as uuidv7 } from 'uuid';

import { BaseEntity, BaseEntityProps } from "@/core/domain/entities/base.entity";
import { SaleStatus } from './enums';

export interface SaleEntityProps extends BaseEntityProps {
    vehicleId: string
    customerId: string
    saleDate: Date
    paymentCode: string
    totalPrice: number
    status: SaleStatus
}

export class SaleEntity extends BaseEntity {
    public vehicleId: string;
    public customerId: string;
    public saleDate: Date;
    public paymentCode: string;
    public totalPrice: number;
    public status: SaleStatus;

    constructor(props: SaleEntityProps) {
        super(props);
        this.vehicleId = props.vehicleId;
        this.customerId = props.customerId;
        this.saleDate = props.saleDate;
        this.paymentCode = props.paymentCode;
        this.totalPrice = props.totalPrice;
        this.status = props.status;
    }
}

export class SaleEntityFactory {
    static create(props: Omit<SaleEntityProps, 'id'>): SaleEntity {
        const id = uuidv7();
        return new SaleEntity({ ...props, id });
    }
}