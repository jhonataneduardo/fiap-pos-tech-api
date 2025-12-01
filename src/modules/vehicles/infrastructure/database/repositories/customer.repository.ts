import { PrismaClient } from "@prisma/client";

import prisma from '@/core/infrastructure/database/prisma.client';
import { CustomerRepositoryInterface, CustomerFilters } from "@/modules/vehicles/domain/repositories/customer-respository.interface";
import { CustomerEntity } from "@/modules/vehicles/domain/entities/customer.entity";
import { CustomerMapper } from "../mappers/customer.mapper";

export class PrismaCustomerRepository implements CustomerRepositoryInterface {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }
    async createCustomer(customerData: CustomerEntity, txContext?: unknown): Promise<CustomerEntity> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        const customer = await prismaClient.customer.create({
            data: CustomerMapper.toPersistence(customerData),
        });

        return CustomerMapper.toEntity(customer);
    }

    async getCustomerByNationalId(nationalId: string, txContext?: unknown): Promise<CustomerEntity | null> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        const customer = await prismaClient.customer.findUnique({
            where: { nationalId: nationalId },
        });

        return customer ? CustomerMapper.toEntity(customer) : null;
    }

    async getAllCustomers(filters?: CustomerFilters, txContext?: unknown): Promise<CustomerEntity[]> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        // Construir o objeto where dinamicamente baseado nos filtros
        const whereClause: any = {};

        if (filters?.national_id) {
            whereClause.nationalId = {
                contains: filters.national_id,
                mode: 'insensitive'
            };
        }

        const customers = await prismaClient.customer.findMany({
            where: whereClause,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return customers.map(customer => CustomerMapper.toEntity(customer));
    }
}