import { CustomerMapper } from './customer.mapper';
import { CustomerEntity } from '@/modules/vehicle_sales/domain/entities/customer.entity';
import { CustomerStatus } from '@/modules/vehicle_sales/domain/entities/enums';

describe('CustomerMapper', () => {
    describe('toEntity', () => {
        it('should convert Prisma model to CustomerEntity', () => {
            const prismaCustomer: any = {
                id: 'customer-123',
                name: 'John Doe',
                email: 'john@example.com',
                nationalId: '123.456.789-00',
                status: 'ACTIVE',
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-02'),
            };

            const entity = CustomerMapper.toEntity(prismaCustomer);

            expect(entity).toBeInstanceOf(CustomerEntity);
            expect(entity.id).toBe(prismaCustomer.id);
            expect(entity.name).toBe(prismaCustomer.name);
            expect(entity.email).toBe(prismaCustomer.email);
            expect(entity.nationalId).toBe(prismaCustomer.nationalId);
            expect(entity.status).toBe(CustomerStatus.ACTIVE);
        });
    });

    describe('toPersistence', () => {
        it('should convert CustomerEntity to Prisma model', () => {
            const entity = new CustomerEntity({
                id: 'customer-456',
                name: 'Jane Smith',
                email: 'jane@example.com',
                nationalId: '987.654.321-00',
                status: CustomerStatus.ACTIVE,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const prismaModel = CustomerMapper.toPersistence(entity);

            expect(prismaModel.id).toBe(entity.id);
            expect(prismaModel.name).toBe(entity.name);
            expect(prismaModel.email).toBe(entity.email);
            expect(prismaModel.nationalId).toBe(entity.nationalId);
            expect(prismaModel.status).toBe('ACTIVE');
        });
    });
});
