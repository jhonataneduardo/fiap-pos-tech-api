import { ListAllCustomersUseCase } from './list-all-customers.usecase';
import { CustomerRepositoryInterface } from '@/modules/vehicles/domain/repositories/customer-respository.interface';
import { CustomerEntity } from '@/modules/vehicles/domain/entities/customer.entity';
import { CustomerStatus } from '@/modules/vehicles/domain/entities/enums';

describe('ListAllCustomersUseCase', () => {
    let useCase: ListAllCustomersUseCase;
    let mockRepository: jest.Mocked<CustomerRepositoryInterface>;

    beforeEach(() => {
        mockRepository = {
            createCustomer: jest.fn(),
            getAllCustomers: jest.fn(),
            getCustomerById: jest.fn(),
        } as any;
        useCase = new ListAllCustomersUseCase(mockRepository);
    });

    it('should list all customers successfully', async () => {
        const mockCustomers = [
            new CustomerEntity({
                id: 'customer-1',
                name: 'John Doe',
                email: 'john@example.com',
                nationalId: '123.456.789-00',
                status: CustomerStatus.ACTIVE,
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
            new CustomerEntity({
                id: 'customer-2',
                name: 'Jane Smith',
                email: 'jane@example.com',
                nationalId: '987.654.321-00',
                status: CustomerStatus.ACTIVE,
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
        ];

        mockRepository.getAllCustomers.mockResolvedValue(mockCustomers);

        const result = await useCase.execute();

        expect(mockRepository.getAllCustomers).toHaveBeenCalledWith(undefined);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('John Doe');
        expect(result[1].name).toBe('Jane Smith');
    });

    it('should filter customers by national_id', async () => {
        const mockCustomers = [
            new CustomerEntity({
                id: 'customer-1',
                name: 'John Doe',
                email: 'john@example.com',
                nationalId: '123.456.789-00',
                status: CustomerStatus.ACTIVE,
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
        ];

        mockRepository.getAllCustomers.mockResolvedValue(mockCustomers);

        const filters = { national_id: '123.456.789-00' };
        const result = await useCase.execute(filters);

        expect(mockRepository.getAllCustomers).toHaveBeenCalledWith({
            national_id: '123.456.789-00',
        });
        expect(result).toHaveLength(1);
        expect(result[0].national_id).toBe('123.456.789-00');
    });

    it('should return empty array when no customers exist', async () => {
        mockRepository.getAllCustomers.mockResolvedValue([]);

        const result = await useCase.execute();

        expect(result).toEqual([]);
    });

    it('should map entity fields to DTO correctly', async () => {
        const mockCustomer = new CustomerEntity({
            id: 'customer-3',
            name: 'Test User',
            email: 'test@example.com',
            nationalId: '111.222.333-44',
            status: CustomerStatus.INACTIVE,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-02'),
        });

        mockRepository.getAllCustomers.mockResolvedValue([mockCustomer]);

        const result = await useCase.execute();

        expect(result[0]).toEqual({
            id: 'customer-3',
            name: 'Test User',
            email: 'test@example.com',
            national_id: '111.222.333-44',
            status: CustomerStatus.INACTIVE,
            created_at: expect.any(Date),
            updated_at: expect.any(Date),
        });
    });
});
