import { UpdateVehicleUseCase, UpdateVehicleRequest } from './update-vehicle.usecase';
import { VehicleRepositoryInterface } from '@/modules/vehicles/domain/repositories/vehicle-respository.interface';
import { VehicleEntity } from '@/modules/vehicles/domain/entities/vehicle.entity';
import { NotFoundError, BadRequestError } from '@/core/application/errors/app.error';

describe('UpdateVehicleUseCase', () => {
    let useCase: UpdateVehicleUseCase;
    let mockRepository: jest.Mocked<VehicleRepositoryInterface>;

    beforeEach(() => {
        mockRepository = {
            createVehicle: jest.fn(),
            getAllVehicles: jest.fn(),
            getVehicleById: jest.fn(),
            updateVehiclePartial: jest.fn(),
        } as any;
        useCase = new UpdateVehicleUseCase(mockRepository);
    });

    it('should update vehicle successfully', async () => {
        const vehicleId = 'vehicle-123';
        const existingVehicle = new VehicleEntity({
            id: vehicleId,
            brand: 'Toyota',
            model: 'Corolla',
            year: 2023,
            color: 'Silver',
            price: 85000,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
        });

        const updatedVehicle = new VehicleEntity({
            ...existingVehicle,
            price: 80000,
            color: 'Black',
            updatedAt: new Date('2024-01-15'),
        });

        mockRepository.getVehicleById.mockResolvedValue(existingVehicle);
        mockRepository.updateVehiclePartial.mockResolvedValue(updatedVehicle);

        const request: UpdateVehicleRequest = {
            vehicleId,
            updateData: {
                price: 80000,
                color: 'Black',
            },
        };

        const result = await useCase.execute(request);

        expect(mockRepository.getVehicleById).toHaveBeenCalledWith(vehicleId);
        expect(mockRepository.updateVehiclePartial).toHaveBeenCalledWith(vehicleId, {
            model: undefined,
            brand: undefined,
            year: undefined,
            price: 80000,
            color: 'Black',
        });
        expect(result.price).toBe(80000);
        expect(result.color).toBe('Black');
    });

    it('should throw NotFoundError when vehicle does not exist', async () => {
        const vehicleId = 'non-existent-id';
        mockRepository.getVehicleById.mockResolvedValue(null);

        const request: UpdateVehicleRequest = {
            vehicleId,
            updateData: { price: 90000 },
        };

        await expect(useCase.execute(request)).rejects.toThrow(NotFoundError);
        await expect(useCase.execute(request)).rejects.toThrow(`Vehicle with ID ${vehicleId} not found.`);
        expect(mockRepository.updateVehiclePartial).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError when no data provided for update', async () => {
        const vehicleId = 'vehicle-123';
        const existingVehicle = new VehicleEntity({
            id: vehicleId,
            brand: 'Honda',
            model: 'Civic',
            year: 2023,
            color: 'Blue',
            price: 95000,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        mockRepository.getVehicleById.mockResolvedValue(existingVehicle);

        const request: UpdateVehicleRequest = {
            vehicleId,
            updateData: {},
        };

        await expect(useCase.execute(request)).rejects.toThrow(BadRequestError);
        await expect(useCase.execute(request)).rejects.toThrow('No data provided for update.');
        expect(mockRepository.updateVehiclePartial).not.toHaveBeenCalled();
    });

    it('should update partial fields only', async () => {
        const vehicleId = 'vehicle-456';
        const existingVehicle = new VehicleEntity({
            id: vehicleId,
            brand: 'Ford',
            model: 'Focus',
            year: 2022,
            color: 'White',
            price: 70000,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const updatedVehicle = new VehicleEntity({
            ...existingVehicle,
            price: 65000,
        });

        mockRepository.getVehicleById.mockResolvedValue(existingVehicle);
        mockRepository.updateVehiclePartial.mockResolvedValue(updatedVehicle);

        const request: UpdateVehicleRequest = {
            vehicleId,
            updateData: { price: 65000 },
        };

        const result = await useCase.execute(request);

        expect(result.price).toBe(65000);
        expect(result.brand).toBe('Ford');
        expect(result.model).toBe('Focus');
    });
});
