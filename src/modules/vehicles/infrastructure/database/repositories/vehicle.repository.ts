import { PrismaClient } from "@prisma/client";

import prisma from '@/core/infrastructure/database/prisma.client';

import { VehicleRepositoryInterface } from "@/modules/vehicles/domain/repositories/vehicle-respository.interface";
import { VehicleEntity } from "@/modules/vehicles/domain/entities/vehicle.entity";
import { VehicleMapper } from "../mappers/vehicle.mapper";

export class PrismaVehicleRepository implements VehicleRepositoryInterface {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }
    async createVehicle(vehicleData: VehicleEntity, txContext?: unknown): Promise<VehicleEntity> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        const vehicle = await prismaClient.vehicle.create({
            data: VehicleMapper.toPersistence(vehicleData),
        });

        return VehicleMapper.toEntity(vehicle);
    }

    async getVehicleById(vehicleId: string, txContext?: unknown): Promise<VehicleEntity | null> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        const vehicle = await prismaClient.vehicle.findUnique({
            where: { id: vehicleId },
        });

        return vehicle ? VehicleMapper.toEntity(vehicle) : null;
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

        return VehicleMapper.toEntity(updatedVehicle);
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

        return VehicleMapper.toEntity(updatedVehicle);
    }

    async getAllVehicles(txContext?: unknown): Promise<VehicleEntity[]> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        const vehicles = await prismaClient.vehicle.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return vehicles.map(vehicle => VehicleMapper.toEntity(vehicle));
    }

    async getAvailableVehicles(txContext?: unknown): Promise<VehicleEntity[]> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        // Retorna todos os veículos ordenados por preço
        // A lógica de disponibilidade (vendidos/não vendidos) agora é gerenciada pelo Sale API
        const availableVehicles = await prismaClient.vehicle.findMany({
            orderBy: {
                price: 'asc' // Ordenar do mais barato para o mais caro
            }
        });

        return availableVehicles.map(vehicle => VehicleMapper.toEntity(vehicle));
    }
}