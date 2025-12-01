import { SaleEntity, SaleEntityProps, SaleEntityFactory } from './sale.entity';
import { SaleStatus } from './enums';

jest.mock('uuid', () => ({
    v7: jest.fn(() => '550e8400-e29b-41d4-a716-446655440000'),
}));

describe('SaleEntity', () => {
    const mockProps: SaleEntityProps = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        vehicleId: 'vehicle-123',
        customerId: 'customer-456',
        saleDate: new Date('2024-01-15T10:00:00.000Z'),
        paymentCode: 'PAY-12345678',
        totalPrice: 85000,
        status: SaleStatus.PENDING,
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        updatedAt: new Date('2024-01-02T00:00:00.000Z'),
    };

    it('should create a sale entity with correct properties', () => {
        const sale = new SaleEntity(mockProps);

        expect(sale.id).toBe(mockProps.id);
        expect(sale.vehicleId).toBe(mockProps.vehicleId);
        expect(sale.customerId).toBe(mockProps.customerId);
        expect(sale.saleDate).toEqual(mockProps.saleDate);
        expect(sale.paymentCode).toBe(mockProps.paymentCode);
        expect(sale.totalPrice).toBe(mockProps.totalPrice);
        expect(sale.status).toBe(SaleStatus.PENDING);
        expect(sale.createdAt).toEqual(mockProps.createdAt);
        expect(sale.updatedAt).toEqual(mockProps.updatedAt);
    });

    it('should inherit from BaseEntity', () => {
        const sale = new SaleEntity(mockProps);

        expect(sale).toHaveProperty('id');
        expect(sale).toHaveProperty('createdAt');
        expect(sale).toHaveProperty('updatedAt');
    });

    it('should have all sale-specific properties', () => {
        const sale = new SaleEntity(mockProps);

        expect(sale).toHaveProperty('vehicleId');
        expect(sale).toHaveProperty('customerId');
        expect(sale).toHaveProperty('saleDate');
        expect(sale).toHaveProperty('paymentCode');
        expect(sale).toHaveProperty('totalPrice');
        expect(sale).toHaveProperty('status');
    });

    it('should handle PAID status', () => {
        const paidProps = { ...mockProps, status: SaleStatus.PAID };
        const sale = new SaleEntity(paidProps);

        expect(sale.status).toBe(SaleStatus.PAID);
    });

    it('should handle CANCELLED status', () => {
        const cancelledProps = { ...mockProps, status: SaleStatus.CANCELLED };
        const sale = new SaleEntity(cancelledProps);

        expect(sale.status).toBe(SaleStatus.CANCELLED);
    });
});

describe('SaleEntityFactory', () => {
    it('should create a sale with auto-generated UUID and payment code', () => {
        const props = {
            vehicleId: 'vehicle-789',
            customerId: 'customer-012',
            saleDate: new Date('2024-02-01T14:30:00.000Z'),
            totalPrice: 95000,
            status: SaleStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const sale = SaleEntityFactory.create(props);

        expect(sale).toBeInstanceOf(SaleEntity);
        expect(sale.id).toBe('550e8400-e29b-41d4-a716-446655440000');
        expect(sale.paymentCode).toMatch(/^PAY-[A-Z0-9]+$/);
        expect(sale.vehicleId).toBe(props.vehicleId);
        expect(sale.customerId).toBe(props.customerId);
        expect(sale.totalPrice).toBe(props.totalPrice);
        expect(sale.status).toBe(SaleStatus.PENDING);
    });

    it('should create sale without requiring id and paymentCode in props', () => {
        const props = {
            vehicleId: 'vehicle-abc',
            customerId: 'customer-def',
            saleDate: new Date(),
            totalPrice: 75000,
            status: SaleStatus.PAID,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const sale = SaleEntityFactory.create(props);

        expect(sale.id).toBeDefined();
        expect(sale.paymentCode).toBeDefined();
        expect(sale.paymentCode).toMatch(/^PAY-[A-Z0-9]+$/);
    });

    it('should generate payment code from UUID slice', () => {
        const props = {
            vehicleId: 'vehicle-xyz',
            customerId: 'customer-xyz',
            saleDate: new Date(),
            totalPrice: 50000,
            status: SaleStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const sale = SaleEntityFactory.create(props);

        // Validates pattern PAY-{UPPERCASE ALPHANUMERIC}
        expect(sale.paymentCode).toMatch(/^PAY-[A-Z0-9]+$/);
        expect(sale.paymentCode.length).toBeGreaterThan(4);
    });

    it('should create sale with different statuses', () => {
        const paidProps = {
            vehicleId: 'v1',
            customerId: 'c1',
            saleDate: new Date(),
            totalPrice: 100000,
            status: SaleStatus.PAID,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const sale = SaleEntityFactory.create(paidProps);
        expect(sale.status).toBe(SaleStatus.PAID);
    });
});
