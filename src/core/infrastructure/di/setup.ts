import { container } from "./container";

// Repositories
import { PrismaCustomerRepository } from "@/modules/vehicles/infrastructure/database/repositories/customer.repository";
import { PrismaVehicleRepository } from "@/modules/vehicles/infrastructure/database/repositories/vehicle.repository";

// Use Cases
import { RegisterNewCustomerUseCase } from "@/modules/vehicles/application/usecases/customer/register-new-customer.usecase";
import { ListAllCustomersUseCase } from "@/modules/vehicles/application/usecases/customer/list-all-customers.usecase";
import { RegisterNewVehicleUseCase } from "@/modules/vehicles/application/usecases/vehicle/register-new-vehicle.usecase";
import { UpdateVehicleUseCase } from "@/modules/vehicles/application/usecases/vehicle/update-vehicle.usecase";
import { GetVehicleByIdUseCase } from "@/modules/vehicles/application/usecases/vehicle/get-vehicle-by-id.usecase";
import { GetAllVehiclesUseCase } from "@/modules/vehicles/application/usecases/vehicle/get-all-vehicles.usecase";

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

    container.registerFactory('GetVehicleByIdUseCase', () => {
        const vehicleRepository = container.resolve<PrismaVehicleRepository>('VehicleRepository');
        return new GetVehicleByIdUseCase(vehicleRepository);
    });

    container.registerFactory('GetAllVehiclesUseCase', () => {
        const vehicleRepository = container.resolve<PrismaVehicleRepository>('VehicleRepository');
        return new GetAllVehiclesUseCase(vehicleRepository);
    });

    // ==========================================
    // CONTROLLERS (Clean Architecture - Application Layer)
    // ==========================================
    container.registerFactory('CustomerController', () => {
        const registerNewCustomerUseCase = container.resolve('RegisterNewCustomerUseCase');
        const listAllCustomersUseCase = container.resolve('ListAllCustomersUseCase');
        const { CustomerController } = require('@/modules/vehicles/application/controllers/customer.controller');
        return new CustomerController(registerNewCustomerUseCase, listAllCustomersUseCase);
    });

    container.registerFactory('VehicleController', () => {
        const registerNewVehicleUseCase = container.resolve('RegisterNewVehicleUseCase');
        const updateVehicleUseCase = container.resolve('UpdateVehicleUseCase');
        const getVehicleByIdUseCase = container.resolve('GetVehicleByIdUseCase');
        const getAllVehiclesUseCase = container.resolve('GetAllVehiclesUseCase');
        const { VehicleController } = require('@/modules/vehicles/application/controllers/vehicle.controller');
        return new VehicleController(
            registerNewVehicleUseCase,
            updateVehicleUseCase,
            getVehicleByIdUseCase,
            getAllVehiclesUseCase
        );
    });
}
