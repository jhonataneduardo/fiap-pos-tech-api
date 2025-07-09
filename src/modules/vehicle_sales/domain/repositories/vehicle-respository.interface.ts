import { VehicleEntity } from "../entities/vehicle.entity";

export interface VehicleRepositoryInterface {
    createVehicle(vehicle: VehicleEntity, txContext?: unknown): Promise<VehicleEntity>;
    getVehicleById(vehicleId: string, txContext?: unknown): Promise<VehicleEntity | null>;
    updateVehicle(vehicleId: string, vehicleData: VehicleEntity, txContext?: unknown): Promise<VehicleEntity>;
    updateVehiclePartial(vehicleId: string, vehicleData: Partial<Omit<VehicleEntity, 'id' | 'createdAt'>>, txContext?: unknown): Promise<VehicleEntity>;
    getAllVehicles(txContext?: unknown): Promise<VehicleEntity[]>;
}