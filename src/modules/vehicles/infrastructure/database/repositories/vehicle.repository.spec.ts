import { PrismaVehicleRepository } from './vehicle.repository';
import { VehicleEntity } from '@/modules/vehicles/domain/entities/vehicle.entity';
import { VehicleMapper } from '../mappers/vehicle.mapper';
import { PrismaClient } from '@prisma/client';

// Mock Prisma Client
jest.mock('@/core/infrastructure/database/prisma.client', () => ({
    __esModule: true,
    default: {
        vehicle: {
            create: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
        },
    },
}));

// Mock VehicleMapper
jest.mock('../mappers/vehicle.mapper');

describe('PrismaVehicleRepository', () => {
    let repository: PrismaVehicleRepository;
    let mockPrisma: any;

    beforeEach(() => {
        jest.clearAllMocks();
        repository = new PrismaVehicleRepository();
        mockPrisma = (repository as any).prisma;
    });

    describe('createVehicle', () => {
        it('should create a vehicle successfully', async () => {
            const vehicleEntity = new VehicleEntity({
                id: 'vehicle-1',
                model: 'Civic',
                brand: 'Honda',
                year: 2023,
                price: 95000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const prismaVehicle = {
                id: 'vehicle-1',
                model: 'Civic',
                brand: 'Honda',
                year: 2023,
                price: 95000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            (VehicleMapper.toPersistence as jest.Mock).mockReturnValue(prismaVehicle);
            (VehicleMapper.toEntity as jest.Mock).mockReturnValue(vehicleEntity);
            mockPrisma.vehicle.create.mockResolvedValue(prismaVehicle);

            const result = await repository.createVehicle(vehicleEntity);

            expect(VehicleMapper.toPersistence).toHaveBeenCalledWith(vehicleEntity);
            expect(mockPrisma.vehicle.create).toHaveBeenCalledWith({
                data: prismaVehicle,
            });
            expect(VehicleMapper.toEntity).toHaveBeenCalledWith(prismaVehicle);
            expect(result).toEqual(vehicleEntity);
        });

        it('should create vehicle with transaction context', async () => {
            const vehicleEntity = new VehicleEntity({
                id: 'vehicle-2',
                model: 'Corolla',
                brand: 'Toyota',
                year: 2024,
                price: 120000,
                color: 'White',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const prismaVehicle = {
                id: 'vehicle-2',
                model: 'Corolla',
                brand: 'Toyota',
                year: 2024,
                price: 120000,
                color: 'White',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const mockTxContext = {
                vehicle: {
                    create: jest.fn().mockResolvedValue(prismaVehicle),
                },
            } as any;

            (VehicleMapper.toPersistence as jest.Mock).mockReturnValue(prismaVehicle);
            (VehicleMapper.toEntity as jest.Mock).mockReturnValue(vehicleEntity);

            const result = await repository.createVehicle(vehicleEntity, mockTxContext);

            expect(mockTxContext.vehicle.create).toHaveBeenCalledWith({
                data: prismaVehicle,
            });
            expect(result).toEqual(vehicleEntity);
        });
    });

    describe('getVehicleById', () => {
        it('should get vehicle by id successfully', async () => {
            const vehicleId = 'vehicle-1';
            const prismaVehicle = {
                id: vehicleId,
                model: 'Civic',
                brand: 'Honda',
                year: 2023,
                price: 95000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const vehicleEntity = new VehicleEntity({
                id: vehicleId,
                model: 'Civic',
                brand: 'Honda',
                year: 2023,
                price: 95000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            mockPrisma.vehicle.findUnique.mockResolvedValue(prismaVehicle);
            (VehicleMapper.toEntity as jest.Mock).mockReturnValue(vehicleEntity);

            const result = await repository.getVehicleById(vehicleId);

            expect(mockPrisma.vehicle.findUnique).toHaveBeenCalledWith({
                where: { id: vehicleId },
            });
            expect(VehicleMapper.toEntity).toHaveBeenCalledWith(prismaVehicle);
            expect(result).toEqual(vehicleEntity);
        });

        it('should return null when vehicle is not found', async () => {
            const vehicleId = 'non-existent';
            mockPrisma.vehicle.findUnique.mockResolvedValue(null);

            const result = await repository.getVehicleById(vehicleId);

            expect(mockPrisma.vehicle.findUnique).toHaveBeenCalledWith({
                where: { id: vehicleId },
            });
            expect(VehicleMapper.toEntity).not.toHaveBeenCalled();
            expect(result).toBeNull();
        });

        it('should get vehicle with transaction context', async () => {
            const vehicleId = 'vehicle-1';
            const prismaVehicle = {
                id: vehicleId,
                model: 'Civic',
                brand: 'Honda',
                year: 2023,
                price: 95000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const vehicleEntity = new VehicleEntity({
                id: vehicleId,
                model: 'Civic',
                brand: 'Honda',
                year: 2023,
                price: 95000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const mockTxContext = {
                vehicle: {
                    findUnique: jest.fn().mockResolvedValue(prismaVehicle),
                },
            } as any;

            (VehicleMapper.toEntity as jest.Mock).mockReturnValue(vehicleEntity);

            const result = await repository.getVehicleById(vehicleId, mockTxContext);

            expect(mockTxContext.vehicle.findUnique).toHaveBeenCalledWith({
                where: { id: vehicleId },
            });
            expect(result).toEqual(vehicleEntity);
        });
    });

    describe('updateVehicle', () => {
        it('should update a vehicle successfully', async () => {
            const vehicleId = 'vehicle-1';
            const vehicleEntity = new VehicleEntity({
                id: vehicleId,
                model: 'Civic Updated',
                brand: 'Honda',
                year: 2024,
                price: 100000,
                color: 'Red',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const prismaVehicle = {
                id: vehicleId,
                model: 'Civic Updated',
                brand: 'Honda',
                year: 2024,
                price: 100000,
                color: 'Red',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            mockPrisma.vehicle.update.mockResolvedValue(prismaVehicle);
            (VehicleMapper.toEntity as jest.Mock).mockReturnValue(vehicleEntity);

            const result = await repository.updateVehicle(vehicleId, vehicleEntity);

            expect(mockPrisma.vehicle.update).toHaveBeenCalledWith({
                where: { id: vehicleId },
                data: {
                    model: vehicleEntity.model,
                    brand: vehicleEntity.brand,
                    year: vehicleEntity.year,
                    price: vehicleEntity.price,
                    color: vehicleEntity.color,
                    updatedAt: expect.any(Date),
                },
            });
            expect(VehicleMapper.toEntity).toHaveBeenCalledWith(prismaVehicle);
            expect(result).toEqual(vehicleEntity);
        });

        it('should update vehicle with transaction context', async () => {
            const vehicleId = 'vehicle-1';
            const vehicleEntity = new VehicleEntity({
                id: vehicleId,
                model: 'Civic',
                brand: 'Honda',
                year: 2023,
                price: 95000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const prismaVehicle = {
                id: vehicleId,
                model: 'Civic',
                brand: 'Honda',
                year: 2023,
                price: 95000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const mockTxContext = {
                vehicle: {
                    update: jest.fn().mockResolvedValue(prismaVehicle),
                },
            } as any;

            (VehicleMapper.toEntity as jest.Mock).mockReturnValue(vehicleEntity);

            const result = await repository.updateVehicle(vehicleId, vehicleEntity, mockTxContext);

            expect(mockTxContext.vehicle.update).toHaveBeenCalled();
            expect(result).toEqual(vehicleEntity);
        });
    });

    describe('updateVehiclePartial', () => {
        it('should update vehicle with only model', async () => {
            const vehicleId = 'vehicle-1';
            const partialData = { model: 'New Model' };

            const prismaVehicle = {
                id: vehicleId,
                model: 'New Model',
                brand: 'Honda',
                year: 2023,
                price: 95000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const vehicleEntity = new VehicleEntity({
                id: vehicleId,
                model: 'New Model',
                brand: 'Honda',
                year: 2023,
                price: 95000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            mockPrisma.vehicle.update.mockResolvedValue(prismaVehicle);
            (VehicleMapper.toEntity as jest.Mock).mockReturnValue(vehicleEntity);

            const result = await repository.updateVehiclePartial(vehicleId, partialData);

            expect(mockPrisma.vehicle.update).toHaveBeenCalledWith({
                where: { id: vehicleId },
                data: {
                    model: 'New Model',
                    updatedAt: expect.any(Date),
                },
            });
            expect(result).toEqual(vehicleEntity);
        });

        it('should update vehicle with multiple fields', async () => {
            const vehicleId = 'vehicle-1';
            const partialData = {
                model: 'New Model',
                price: 110000,
                color: 'Blue',
            };

            const prismaVehicle = {
                id: vehicleId,
                model: 'New Model',
                brand: 'Honda',
                year: 2023,
                price: 110000,
                color: 'Blue',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const vehicleEntity = new VehicleEntity({
                id: vehicleId,
                model: 'New Model',
                brand: 'Honda',
                year: 2023,
                price: 110000,
                color: 'Blue',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            mockPrisma.vehicle.update.mockResolvedValue(prismaVehicle);
            (VehicleMapper.toEntity as jest.Mock).mockReturnValue(vehicleEntity);

            const result = await repository.updateVehiclePartial(vehicleId, partialData);

            expect(mockPrisma.vehicle.update).toHaveBeenCalledWith({
                where: { id: vehicleId },
                data: {
                    model: 'New Model',
                    price: 110000,
                    color: 'Blue',
                    updatedAt: expect.any(Date),
                },
            });
            expect(result).toEqual(vehicleEntity);
        });

        it('should update vehicle with transaction context', async () => {
            const vehicleId = 'vehicle-1';
            const partialData = { price: 120000 };

            const prismaVehicle = {
                id: vehicleId,
                model: 'Civic',
                brand: 'Honda',
                year: 2023,
                price: 120000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const vehicleEntity = new VehicleEntity({
                id: vehicleId,
                model: 'Civic',
                brand: 'Honda',
                year: 2023,
                price: 120000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const mockTxContext = {
                vehicle: {
                    update: jest.fn().mockResolvedValue(prismaVehicle),
                },
            } as any;

            (VehicleMapper.toEntity as jest.Mock).mockReturnValue(vehicleEntity);

            const result = await repository.updateVehiclePartial(vehicleId, partialData, mockTxContext);

            expect(mockTxContext.vehicle.update).toHaveBeenCalled();
            expect(result).toEqual(vehicleEntity);
        });
    });

    describe('getAllVehicles', () => {
        it('should get all vehicles successfully', async () => {
            const prismaVehicles = [
                {
                    id: 'vehicle-1',
                    model: 'Civic',
                    brand: 'Honda',
                    year: 2023,
                    price: 95000,
                    color: 'Black',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 'vehicle-2',
                    model: 'Corolla',
                    brand: 'Toyota',
                    year: 2024,
                    price: 120000,
                    color: 'White',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];

            const vehicleEntities = prismaVehicles.map(
                (v) =>
                    new VehicleEntity({
                        id: v.id,
                        model: v.model,
                        brand: v.brand,
                        year: v.year,
                        price: v.price,
                        color: v.color,
                        createdAt: v.createdAt,
                        updatedAt: v.updatedAt,
                    })
            );

            mockPrisma.vehicle.findMany.mockResolvedValue(prismaVehicles);
            (VehicleMapper.toEntity as jest.Mock).mockImplementation((v) =>
                vehicleEntities.find((e) => e.id === v.id)
            );

            const result = await repository.getAllVehicles();

            expect(mockPrisma.vehicle.findMany).toHaveBeenCalledWith({
                orderBy: {
                    createdAt: 'desc',
                },
            });
            expect(result).toHaveLength(2);
        });

        it('should return empty array when no vehicles found', async () => {
            mockPrisma.vehicle.findMany.mockResolvedValue([]);

            const result = await repository.getAllVehicles();

            expect(result).toEqual([]);
        });

        it('should get vehicles with transaction context', async () => {
            const prismaVehicles = [
                {
                    id: 'vehicle-1',
                    model: 'Civic',
                    brand: 'Honda',
                    year: 2023,
                    price: 95000,
                    color: 'Black',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];

            const vehicleEntity = new VehicleEntity({
                id: 'vehicle-1',
                model: 'Civic',
                brand: 'Honda',
                year: 2023,
                price: 95000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const mockTxContext = {
                vehicle: {
                    findMany: jest.fn().mockResolvedValue(prismaVehicles),
                },
            } as any;

            (VehicleMapper.toEntity as jest.Mock).mockReturnValue(vehicleEntity);

            const result = await repository.getAllVehicles(mockTxContext);

            expect(mockTxContext.vehicle.findMany).toHaveBeenCalled();
            expect(result).toHaveLength(1);
        });
    });

    describe('getAvailableVehicles', () => {
        it('should get available vehicles ordered by price', async () => {
            const prismaVehicles = [
                {
                    id: 'vehicle-1',
                    model: 'Civic',
                    brand: 'Honda',
                    year: 2023,
                    price: 95000,
                    color: 'Black',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 'vehicle-2',
                    model: 'Corolla',
                    brand: 'Toyota',
                    year: 2024,
                    price: 120000,
                    color: 'White',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];

            const vehicleEntities = prismaVehicles.map(
                (v) =>
                    new VehicleEntity({
                        id: v.id,
                        model: v.model,
                        brand: v.brand,
                        year: v.year,
                        price: v.price,
                        color: v.color,
                        createdAt: v.createdAt,
                        updatedAt: v.updatedAt,
                    })
            );

            mockPrisma.vehicle.findMany.mockResolvedValue(prismaVehicles);
            (VehicleMapper.toEntity as jest.Mock).mockImplementation((v) =>
                vehicleEntities.find((e) => e.id === v.id)
            );

            const result = await repository.getAvailableVehicles();

            expect(mockPrisma.vehicle.findMany).toHaveBeenCalledWith({
                orderBy: {
                    price: 'asc',
                },
            });
            expect(result).toHaveLength(2);
        });

        it('should get available vehicles with transaction context', async () => {
            const prismaVehicles = [
                {
                    id: 'vehicle-1',
                    model: 'Civic',
                    brand: 'Honda',
                    year: 2023,
                    price: 95000,
                    color: 'Black',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];

            const vehicleEntity = new VehicleEntity({
                id: 'vehicle-1',
                model: 'Civic',
                brand: 'Honda',
                year: 2023,
                price: 95000,
                color: 'Black',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const mockTxContext = {
                vehicle: {
                    findMany: jest.fn().mockResolvedValue(prismaVehicles),
                },
            } as any;

            (VehicleMapper.toEntity as jest.Mock).mockReturnValue(vehicleEntity);

            const result = await repository.getAvailableVehicles(mockTxContext);

            expect(mockTxContext.vehicle.findMany).toHaveBeenCalledWith({
                orderBy: {
                    price: 'asc',
                },
            });
            expect(result).toHaveLength(1);
        });
    });
});
