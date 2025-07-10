import { SaleEntity } from "../entities/sale.entity";

export interface SaleWithVehicleData {
  sale: SaleEntity;
  vehicle: {
    id: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    price: number;
  };
}

export interface SaleRepositoryInterface {
  createSale(sale: SaleEntity): Promise<SaleEntity>;
  getSaleById(saleId: string): Promise<SaleEntity>;
  updateSale(saleId: string, saleData: SaleEntity): Promise<SaleEntity>;
  getSalesWithVehicles(txContext?: unknown): Promise<SaleWithVehicleData[]>;
}