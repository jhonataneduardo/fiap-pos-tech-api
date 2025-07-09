import { SaleEntity } from "../entities/sale.entity";

export interface SaleRepositoryInterface {
  createSale(sale: SaleEntity): Promise<SaleEntity>;
  getSaleById(saleId: string): Promise<SaleEntity>;
  updateSale(saleId: string, saleData: SaleEntity): Promise<SaleEntity>;
}