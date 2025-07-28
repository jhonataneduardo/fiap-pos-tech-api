export const customerPaths = {
    '/customers': {
        post: {
            summary: 'Criar novo cliente',
            description: 'Cria um novo cliente no sistema',
            tags: ['Customers'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/CreateCustomerRequest'
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Cliente criado com sucesso',
                    content: {
                        'application/json': {
                            schema: {
                                allOf: [
                                    { $ref: '#/components/schemas/ApiResponse' },
                                    {
                                        type: 'object',
                                        properties: {
                                            content: {
                                                $ref: '#/components/schemas/Customer'
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
                400: {
                    description: 'Dados inválidos',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ApiError'
                            }
                        }
                    }
                },
                409: {
                    description: 'Cliente já existe',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ApiError'
                            }
                        }
                    }
                }
            }
        },
        get: {
            summary: 'Listar clientes',
            description: 'Lista todos os clientes com filtros opcionais',
            tags: ['Customers'],
            parameters: [
                {
                    in: 'query',
                    name: 'national_id',
                    schema: {
                        type: 'string'
                    },
                    description: 'Filtrar por CPF (busca parcial)',
                    example: '12345'
                }
            ],
            responses: {
                200: {
                    description: 'Lista de clientes',
                    content: {
                        'application/json': {
                            schema: {
                                allOf: [
                                    { $ref: '#/components/schemas/ApiResponse' },
                                    {
                                        type: 'object',
                                        properties: {
                                            content: {
                                                type: 'array',
                                                items: {
                                                    $ref: '#/components/schemas/Customer'
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
};