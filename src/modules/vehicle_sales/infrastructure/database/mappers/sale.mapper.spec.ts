import { SaleMapper } from './sale.mapper';
import { SaleEntity } from '@/modules/vehicle_sales/domain/entities/sale.entity';
import { SaleStatus } from '@/modules/vehicle_sales/domain/entities/enums';

describe('SaleMapper', () => {
    describe('toEntity', () => {
        it('should convert Prisma model to SaleEntity', () => {
            const prismaSale: any = {
                id: 'sale-123',
                vehicleId: 'vehicle-123',
                customerId: 'customer-123',
                saleDate: new Date('2024-01-15'),
                paymentCode: 'PAY-123',
                totalPrice: 85000,
                status: 'PENDING',
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-02'),
            };

            const entity = SaleMapper.toEntity(prismaSale);

            expect(entity).toBeInstanceOf(SaleEntity);
            expect(entity.id).toBe(prismaSale.id);
            expect(entity.vehicleId).toBe(prismaSale.vehicleId);
            expect(entity.customerId).toBe(prismaSale.customerId);
            expect(entity.totalPrice).toBe(prismaSale.totalPrice);
            expect(entity.status).toBe(SaleStatus.PENDING);
        });
    });

    describe('toPersistence', () => {
        it('should convert SaleEntity to Prisma model', () => {
            const entity = new SaleEntity({
                id: 'sale-456',
                vehicleId: 'vehicle-456',
                customerId: 'customer-456',
                saleDate: new Date('2024-02-01'),
                paymentCode: 'PAY-456',
                totalPrice: 95000,
                status: SaleStatus.PAID,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const prismaModel = SaleMapper.toPersistence(entity);

            expect(prismaModel.id).toBe(entity.id);
            expect(prismaModel.vehicleId).toBe(entity.vehicleId);
            expect(prismaModel.customerId).toBe(entity.customerId);
            expect(prismaModel.totalPrice).toBe(entity.totalPrice);
            expect(prismaModel.status).toBe('PAID');
        });
    });
});
