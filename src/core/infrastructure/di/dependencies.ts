import { PrismaCustomerRepository } from "@/modules/vehicle_sales/infrastructure/database/repositories/customer.repository";
import { PrismaVehicleRepository } from "@/modules/vehicle_sales/infrastructure/database/repositories/vehicle.repository";

export const customerRepository = new PrismaCustomerRepository();
export const vehicleRepository = new PrismaVehicleRepository();