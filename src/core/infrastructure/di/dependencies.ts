import { PrismaCustomerRepository } from "@/modules/vehicle_sales/infrastructure/database/repositories/customer.repository";
import { PrismaVehicleRepository } from "@/modules/vehicle_sales/infrastructure/database/repositories/vehicle.repository";
import { PrismaSaleRepository } from "@/modules/vehicle_sales/infrastructure/database/repositories/sale.repository";

export const customerRepository = new PrismaCustomerRepository();
export const vehicleRepository = new PrismaVehicleRepository();
export const saleRepository = new PrismaSaleRepository();