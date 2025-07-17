export const customerSchemas = {
    Customer: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                format: 'uuid',
                example: '01234567-89ab-cdef-0123-456789abcdef'
            },
            name: {
                type: 'string',
                example: 'João Silva'
            },
            email: {
                type: 'string',
                format: 'email',
                example: 'joao.silva@email.com'
            },
            national_id: {
                type: 'string',
                example: '12345678901'
            },
            status: {
                type: 'string',
                enum: ['ACTIVE', 'INACTIVE'],
                example: 'ACTIVE'
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
    CreateCustomerRequest: {
        type: 'object',
        required: ['name', 'email', 'national_id', 'status'],
        properties: {
            name: {
                type: 'string',
                example: 'João Silva'
            },
            email: {
                type: 'string',
                format: 'email',
                example: 'joao.silva@email.com'
            },
            national_id: {
                type: 'string',
                example: '12345678901'
            },
            status: {
                type: 'string',
                enum: ['ACTIVE', 'INACTIVE'],
                example: 'ACTIVE'
            }
        }
    }
};