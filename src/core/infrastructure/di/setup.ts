import { container } from "./container";

// Repositories
import { PrismaCustomerRepository } from "@/modules/vehicle_sales/infrastructure/database/repositories/customer.repository";
import { PrismaVehicleRepository } from "@/modules/vehicle_sales/infrastructure/database/repositories/vehicle.repository";
import { PrismaSaleRepository } from "@/modules/vehicle_sales/infrastructure/database/repositories/sale.repository";

// Use Cases
import { RegisterNewCustomerUseCase } from "@/modules/vehicle_sales/application/usecases/customer/register-new-customer.usecase";
import { ListAllCustomersUseCase } from "@/modules/vehicle_sales/application/usecases/customer/list-all-customers.usecase";
import { RegisterNewVehicleUseCase } from "@/modules/vehicle_sales/application/usecases/vehicle/register-new-vehicle.usecase";
import { UpdateVehicleUseCase } from "@/modules/vehicle_sales/application/usecases/vehicle/update-vehicle.usecase";
import { RegisterNewSaleUseCase } from "@/modules/vehicle_sales/application/usecases/sale/register-new-sale.usecase";
import { UpdatePaymentStatusUseCase } from "@/modules/vehicle_sales/application/usecases/sale/update-payment-status.usecase";

/**
 * setupDependencies
 *
 * Configura e registra todas as dependências no container DI.
 * Deve ser chamado no início da aplicação, antes de qualquer resolução de dependência.
 */
export function setupDependencies(): void {
    // ==========================================
    // REPOSITORIES (Singleton - compartilhados)
    // ==========================================
    container.registerSingleton('CustomerRepository', PrismaCustomerRepository);
    container.registerSingleton('VehicleRepository', PrismaVehicleRepository);
    container.registerSingleton('SaleRepository', PrismaSaleRepository);

    // ==========================================
    // USE CASES (Factory - nova instância com dependências injetadas)
    // ==========================================

    // Customer Use Cases
    container.registerFactory('RegisterNewCustomerUseCase', () => {
        const customerRepository = container.resolve<PrismaCustomerRepository>('CustomerRepository');
        return new RegisterNewCustomerUseCase(customerRepository);
    });

    container.registerFactory('ListAllCustomersUseCase', () => {
        const customerRepository = container.resolve<PrismaCustomerRepository>('CustomerRepository');
        return new ListAllCustomersUseCase(customerRepository);
    });

    // Vehicle Use Cases
    container.registerFactory('RegisterNewVehicleUseCase', () => {
        const vehicleRepository = container.resolve<PrismaVehicleRepository>('VehicleRepository');
        return new RegisterNewVehicleUseCase(vehicleRepository);
    });

    container.registerFactory('UpdateVehicleUseCase', () => {
        const vehicleRepository = container.resolve<PrismaVehicleRepository>('VehicleRepository');
        return new UpdateVehicleUseCase(vehicleRepository);
    });

    // Sale Use Cases
    container.registerFactory('RegisterNewSaleUseCase', () => {
        const saleRepository = container.resolve<PrismaSaleRepository>('SaleRepository');
        const vehicleRepository = container.resolve<PrismaVehicleRepository>('VehicleRepository');
        const customerRepository = container.resolve<PrismaCustomerRepository>('CustomerRepository');
        return new RegisterNewSaleUseCase(saleRepository, vehicleRepository, customerRepository);
    });

    container.registerFactory('UpdatePaymentStatusUseCase', () => {
        const saleRepository = container.resolve<PrismaSaleRepository>('SaleRepository');
        return new UpdatePaymentStatusUseCase(saleRepository);
    });

    // ==========================================
    // CONTROLLERS (Clean Architecture - Application Layer)
    // ==========================================
    container.registerFactory('CustomerController', () => {
        const registerNewCustomerUseCase = container.resolve('RegisterNewCustomerUseCase');
        const listAllCustomersUseCase = container.resolve('ListAllCustomersUseCase');
        const { CustomerController } = require('@/modules/vehicle_sales/application/controllers/customer.controller');
        return new CustomerController(registerNewCustomerUseCase, listAllCustomersUseCase);
    });

    container.registerFactory('VehicleController', () => {
        const registerNewVehicleUseCase = container.resolve('RegisterNewVehicleUseCase');
        const updateVehicleUseCase = container.resolve('UpdateVehicleUseCase');
        const { VehicleController } = require('@/modules/vehicle_sales/application/controllers/vehicle.controller');
        return new VehicleController(
            registerNewVehicleUseCase,
            updateVehicleUseCase
        );
    });

    container.registerFactory('SaleController', () => {
        const registerNewSaleUseCase = container.resolve('RegisterNewSaleUseCase');
        const updatePaymentStatusUseCase = container.resolve('UpdatePaymentStatusUseCase');
        const { SaleController } = require('@/modules/vehicle_sales/application/controllers/sale.controller');
        return new SaleController(registerNewSaleUseCase, updatePaymentStatusUseCase);
    });
}
