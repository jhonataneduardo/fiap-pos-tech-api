import { VehicleEntity, VehicleEntityProps, VehicleEntityFactory } from './vehicle.entity';

jest.mock('uuid', () => ({
    v7: jest.fn(() => '550e8400-e29b-41d4-a716-446655440000'),
}));

describe('VehicleEntity', () => {
    const mockProps: VehicleEntityProps = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2024,
        color: 'Silver',
        price: 85000,
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        updatedAt: new Date('2024-01-02T00:00:00.000Z'),
    };

    it('should create a vehicle entity with correct properties', () => {
        const vehicle = new VehicleEntity(mockProps);

        expect(vehicle.id).toBe(mockProps.id);
        expect(vehicle.brand).toBe(mockProps.brand);
        expect(vehicle.model).toBe(mockProps.model);
        expect(vehicle.year).toBe(mockProps.year);
        expect(vehicle.color).toBe(mockProps.color);
        expect(vehicle.price).toBe(mockProps.price);
        expect(vehicle.createdAt).toEqual(mockProps.createdAt);
        expect(vehicle.updatedAt).toEqual(mockProps.updatedAt);
    });

    it('should inherit from BaseEntity', () => {
        const vehicle = new VehicleEntity(mockProps);

        expect(vehicle).toHaveProperty('id');
        expect(vehicle).toHaveProperty('createdAt');
        expect(vehicle).toHaveProperty('updatedAt');
    });

    it('should have all vehicle-specific properties', () => {
        const vehicle = new VehicleEntity(mockProps);

        expect(vehicle).toHaveProperty('brand');
        expect(vehicle).toHaveProperty('model');
        expect(vehicle).toHaveProperty('year');
        expect(vehicle).toHaveProperty('color');
        expect(vehicle).toHaveProperty('price');
    });
});

describe('VehicleEntityFactory', () => {
    it('should create a vehicle with auto-generated UUID', () => {
        const props = {
            brand: 'Honda',
            model: 'Civic',
            year: 2023,
            color: 'Black',
            price: 95000,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const vehicle = VehicleEntityFactory.create(props);

        expect(vehicle).toBeInstanceOf(VehicleEntity);
        expect(vehicle.id).toBe('550e8400-e29b-41d4-a716-446655440000');
        expect(vehicle.brand).toBe(props.brand);
        expect(vehicle.model).toBe(props.model);
        expect(vehicle.year).toBe(props.year);
        expect(vehicle.color).toBe(props.color);
        expect(vehicle.price).toBe(props.price);
    });

    it('should create vehicle without requiring id in props', () => {
        const props = {
            brand: 'Ford',
            model: 'Focus',
            year: 2022,
            color: 'Blue',
            price: 75000,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const vehicle = VehicleEntityFactory.create(props);

        expect(vehicle.id).toBeDefined();
        expect(vehicle.id).toBe('550e8400-e29b-41d4-a716-446655440000');
    });
});
