export const salePaths = {
    '/sales': {
        post: {
            summary: 'Criar nova venda',
            description: 'Registra uma nova venda no sistema',
            tags: ['Sales'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/CreateSaleRequest'
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Venda criada com sucesso',
                    content: {
                        'application/json': {
                            schema: {
                                allOf: [
                                    { $ref: '#/components/schemas/ApiResponse' },
                                    {
                                        type: 'object',
                                        properties: {
                                            content: {
                                                $ref: '#/components/schemas/Sale'
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
                    description: 'Cliente ou veículo não encontrado',
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
    '/webhook/payment': {
        post: {
            summary: 'Webhook de pagamento',
            description: 'Endpoint para receber notificações de status de pagamento',
            tags: ['Webhooks'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/PaymentWebhookRequest'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Status de pagamento atualizado com sucesso',
                    content: {
                        'application/json': {
                            schema: {
                                allOf: [
                                    { $ref: '#/components/schemas/ApiResponse' },
                                    {
                                        type: 'object',
                                        properties: {
                                            content: {
                                                $ref: '#/components/schemas/PaymentStatusResponse'
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
                400: {
                    description: 'Dados inválidos ou status já atualizado',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ApiError'
                            }
                        }
                    }
                },
                404: {
                    description: 'Venda não encontrada',
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
    }
};