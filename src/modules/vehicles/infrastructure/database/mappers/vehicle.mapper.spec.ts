import { VehicleMapper } from './vehicle.mapper';
import { VehicleEntity } from '@/modules/vehicles/domain/entities/vehicle.entity';

describe('VehicleMapper', () => {
    describe('toEntity', () => {
        it('should convert Prisma model to VehicleEntity', () => {
            const prismaVehicle: any = {
                id: 'vehicle-123',
                brand: 'Toyota',
                model: 'Corolla',
                year: 2024,
                color: 'Silver',
                price: 85000,
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-02'),
            };

            const entity = VehicleMapper.toEntity(prismaVehicle);

            expect(entity).toBeInstanceOf(VehicleEntity);
            expect(entity.id).toBe(prismaVehicle.id);
            expect(entity.brand).toBe(prismaVehicle.brand);
            expect(entity.model).toBe(prismaVehicle.model);
            expect(entity.year).toBe(prismaVehicle.year);
            expect(entity.color).toBe(prismaVehicle.color);
            expect(entity.price).toBe(prismaVehicle.price);
        });
    });

    describe('toPersistence', () => {
        it('should convert VehicleEntity to Prisma model', () => {
            const entity = new VehicleEntity({
                id: 'vehicle-456',
                brand: 'Honda',
                model: 'Civic',
                year: 2023,
                color: 'Black',
                price: 95000,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const prismaModel = VehicleMapper.toPersistence(entity);

            expect(prismaModel.id).toBe(entity.id);
            expect(prismaModel.brand).toBe(entity.brand);
            expect(prismaModel.model).toBe(entity.model);
            expect(prismaModel.year).toBe(entity.year);
            expect(prismaModel.color).toBe(entity.color);
            expect(prismaModel.price).toBe(entity.price);
        });
    });
});
