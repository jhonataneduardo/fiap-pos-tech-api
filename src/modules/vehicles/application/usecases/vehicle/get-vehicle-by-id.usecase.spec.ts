import { GetVehicleByIdUseCase } from './get-vehicle-by-id.usecase';
import { VehicleRepositoryInterface } from '@/modules/vehicles/domain/repositories/vehicle-respository.interface';
import { VehicleEntity } from '@/modules/vehicles/domain/entities/vehicle.entity';
import { NotFoundError } from '@/core/application/errors/app.error';

describe('GetVehicleByIdUseCase', () => {
    let useCase: GetVehicleByIdUseCase;
    let mockRepository: jest.Mocked<VehicleRepositoryInterface>;

    beforeEach(() => {
        mockRepository = {
            createVehicle: jest.fn(),
            getVehicleById: jest.fn(),
            getAllVehicles: jest.fn(),
            getAvailableVehicles: jest.fn(),
            updateVehicle: jest.fn(),
            updateVehiclePartial: jest.fn(),
        } as any;
        useCase = new GetVehicleByIdUseCase(mockRepository);
    });

    it('should get vehicle by id successfully', async () => {
        const vehicleId = 'vehicle-123';
        const mockVehicle = new VehicleEntity({
            id: vehicleId,
            model: 'Civic',
            brand: 'Honda',
            year: 2023,
            price: 95000,
            color: 'Black',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
        });

        mockRepository.getVehicleById.mockResolvedValue(mockVehicle);

        const result = await useCase.execute(vehicleId);

        expect(mockRepository.getVehicleById).toHaveBeenCalledWith(vehicleId);
        expect(result).toEqual({
            id: vehicleId,
            model: 'Civic',
            brand: 'Honda',
            year: 2023,
            price: 95000,
            color: 'Black',
            created_at: expect.any(Date),
            updated_at: expect.any(Date),
        });
    });

    it('should throw NotFoundError when vehicle does not exist', async () => {
        const vehicleId = 'non-existent-id';
        mockRepository.getVehicleById.mockResolvedValue(null);

        await expect(useCase.execute(vehicleId)).rejects.toThrow(NotFoundError);
        await expect(useCase.execute(vehicleId)).rejects.toThrow(
            `Vehicle with ID ${vehicleId} not found.`
        );
    });

    it('should map entity fields to DTO correctly', async () => {
        const vehicleId = 'mapping-test-id';
        const createdAt = new Date('2024-12-01T10:00:00Z');
        const updatedAt = new Date('2024-12-01T11:00:00Z');

        const mockVehicle = new VehicleEntity({
            id: vehicleId,
            model: 'Corolla',
            brand: 'Toyota',
            year: 2024,
            price: 120000,
            color: 'White',
            createdAt,
            updatedAt,
        });

        mockRepository.getVehicleById.mockResolvedValue(mockVehicle);

        const result = await useCase.execute(vehicleId);

        expect(result).toEqual({
            id: vehicleId,
            model: 'Corolla',
            brand: 'Toyota',
            year: 2024,
            price: 120000,
            color: 'White',
            created_at: createdAt,
            updated_at: updatedAt,
        });
    });

    it('should handle different vehicle properties correctly', async () => {
        const vehicleId = 'vehicle-456';
        const mockVehicle = new VehicleEntity({
            id: vehicleId,
            model: 'Model S',
            brand: 'Tesla',
            year: 2025,
            price: 450000,
            color: 'Red',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        mockRepository.getVehicleById.mockResolvedValue(mockVehicle);

        const result = await useCase.execute(vehicleId);

        expect(result.model).toBe('Model S');
        expect(result.brand).toBe('Tesla');
        expect(result.year).toBe(2025);
        expect(result.price).toBe(450000);
        expect(result.color).toBe('Red');
    });

    it('should propagate errors from repository', async () => {
        const vehicleId = 'error-test-id';
        mockRepository.getVehicleById.mockRejectedValue(
            new Error('Database connection failed')
        );

        await expect(useCase.execute(vehicleId)).rejects.toThrow('Database connection failed');
    });

    it('should handle null vehicle with correct error message', async () => {
        const specificId = 'abc-def-123';
        mockRepository.getVehicleById.mockResolvedValue(null);

        await expect(useCase.execute(specificId)).rejects.toThrow(
            `Vehicle with ID ${specificId} not found.`
        );
    });
});
