export interface InputVehicleDTO {
    model: string;
    brand: string;
    year: number;
    price: number;
    color: string;
}

export interface UpdateVehicleDTO {
    model?: string;
    brand?: string;
    year?: number;
    price?: number;
    color?: string;
}

export interface OutputVehicleDTO {
    id: string;
    model: string;
    brand: string;
    year: number;
    price: number;
    color: string;
    created_at: Date;
    updated_at: Date;
}