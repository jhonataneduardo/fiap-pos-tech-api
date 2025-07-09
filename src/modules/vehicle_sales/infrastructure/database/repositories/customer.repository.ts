import { PrismaClient } from "@prisma/client";

import prisma from '@/core/infrastructure/database/prisma.client';
import { CustomerRepositoryInterface } from "@/modules/vehicle_sales/domain/repositories/customer-respository.interface";
import { CustomerEntity } from "@/modules/vehicle_sales/domain/entities/customer.entity";
import { CustomerStatus } from "@/modules/vehicle_sales/domain/entities/enums";

export class PrismaCustomerRepository implements CustomerRepositoryInterface {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }
    async createCustomer(customerData: CustomerEntity, txContext?: unknown): Promise<CustomerEntity> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        const customer = await prismaClient.customer.create({
            data: {
                id: customerData.id,
                name: customerData.name,
                email: customerData.email,
                nationalId: customerData.nationalId,
                status: customerData.status as any,
                createdAt: customerData.createdAt,
                updatedAt: customerData.updatedAt,
            },
        });

        return new CustomerEntity({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            nationalId: customer.nationalId,
            status: customer.status as CustomerStatus,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
        });
    }

    async getCustomerByNationalId(nationalId: string, txContext?: unknown): Promise<CustomerEntity | null> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        const customer = await prismaClient.customer.findUnique({
            where: { nationalId: nationalId },
        });

        return customer ? new CustomerEntity({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            nationalId: customer.nationalId,
            status: customer.status as CustomerStatus,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
        }) : null;
    }
}