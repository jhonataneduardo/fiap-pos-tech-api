export const vehicleSchemas = {
    Vehicle: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                format: 'uuid',
                example: '01234567-89ab-cdef-0123-456789abcdef'
            },
            model: {
                type: 'string',
                example: 'Corolla'
            },
            brand: {
                type: 'string',
                example: 'Toyota'
            },
            year: {
                type: 'integer',
                example: 2024
            },
            price: {
                type: 'number',
                example: 120000.00
            },
            color: {
                type: 'string',
                example: 'Branco'
            },
            created_at: {
                type: 'string',
                format: 'date-time',
                example: '2024-01-15T10:30:00.000Z'
            },
            updated_at: {
                type: 'string',
                format: 'date-time',
                example: '2024-01-15T10:30:00.000Z'
            }
        }
    },
    CreateVehicleRequest: {
        type: 'object',
        required: ['model', 'brand', 'year', 'price', 'color'],
        properties: {
            model: {
                type: 'string',
                example: 'Corolla'
            },
            brand: {
                type: 'string',
                example: 'Toyota'
            },
            year: {
                type: 'integer',
                example: 2024
            },
            price: {
                type: 'number',
                example: 120000.00
            },
            color: {
                type: 'string',
                example: 'Branco'
            }
        }
    },
    UpdateVehicleRequest: {
        type: 'object',
        properties: {
            model: {
                type: 'string',
                example: 'Corolla'
            },
            brand: {
                type: 'string',
                example: 'Toyota'
            },
            year: {
                type: 'integer',
                example: 2024
            },
            price: {
                type: 'number',
                example: 115000.00
            },
            color: {
                type: 'string',
                example: 'Prata'
            }
        }
    },
    SoldVehicle: {
        type: 'object',
        properties: {
            sale_id: {
                type: 'string',
                format: 'uuid',
                example: '01234567-89ab-cdef-0123-456789abcdef'
            },
            vehicle_id: {
                type: 'string',
                format: 'uuid',
                example: '01234567-89ab-cdef-0123-456789abcdef'
            },
            vehicle_brand: {
                type: 'string',
                example: 'Toyota'
            },
            vehicle_model: {
                type: 'string',
                example: 'Corolla'
            },
            vehicle_year: {
                type: 'integer',
                example: 2024
            },
            vehicle_color: {
                type: 'string',
                example: 'Branco'
            },
            vehicle_price: {
                type: 'number',
                example: 120000.00
            },
            sale_date: {
                type: 'string',
                format: 'date-time',
                example: '2024-01-15T10:30:00.000Z'
            },
            sale_total_price: {
                type: 'number',
                example: 120000.00
            },
            payment_code: {
                type: 'string',
                example: 'PAY-ABC12345'
            },
            sale_status: {
                type: 'string',
                enum: ['PENDING', 'PAID', 'CANCELLED'],
                example: 'PAID'
            }
        }
    }
};