import { RegisterNewCustomerUseCase } from './register-new-customer.usecase';
import { CustomerRepositoryInterface } from '@/modules/vehicles/domain/repositories/customer-respository.interface';
import { CustomerEntity, CustomerEntityFactory } from '@/modules/vehicles/domain/entities/customer.entity';
import { CustomerStatus } from '@/modules/vehicles/domain/entities/enums';
import { NotFoundError } from '@/core/application/errors/app.error';
import { InputCustomerDTO } from '../../dtos/customer.dto';

// Mock UUID to have consistent IDs in tests
jest.mock('uuid', () => ({
    v7: jest.fn(() => '550e8400-e29b-41d4-a716-446655440000'),
}));

describe('RegisterNewCustomerUseCase', () => {
    let useCase: RegisterNewCustomerUseCase;
    let mockRepository: jest.Mocked<CustomerRepositoryInterface>;

    beforeEach(() => {
        mockRepository = {
            createCustomer: jest.fn(),
            getAllCustomers: jest.fn(),
            getCustomerById: jest.fn(),
            getCustomerByNationalId: jest.fn(),
        } as any;
        useCase = new RegisterNewCustomerUseCase(mockRepository);
    });

    it('should register a new customer successfully', async () => {
        const inputDTO: InputCustomerDTO = {
            name: 'John Doe',
            email: 'john@example.com',
            national_id: '123.456.789-00',
            status: CustomerStatus.ACTIVE,
        };

        const createdCustomer = new CustomerEntity({
            id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'John Doe',
            email: 'john@example.com',
            nationalId: '123.456.789-00',
            status: CustomerStatus.ACTIVE,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
        });

        mockRepository.getCustomerByNationalId.mockResolvedValue(null);
        mockRepository.createCustomer.mockResolvedValue(createdCustomer);

        const result = await useCase.execute(inputDTO);

        expect(mockRepository.getCustomerByNationalId).toHaveBeenCalledWith('123.456.789-00');
        expect(mockRepository.createCustomer).toHaveBeenCalled();
        expect(result).toEqual({
            id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'John Doe',
            email: 'john@example.com',
            national_id: '123.456.789-00',
            status: CustomerStatus.ACTIVE,
            created_at: expect.any(Date),
            updated_at: expect.any(Date),
        });
    });

    it('should throw NotFoundError when customer with same national_id already exists', async () => {
        const inputDTO: InputCustomerDTO = {
            name: 'John Doe',
            email: 'john@example.com',
            national_id: '123.456.789-00',
            status: CustomerStatus.ACTIVE,
        };

        const existingCustomer = new CustomerEntity({
            id: 'existing-id',
            name: 'Existing Customer',
            email: 'existing@example.com',
            nationalId: '123.456.789-00',
            status: CustomerStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        mockRepository.getCustomerByNationalId.mockResolvedValue(existingCustomer);

        await expect(useCase.execute(inputDTO)).rejects.toThrow(NotFoundError);
        await expect(useCase.execute(inputDTO)).rejects.toThrow(
            'Customer with national ID 123.456.789-00 already exists.'
        );
        expect(mockRepository.createCustomer).not.toHaveBeenCalled();
    });

    it('should create customer with INACTIVE status', async () => {
        const inputDTO: InputCustomerDTO = {
            name: 'Jane Smith',
            email: 'jane@example.com',
            national_id: '987.654.321-00',
            status: CustomerStatus.INACTIVE,
        };

        const createdCustomer = new CustomerEntity({
            id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'Jane Smith',
            email: 'jane@example.com',
            nationalId: '987.654.321-00',
            status: CustomerStatus.INACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        mockRepository.getCustomerByNationalId.mockResolvedValue(null);
        mockRepository.createCustomer.mockResolvedValue(createdCustomer);

        const result = await useCase.execute(inputDTO);

        expect(result.status).toBe(CustomerStatus.INACTIVE);
    });

    it('should use CustomerEntityFactory to create customer entity', async () => {
        const inputDTO: InputCustomerDTO = {
            name: 'Test User',
            email: 'test@example.com',
            national_id: '111.222.333-44',
            status: CustomerStatus.ACTIVE,
        };

        const factorySpy = jest.spyOn(CustomerEntityFactory, 'create');

        mockRepository.getCustomerByNationalId.mockResolvedValue(null);
        mockRepository.createCustomer.mockResolvedValue({} as any);

        await useCase.execute(inputDTO);

        expect(factorySpy).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'Test User',
                email: 'test@example.com',
                nationalId: '111.222.333-44',
                status: CustomerStatus.ACTIVE,
            })
        );

        factorySpy.mockRestore();
    });

    it('should propagate errors from repository', async () => {
        const inputDTO: InputCustomerDTO = {
            name: 'John Doe',
            email: 'john@example.com',
            national_id: '123.456.789-00',
            status: CustomerStatus.ACTIVE,
        };

        mockRepository.getCustomerByNationalId.mockResolvedValue(null);
        mockRepository.createCustomer.mockRejectedValue(new Error('Database connection failed'));

        await expect(useCase.execute(inputDTO)).rejects.toThrow('Database connection failed');
    });

    it('should map entity fields to DTO correctly', async () => {
        const inputDTO: InputCustomerDTO = {
            name: 'Mapping Test',
            email: 'mapping@test.com',
            national_id: '999.888.777-66',
            status: CustomerStatus.ACTIVE,
        };

        const createdAt = new Date('2024-12-01T10:00:00Z');
        const updatedAt = new Date('2024-12-01T11:00:00Z');

        const createdCustomer = new CustomerEntity({
            id: 'test-id-123',
            name: 'Mapping Test',
            email: 'mapping@test.com',
            nationalId: '999.888.777-66',
            status: CustomerStatus.ACTIVE,
            createdAt,
            updatedAt,
        });

        mockRepository.getCustomerByNationalId.mockResolvedValue(null);
        mockRepository.createCustomer.mockResolvedValue(createdCustomer);

        const result = await useCase.execute(inputDTO);

        expect(result).toEqual({
            id: 'test-id-123',
            name: 'Mapping Test',
            email: 'mapping@test.com',
            national_id: '999.888.777-66',
            status: CustomerStatus.ACTIVE,
            created_at: createdAt,
            updated_at: updatedAt,
        });
    });
});
