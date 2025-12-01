import { v7 as uuidv7 } from 'uuid';

import { BaseEntity, BaseEntityProps } from "@/core/domain/entities/base.entity";

export interface VehicleEntityProps extends BaseEntityProps {
    brand: string
    model: string
    year: number
    color: string
    price: number
}

export class VehicleEntity extends BaseEntity {
    public brand: string;
    public model: string;
    public year: number;
    public color: string;
    public price: number;

    constructor(props: VehicleEntityProps) {
        super(props);
        this.brand = props.brand;
        this.model = props.model;
        this.year = props.year;
        this.color = props.color;
        this.price = props.price;
    }
}

export class VehicleEntityFactory {
    static create(props: Omit<VehicleEntityProps, 'id'>): VehicleEntity {
        const id = uuidv7();
        return new VehicleEntity({ ...props, id });
    }
}