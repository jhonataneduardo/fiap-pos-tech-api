import { GetAllVehiclesUseCase } from './get-all-vehicles.usecase';
import { VehicleRepositoryInterface } from '@/modules/vehicles/domain/repositories/vehicle-respository.interface';
import { VehicleEntity } from '@/modules/vehicles/domain/entities/vehicle.entity';

describe('GetAllVehiclesUseCase', () => {
    let useCase: GetAllVehiclesUseCase;
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
        useCase = new GetAllVehiclesUseCase(mockRepository);
    });

    it('should list all vehicles successfully', async () => {
        const mockVehicles = [
            new VehicleEntity({
                id: 'vehicle-1',
                model: 'Civic',
                brand: 'Honda',
                year: 2023,
                price: 95000,
                color: 'Black',
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-01'),
            }),
            new VehicleEntity({
                id: 'vehicle-2',
                model: 'Corolla',
                brand: 'Toyota',
                year: 2024,
                price: 120000,
                color: 'White',
                createdAt: new Date('2024-01-02'),
                updatedAt: new Date('2024-01-02'),
            }),
        ];

        mockRepository.getAllVehicles.mockResolvedValue(mockVehicles);

        const result = await useCase.execute();

        expect(mockRepository.getAllVehicles).toHaveBeenCalledWith();
        expect(result).toHaveLength(2);
        expect(result[0].model).toBe('Civic');
        expect(result[1].model).toBe('Corolla');
    });

    it('should return empty array when no vehicles exist', async () => {
        mockRepository.getAllVehicles.mockResolvedValue([]);

        const result = await useCase.execute();

        expect(mockRepository.getAllVehicles).toHaveBeenCalledWith();
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it('should map all entity fields to DTO correctly', async () => {
        const createdAt = new Date('2024-12-01T10:00:00Z');
        const updatedAt = new Date('2024-12-01T11:00:00Z');

        const mockVehicles = [
            new VehicleEntity({
                id: 'test-id-123',
                model: 'Model S',
                brand: 'Tesla',
                year: 2025,
                price: 450000,
                color: 'Red',
                createdAt,
                updatedAt,
            }),
        ];

        mockRepository.getAllVehicles.mockResolvedValue(mockVehicles);

        const result = await useCase.execute();

        expect(result[0]).toEqual({
            id: 'test-id-123',
            model: 'Model S',
            brand: 'Tesla',
            year: 2025,
            price: 450000,
            color: 'Red',
            created_at: createdAt,
            updated_at: updatedAt,
        });
    });

    it('should handle multiple vehicles with different properties', async () => {
        const mockVehicles = [
            new VehicleEntity({
                id: 'v1',
                model: 'Civic',
                brand: 'Honda',
                year: 2020,
                price: 75000,
                color: 'Blue',
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
            new VehicleEntity({
                id: 'v2',
                model: 'Mustang',
                brand: 'Ford',
                year: 2023,
                price: 350000,
                color: 'Yellow',
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
            new VehicleEntity({
                id: 'v3',
                model: 'A4',
                brand: 'Audi',
                year: 2024,
                price: 280000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
        ];

        mockRepository.getAllVehicles.mockResolvedValue(mockVehicles);

        const result = await useCase.execute();

        expect(result).toHaveLength(3);
        expect(result[0].brand).toBe('Honda');
        expect(result[1].brand).toBe('Ford');
        expect(result[2].brand).toBe('Audi');
        expect(result[0].price).toBe(75000);
        expect(result[1].price).toBe(350000);
        expect(result[2].price).toBe(280000);
    });

    it('should propagate errors from repository', async () => {
        mockRepository.getAllVehicles.mockRejectedValue(
            new Error('Database connection failed')
        );

        await expect(useCase.execute()).rejects.toThrow('Database connection failed');
    });

    it('should preserve order of vehicles returned by repository', async () => {
        const mockVehicles = [
            new VehicleEntity({
                id: 'first',
                model: 'First',
                brand: 'BrandA',
                year: 2020,
                price: 100000,
                color: 'Red',
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
            new VehicleEntity({
                id: 'second',
                model: 'Second',
                brand: 'BrandB',
                year: 2021,
                price: 150000,
                color: 'Blue',
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
            new VehicleEntity({
                id: 'third',
                model: 'Third',
                brand: 'BrandC',
                year: 2022,
                price: 200000,
                color: 'Green',
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
        ];

        mockRepository.getAllVehicles.mockResolvedValue(mockVehicles);

        const result = await useCase.execute();

        expect(result[0].id).toBe('first');
        expect(result[1].id).toBe('second');
        expect(result[2].id).toBe('third');
    });
});
