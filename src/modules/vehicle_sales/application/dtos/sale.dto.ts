export interface InputSaleDTO {
    vehicle_id: string;
    customer_national_id: string;
}

export interface OutputSaleDTO {
    id: string;
    vehicle_id: string;
    customer_id: string;
    sale_date: Date;
    payment_code: string;
    total_price: number;
    status: string;
    created_at: Date;
    updated_at: Date;
}
