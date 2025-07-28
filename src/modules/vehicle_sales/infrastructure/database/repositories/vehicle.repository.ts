import { PrismaClient } from "@prisma/client";

import prisma from '@/core/infrastructure/database/prisma.client';

import { VehicleRepositoryInterface } from "@/modules/vehicle_sales/domain/repositories/vehicle-respository.interface";
import { VehicleEntity } from "@/modules/vehicle_sales/domain/entities/vehicle.entity";

export class PrismaVehicleRepository implements VehicleRepositoryInterface {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }
    async createVehicle(vehicleData: VehicleEntity, txContext?: unknown): Promise<VehicleEntity> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        const vehicle = await prismaClient.vehicle.create({
            data: {
                id: vehicleData.id,
                model: vehicleData.model,
                brand: vehicleData.brand,
                year: vehicleData.year,
                price: vehicleData.price,
                color: vehicleData.color,
                createdAt: vehicleData.createdAt,
                updatedAt: vehicleData.updatedAt,
            },
        });

        return new VehicleEntity({
            id: vehicle.id,
            model: vehicle.model,
            brand: vehicle.brand,
            year: vehicle.year,
            price: vehicle.price,
            color: vehicle.color,
            createdAt: vehicle.createdAt,
            updatedAt: vehicle.updatedAt,
        });
    }

    async getVehicleById(vehicleId: string, txContext?: unknown): Promise<VehicleEntity | null> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        const vehicle = await prismaClient.vehicle.findUnique({
            where: { id: vehicleId },
        });

        return vehicle ? new VehicleEntity({
            id: vehicle.id,
            model: vehicle.model,
            brand: vehicle.brand,
            year: vehicle.year,
            price: vehicle.price,
            color: vehicle.color,
            createdAt: vehicle.createdAt,
            updatedAt: vehicle.updatedAt,
        }) : null;
    }

    async updateVehicle(vehicleId: string, vehicleData: VehicleEntity, txContext?: unknown): Promise<VehicleEntity> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        const updatedVehicle = await prismaClient.vehicle.update({
            where: { id: vehicleId },
            data: {
                model: vehicleData.model,
                brand: vehicleData.brand,
                year: vehicleData.year,
                price: vehicleData.price,
                color: vehicleData.color,
                updatedAt: new Date(),
            },
        });

        return new VehicleEntity({
            id: updatedVehicle.id,
            model: updatedVehicle.model,
            brand: updatedVehicle.brand,
            year: updatedVehicle.year,
            price: updatedVehicle.price,
            color: updatedVehicle.color,
            createdAt: updatedVehicle.createdAt,
            updatedAt: updatedVehicle.updatedAt,
        });
    }

    async updateVehiclePartial(vehicleId: string, vehicleData: Partial<Omit<VehicleEntity, 'id' | 'createdAt'>>, txContext?: unknown): Promise<VehicleEntity> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        // Criar objeto de dados apenas com campos não-undefined
        const updateData: any = {
            updatedAt: new Date(),
        };

        if (vehicleData.model !== undefined) updateData.model = vehicleData.model;
        if (vehicleData.brand !== undefined) updateData.brand = vehicleData.brand;
        if (vehicleData.year !== undefined) updateData.year = vehicleData.year;
        if (vehicleData.price !== undefined) updateData.price = vehicleData.price;
        if (vehicleData.color !== undefined) updateData.color = vehicleData.color;

        const updatedVehicle = await prismaClient.vehicle.update({
            where: { id: vehicleId },
            data: updateData,
        });

        return new VehicleEntity({
            id: updatedVehicle.id,
            model: updatedVehicle.model,
            brand: updatedVehicle.brand,
            year: updatedVehicle.year,
            price: updatedVehicle.price,
            color: updatedVehicle.color,
            createdAt: updatedVehicle.createdAt,
            updatedAt: updatedVehicle.updatedAt,
        });
    }

    async getAllVehicles(txContext?: unknown): Promise<VehicleEntity[]> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        const vehicles = await prismaClient.vehicle.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return vehicles.map((vehicle: any) => new VehicleEntity({
            id: vehicle.id,
            model: vehicle.model,
            brand: vehicle.brand,
            year: vehicle.year,
            price: vehicle.price,
            color: vehicle.color,
            createdAt: vehicle.createdAt,
            updatedAt: vehicle.updatedAt,
        }));
    }

    async getAvailableVehicles(txContext?: unknown): Promise<VehicleEntity[]> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        const availableVehicles = await prismaClient.vehicle.findMany({
            where: {
                sales: {
                    none: {} // Veículos que não têm nenhuma venda
                }
            },
            orderBy: {
                price: 'asc' // Ordenar do mais barato para o mais caro
            }
        });

        return availableVehicles.map((vehicle: any) => new VehicleEntity({
            id: vehicle.id,
            model: vehicle.model,
            brand: vehicle.brand,
            year: vehicle.year,
            price: vehicle.price,
            color: vehicle.color,
            createdAt: vehicle.createdAt,
            updatedAt: vehicle.updatedAt,
        }));
    }
}