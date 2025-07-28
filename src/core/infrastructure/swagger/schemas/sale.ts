export const saleSchemas = {
    Sale: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                format: 'uuid',
                example: '01234567-89ab-cdef-0123-456789abcdef'
            },
            vehicle_id: {
                type: 'string',
                format: 'uuid',
                example: '01234567-89ab-cdef-0123-456789abcdef'
            },
            customer_id: {
                type: 'string',
                format: 'uuid',
                example: '01234567-89ab-cdef-0123-456789abcdef'
            },
            sale_date: {
                type: 'string',
                format: 'date-time',
                example: '2024-01-15T10:30:00.000Z'
            },
            payment_code: {
                type: 'string',
                example: 'PAY-ABC12345'
            },
            total_price: {
                type: 'number',
                example: 120000.00
            },
            status: {
                type: 'string',
                enum: ['PENDING', 'PAID', 'CANCELLED'],
                example: 'PENDING'
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
    CreateSaleRequest: {
        type: 'object',
        required: ['vehicle_id', 'customer_national_id'],
        properties: {
            vehicle_id: {
                type: 'string',
                format: 'uuid',
                example: '01234567-89ab-cdef-0123-456789abcdef'
            },
            customer_national_id: {
                type: 'string',
                example: '12345678901'
            }
        }
    },
    PaymentWebhookRequest: {
        type: 'object',
        required: ['payment_code', 'status'],
        properties: {
            payment_code: {
                type: 'string',
                example: 'PAY-ABC12345'
            },
            status: {
                type: 'string',
                enum: ['PAID', 'CANCELLED'],
                example: 'PAID'
            }
        }
    },
    PaymentStatusResponse: {
        type: 'object',
        properties: {
            payment_code: {
                type: 'string',
                example: 'PAY-ABC12345'
            },
            previous_status: {
                type: 'string',
                example: 'PENDING'
            },
            new_status: {
                type: 'string',
                example: 'PAID'
            },
            updated_at: {
                type: 'string',
                format: 'date-time',
                example: '2024-01-15T10:30:00.000Z'
            }
        }
    }
};