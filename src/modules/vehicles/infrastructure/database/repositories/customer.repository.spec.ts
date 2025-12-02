import { PrismaCustomerRepository } from './customer.repository';
import { CustomerEntity } from '@/modules/vehicles/domain/entities/customer.entity';
import { CustomerStatus } from '@/modules/vehicles/domain/entities/enums';
import { CustomerMapper } from '../mappers/customer.mapper';
import { PrismaClient } from '@prisma/client';

// Mock Prisma Client
jest.mock('@/core/infrastructure/database/prisma.client', () => ({
    __esModule: true,
    default: {
        customer: {
            create: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn(),
        },
    },
}));

// Mock CustomerMapper
jest.mock('../mappers/customer.mapper');

describe('PrismaCustomerRepository', () => {
    let repository: PrismaCustomerRepository;
    let mockPrisma: any;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        
        repository = new PrismaCustomerRepository();
        mockPrisma = (repository as any).prisma;
    });

    describe('createCustomer', () => {
        it('should create a customer successfully', async () => {
            const customerEntity = new CustomerEntity({
                id: 'customer-1',
                name: 'John Doe',
                email: 'john@example.com',
                nationalId: '123.456.789-00',
                status: CustomerStatus.ACTIVE,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const prismаCustomer = {
                id: 'customer-1',
                name: 'John Doe',
                email: 'john@example.com',
                nationalId: '123.456.789-00',
                status: 'ACTIVE',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            (CustomerMapper.toPersistence as jest.Mock).mockReturnValue(prismaCustomer);
            (CustomerMapper.toEntity as jest.Mock).mockReturnValue(customerEntity);
            mockPrisma.customer.create.mockResolvedValue(prismaCustomer);

            const result = await repository.createCustomer(customerEntity);

            expect(CustomerMapper.toPersistence).toHaveBeenCalledWith(customerEntity);
            expect(mockPrisma.customer.create).toHaveBeenCalledWith({
                data: prismaCustomer,
            });
            expect(CustomerMapper.toEntity).toHaveBeenCalledWith(prismaCustomer);
            expect(result).toEqual(customerEntity);
        });

        it('should create customer with transaction context', async () => {
            const customerEntity = new CustomerEntity({
                id: 'customer-2',
                name: 'Jane Smith',
                email: 'jane@example.com',
                nationalId: '987.654.321-00',
                status: CustomerStatus.INACTIVE,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const prismaCustomer = {
                id: 'customer-2',
                name: 'Jane Smith',
                email: 'jane@example.com',
                nationalId: '987.654.321-00',
                status: 'INACTIVE',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const mockTxContext = {
                customer: {
                    create: jest.fn().mockResolvedValue(prismaCustomer),
                },
            } as any;

            (CustomerMapper.toPersistence as jest.Mock).mockReturnValue(prismaCustomer);
            (CustomerMapper.toEntity as jest.Mock).mockReturnValue(customerEntity);

            const result = await repository.createCustomer(customerEntity, mockTxContext);

            expect(mockTxContext.customer.create).toHaveBeenCalledWith({
                data: prismaCustomer,
            });
            expect(result).toEqual(customerEntity);
        });
    });

    describe('getCustomerByNationalId', () => {
        it('should get customer by national ID successfully', async () => {
            const nationalId = '123.456.789-00';
            const prismaCustomer = {
                id: 'customer-1',
                name: 'John Doe',
                email: 'john@example.com',
                nationalId: '123.456.789-00',
                status: 'ACTIVE',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const customerEntity = new CustomerEntity({
                id: 'customer-1',
                name: 'John Doe',
                email: 'john@example.com',
                nationalId: '123.456.789-00',
                status: CustomerStatus.ACTIVE,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            mockPrisma.customer.findUnique.mockResolvedValue(prismaCustomer);
            (CustomerMapper.toEntity as jest.Mock).mockReturnValue(customerEntity);

            const result = await repository.getCustomerByNationalId(nationalId);

            expect(mockPrisma.customer.findUnique).toHaveBeenCalledWith({
                where: { nationalId },
            });
            expect(CustomerMapper.toEntity).toHaveBeenCalledWith(prismaCustomer);
            expect(result).toEqual(customerEntity);
        });

        it('should return null when customer is not found', async () => {
            const nationalId = 'non-existent';
            mockPrisma.customer.findUnique.mockResolvedValue(null);

            const result = await repository.getCustomerByNationalId(nationalId);

            expect(mockPrisma.customer.findUnique).toHaveBeenCalledWith({
                where: { nationalId },
            });
            expect(CustomerMapper.toEntity).not.toHaveBeenCalled();
            expect(result).toBeNull();
        });

        it('should get customer with transaction context', async () => {
            const nationalId = '123.456.789-00';
            const prismaCustomer = {
                id: 'customer-1',
                name: 'John Doe',
                email: 'john@example.com',
                nationalId: '123.456.789-00',
                status: 'ACTIVE',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const customerEntity = new CustomerEntity({
                id: 'customer-1',
                name: 'John Doe',
                email: 'john@example.com',
                nationalId: '123.456.789-00',
                status: CustomerStatus.ACTIVE,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const mockTxContext = {
                customer: {
                    findUnique: jest.fn().mockResolvedValue(prismaCustomer),
                },
            } as any;

            (CustomerMapper.toEntity as jest.Mock).mockReturnValue(customerEntity);

            const result = await repository.getCustomerByNationalId(nationalId, mockTxContext);

            expect(mockTxContext.customer.findUnique).toHaveBeenCalledWith({
                where: { nationalId },
            });
            expect(result).toEqual(customerEntity);
        });
    });

    describe('getAllCustomers', () => {
        it('should get all customers without filters', async () => {
            const prismaCustomers = [
                {
                    id: 'customer-1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    nationalId: '123.456.789-00',
                    status: 'ACTIVE',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 'customer-2',
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    nationalId: '987.654.321-00',
                    status: 'INACTIVE',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];

            const customerEntities = prismaCustomers.map(
                (c) =>
                    new CustomerEntity({
                        id: c.id,
                        name: c.name,
                        email: c.email,
                        nationalId: c.nationalId,
                        status: c.status as CustomerStatus,
                        createdAt: c.createdAt,
                        updatedAt: c.updatedAt,
                    })
            );

            mockPrisma.customer.findMany.mockResolvedValue(prismaCustomers);
            (CustomerMapper.toEntity as jest.Mock).mockImplementation((c) =>
                customerEntities.find((e) => e.id === c.id)
            );

            const result = await repository.getAllCustomers();

            expect(mockPrisma.customer.findMany).toHaveBeenCalledWith({
                where: {},
                orderBy: {
                    createdAt: 'desc',
                },
            });
            expect(result).toHaveLength(2);
        });

        it('should get customers filtered by national_id', async () => {
            const filters = { national_id: '123' };
            const prismaCustomers = [
                {
                    id: 'customer-1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    nationalId: '123.456.789-00',
                    status: 'ACTIVE',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];

            const customerEntity = new CustomerEntity({
                id: 'customer-1',
                name: 'John Doe',
                email: 'john@example.com',
                nationalId: '123.456.789-00',
                status: CustomerStatus.ACTIVE,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            mockPrisma.customer.findMany.mockResolvedValue(prismaCustomers);
            (CustomerMapper.toEntity as jest.Mock).mockReturnValue(customerEntity);

            const result = await repository.getAllCustomers(filters);

            expect(mockPrisma.customer.findMany).toHaveBeenCalledWith({
                where: {
                    nationalId: {
                        contains: '123',
                        mode: 'insensitive',
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            expect(result).toHaveLength(1);
        });

        it('should return empty array when no customers found', async () => {
            mockPrisma.customer.findMany.mockResolvedValue([]);

            const result = await repository.getAllCustomers();

            expect(result).toEqual([]);
        });

        it('should get customers with transaction context', async () => {
            const prismaCustomers = [
                {
                    id: 'customer-1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    nationalId: '123.456.789-00',
                    status: 'ACTIVE',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];

            const customerEntity = new CustomerEntity({
                id: 'customer-1',
                name: 'John Doe',
                email: 'john@example.com',
                nationalId: '123.456.789-00',
                status: CustomerStatus.ACTIVE,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const mockTxContext = {
                customer: {
                    findMany: jest.fn().mockResolvedValue(prismaCustomers),
                },
            } as any;

            (CustomerMapper.toEntity as jest.Mock).mockReturnValue(customerEntity);

            const result = await repository.getAllCustomers(undefined, mockTxContext);

            expect(mockTxContext.customer.findMany).toHaveBeenCalled();
            expect(result).toHaveLength(1);
        });
    });
});
