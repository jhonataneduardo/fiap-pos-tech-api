export const commonSchemas = {
    ApiResponse: {
        type: 'object',
        properties: {
            success: {
                type: 'boolean',
                example: true
            },
            content: {
                type: 'object'
            }
        }
    },
    ApiError: {
        type: 'object',
        properties: {
            success: {
                type: 'boolean',
                example: false
            },
            error: {
                type: 'object',
                properties: {
                    code: {
                        type: 'string',
                        example: 'NOT_FOUND'
                    },
                    message: {
                        type: 'string',
                        example: 'Resource not found'
                    }
                }
            }
        }
    }
};