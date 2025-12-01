import { PrismaClient } from '@prisma/client';
import { CustomerStatus } from '@/modules/vehicle_sales/domain/entities/enums';

const prisma = new PrismaClient();

const seedData = {
    customers: [
        {
            id: '01234567-89ab-cdef-0123-456789abcdef',
            name: 'João Silva',
            email: 'joao.silva@email.com',
            nationalId: '12345678901',
            status: CustomerStatus.ACTIVE,
        },
        {
            id: '01234567-89ab-cdef-0123-456789abcde0',
            name: 'Maria Santos',
            email: 'maria.santos@email.com',
            nationalId: '98765432100',
            status: CustomerStatus.ACTIVE,
        },
        {
            id: '01234567-89ab-cdef-0123-456789abcde1',
            name: 'Pedro Oliveira',
            email: 'pedro.oliveira@email.com',
            nationalId: '11122233344',
            status: CustomerStatus.INACTIVE,
        },
    ],
    vehicles: [
        {
            id: '01234567-89ab-cdef-0123-456789abcde2',
            brand: 'Toyota',
            model: 'Corolla',
            year: 2024,
            color: 'Branco',
            price: 120000,
        },
        {
            id: '01234567-89ab-cdef-0123-456789abcde3',
            brand: 'Honda',
            model: 'Civic',
            year: 2023,
            color: 'Prata',
            price: 115000,
        },
        {
            id: '01234567-89ab-cdef-0123-456789abcde4',
            brand: 'Volkswagen',
            model: 'Jetta',
            year: 2024,
            color: 'Preto',
            price: 130000,
        },
        {
            id: '01234567-89ab-cdef-0123-456789abcde5',
            brand: 'Ford',
            model: 'Focus',
            year: 2023,
            color: 'Azul',
            price: 95000,
        },
        {
            id: '01234567-89ab-cdef-0123-456789abcde6',
            brand: 'Hyundai',
            model: 'Elantra',
            year: 2024,
            color: 'Vermelho',
            price: 105000,
        },
    ],
};

async function main() {
    console.log('🌱 Starting database seeding...');

    try {
        // Clean existing data (only Customer and Vehicle now)
        await prisma.vehicle.deleteMany({});
        await prisma.customer.deleteMany({});

        console.log('🧹 Cleared existing data');

        for (const customer of seedData.customers) {
            await prisma.customer.create({
                data: {
                    ...customer,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
        }
        console.log(`✅ Created ${seedData.customers.length} customers`);

        for (const vehicle of seedData.vehicles) {
            await prisma.vehicle.create({
                data: {
                    ...vehicle,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
        }
        console.log(`✅ Created ${seedData.vehicles.length} vehicles`);

        console.log('🌱 Database seeding completed successfully!');
        console.log('ℹ️  Note: Sales data is now managed by fiap-pos-tech-api-sale');
    } catch (error) {
        console.error('❌ Error during database seeding:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();