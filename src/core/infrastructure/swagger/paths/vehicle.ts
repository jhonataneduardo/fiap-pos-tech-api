export const vehiclePaths = {
    '/vehicles': {
        post: {
            summary: 'Criar novo veículo',
            description: 'Cadastra um novo veículo no sistema',
            tags: ['Vehicles'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/CreateVehicleRequest'
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Veículo criado com sucesso',
                    content: {
                        'application/json': {
                            schema: {
                                allOf: [
                                    { $ref: '#/components/schemas/ApiResponse' },
                                    {
                                        type: 'object',
                                        properties: {
                                            content: {
                                                $ref: '#/components/schemas/Vehicle'
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
                }
            }
        },
        get: {
            summary: 'Listar todos os veículos',
            description: 'Lista todos os veículos cadastrados',
            tags: ['Vehicles'],
            responses: {
                200: {
                    description: 'Lista de veículos',
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
                                                    $ref: '#/components/schemas/Vehicle'
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
    },
    '/vehicles/{id}': {
        get: {
            summary: 'Buscar veículo por ID',
            description: 'Retorna os dados de um veículo específico',
            tags: ['Vehicles'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'uuid'
                    },
                    description: 'ID do veículo',
                    example: '01234567-89ab-cdef-0123-456789abcdef'
                }
            ],
            responses: {
                200: {
                    description: 'Veículo encontrado',
                    content: {
                        'application/json': {
                            schema: {
                                allOf: [
                                    { $ref: '#/components/schemas/ApiResponse' },
                                    {
                                        type: 'object',
                                        properties: {
                                            content: {
                                                $ref: '#/components/schemas/Vehicle'
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
                404: {
                    description: 'Veículo não encontrado',
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
        patch: {
            summary: 'Atualizar veículo',
            description: 'Atualiza dados de um veículo específico',
            tags: ['Vehicles'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'uuid'
                    },
                    description: 'ID do veículo',
                    example: '01234567-89ab-cdef-0123-456789abcdef'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/UpdateVehicleRequest'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Veículo atualizado com sucesso',
                    content: {
                        'application/json': {
                            schema: {
                                allOf: [
                                    { $ref: '#/components/schemas/ApiResponse' },
                                    {
                                        type: 'object',
                                        properties: {
                                            content: {
                                                $ref: '#/components/schemas/Vehicle'
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
                404: {
                    description: 'Veículo não encontrado',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ApiError'
                            }
                        }
                    }
                }
            }
        }
    },
    '/vehicles/available': {
        get: {
            summary: 'Listar veículos disponíveis',
            description: 'Lista todos os veículos disponíveis para venda',
            tags: ['Vehicles'],
            responses: {
                200: {
                    description: 'Lista de veículos disponíveis',
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
                                                    $ref: '#/components/schemas/Vehicle'
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
    },
    '/vehicles/sold': {
        get: {
            summary: 'Listar veículos vendidos',
            description: 'Lista todos os veículos que já foram vendidos',
            tags: ['Vehicles'],
            responses: {
                200: {
                    description: 'Lista de veículos vendidos',
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
                                                    $ref: '#/components/schemas/SoldVehicle'
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