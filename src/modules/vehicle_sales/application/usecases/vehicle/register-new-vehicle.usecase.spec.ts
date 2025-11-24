import { RegisterNewVehicleUseCase } from './register-new-vehicle.usecase';
import { VehicleRepositoryInterface } from '@/modules/vehicle_sales/domain/repositories/vehicle-respository.interface';
import { VehicleEntity } from '@/modules/vehicle_sales/domain/entities/vehicle.entity';
import { InputVehicleDTO } from '../../dtos/vehicle.dto';

jest.mock('uuid', () => ({
    v7: jest.fn(() => '550e8400-e29b-41d4-a716-446655440000'),
}));

describe('RegisterNewVehicleUseCase', () => {
    let useCase: RegisterNewVehicleUseCase;
    let mockRepository: jest.Mocked<VehicleRepositoryInterface>;

    beforeEach(() => {
        mockRepository = {
            createVehicle: jest.fn(),
            getAllVehicles: jest.fn(),
            getVehicleById: jest.fn(),
            updateVehiclePartial: jest.fn(),
        } as any;
        useCase = new RegisterNewVehicleUseCase(mockRepository);
    });

    it('should register a new vehicle successfully', async () => {
        const inputDTO: InputVehicleDTO = {
            brand: 'Toyota',
            model: 'Corolla',
            year: 2024,
            color: 'Silver',
            price: 85000,
        };

        const mockVehicle = new VehicleEntity({
            id: '550e8400-e29b-41d4-a716-446655440000',
            ...inputDTO,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        mockRepository.createVehicle.mockResolvedValue(mockVehicle);

        const result = await useCase.execute(inputDTO);

        expect(mockRepository.createVehicle).toHaveBeenCalledTimes(1);
        expect(result.id).toBe('550e8400-e29b-41d4-a716-446655440000');
        expect(result.brand).toBe(inputDTO.brand);
        expect(result.model).toBe(inputDTO.model);
        expect(result.year).toBe(inputDTO.year);
        expect(result.color).toBe(inputDTO.color);
        expect(result.price).toBe(inputDTO.price);
    });

    it('should use VehicleEntityFactory to create vehicle with UUID', async () => {
        const inputDTO: InputVehicleDTO = {
            brand: 'Honda',
            model: 'Civic',
            year: 2023,
            color: 'Black',
            price: 95000,
        };

        const mockVehicle = new VehicleEntity({
            id: '550e8400-e29b-41d4-a716-446655440000',
            ...inputDTO,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        mockRepository.createVehicle.mockResolvedValue(mockVehicle);

        await useCase.execute(inputDTO);

        const createdVehicleArg = mockRepository.createVehicle.mock.calls[0][0];
        expect(createdVehicleArg.id).toBe('550e8400-e29b-41d4-a716-446655440000');
    });

    it('should propagate repository errors', async () => {
        const inputDTO: InputVehicleDTO = {
            brand: 'Ford',
            model: 'Focus',
            year: 2022,
            color: 'Blue',
            price: 75000,
        };

        const error = new Error('Database error');
        mockRepository.createVehicle.mockRejectedValue(error);

        await expect(useCase.execute(inputDTO)).rejects.toThrow('Database error');
    });
});
