import { PrismaClient } from '@prisma/client';

export interface TransactionPersistenceInterface {
    runInTransaction<T>(callback: (txContext: unknown) => Promise<T>): Promise<T>;
}

export class PrismaTransactionPersistence implements TransactionPersistenceInterface {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async runInTransaction<T>(callback: (txContext: unknown) => Promise<T>): Promise<T> {
        return this.prisma.$transaction(callback);
    }
} 