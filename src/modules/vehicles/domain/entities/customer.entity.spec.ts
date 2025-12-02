import { CustomerEntity, CustomerEntityProps, CustomerEntityFactory } from './customer.entity';
import { CustomerStatus } from './enums';

jest.mock('uuid', () => ({
    v7: jest.fn(() => '550e8400-e29b-41d4-a716-446655440000'),
}));

describe('CustomerEntity', () => {
    const mockProps: CustomerEntityProps = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'John Doe',
        email: 'john@example.com',
        nationalId: '123.456.789-00',
        status: CustomerStatus.ACTIVE,
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        updatedAt: new Date('2024-01-02T00:00:00.000Z'),
    };

    it('should create a customer entity with correct properties', () => {
        const customer = new CustomerEntity(mockProps);

        expect(customer.id).toBe(mockProps.id);
        expect(customer.name).toBe(mockProps.name);
        expect(customer.email).toBe(mockProps.email);
        expect(customer.nationalId).toBe(mockProps.nationalId);
        expect(customer.status).toBe(CustomerStatus.ACTIVE);
        expect(customer.createdAt).toEqual(mockProps.createdAt);
        expect(customer.updatedAt).toEqual(mockProps.updatedAt);
    });

    it('should inherit from BaseEntity', () => {
        const customer = new CustomerEntity(mockProps);

        expect(customer).toHaveProperty('id');
        expect(customer).toHaveProperty('createdAt');
        expect(customer).toHaveProperty('updatedAt');
    });

    it('should have all customer-specific properties', () => {
        const customer = new CustomerEntity(mockProps);

        expect(customer).toHaveProperty('name');
        expect(customer).toHaveProperty('email');
        expect(customer).toHaveProperty('nationalId');
        expect(customer).toHaveProperty('status');
    });

    it('should handle INACTIVE status', () => {
        const inactiveProps = { ...mockProps, status: CustomerStatus.INACTIVE };
        const customer = new CustomerEntity(inactiveProps);

        expect(customer.status).toBe(CustomerStatus.INACTIVE);
    });
});

describe('CustomerEntityFactory', () => {
    it('should create a customer with auto-generated UUID', () => {
        const props = {
            name: 'Jane Smith',
            email: 'jane@example.com',
            nationalId: '987.654.321-00',
            status: CustomerStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const customer = CustomerEntityFactory.create(props);

        expect(customer).toBeInstanceOf(CustomerEntity);
        expect(customer.id).toBe('550e8400-e29b-41d4-a716-446655440000');
        expect(customer.name).toBe(props.name);
        expect(customer.email).toBe(props.email);
        expect(customer.nationalId).toBe(props.nationalId);
        expect(customer.status).toBe(CustomerStatus.ACTIVE);
    });

    it('should create customer without requiring id in props', () => {
        const props = {
            name: 'Test User',
            email: 'test@example.com',
            nationalId: '111.222.333-44',
            status: CustomerStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const customer = CustomerEntityFactory.create(props);

        expect(customer.id).toBeDefined();
        expect(customer.id).toBe('550e8400-e29b-41d4-a716-446655440000');
    });

    it('should create customer with INACTIVE status', () => {
        const props = {
            name: 'Inactive User',
            email: 'inactive@example.com',
            nationalId: '222.333.444-55',
            status: CustomerStatus.INACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const customer = CustomerEntityFactory.create(props);

        expect(customer.status).toBe(CustomerStatus.INACTIVE);
    });
});
