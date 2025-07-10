import { PrismaClient } from "@prisma/client";

import prisma from '@/core/infrastructure/database/prisma.client';

import { SaleRepositoryInterface, SaleWithVehicleData } from "@/modules/vehicle_sales/domain/repositories/sale-respository.interface";
import { SaleEntity } from "@/modules/vehicle_sales/domain/entities/sale.entity";
import { SaleStatus } from "@/modules/vehicle_sales/domain/entities/enums";

export class PrismaSaleRepository implements SaleRepositoryInterface {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async createSale(saleData: SaleEntity): Promise<SaleEntity> {
        const sale = await this.prisma.sale.create({
            data: {
                id: saleData.id,
                vehicleId: saleData.vehicleId,
                customerId: saleData.customerId,
                saleDate: saleData.saleDate,
                paymentCode: saleData.paymentCode,
                totalPrice: saleData.totalPrice,
                status: saleData.status,
                createdAt: saleData.createdAt,
                updatedAt: saleData.updatedAt,
            },
        });

        return new SaleEntity({
            id: sale.id,
            vehicleId: sale.vehicleId,
            customerId: sale.customerId,
            saleDate: sale.saleDate,
            paymentCode: sale.paymentCode,
            totalPrice: sale.totalPrice,
            status: sale.status as SaleStatus,
            createdAt: sale.createdAt,
            updatedAt: sale.updatedAt,
        });
    }

    async getSaleById(saleId: string): Promise<SaleEntity> {
        const sale = await this.prisma.sale.findUniqueOrThrow({
            where: { id: saleId },
        });

        return new SaleEntity({
            id: sale.id,
            vehicleId: sale.vehicleId,
            customerId: sale.customerId,
            saleDate: sale.saleDate,
            paymentCode: sale.paymentCode,
            totalPrice: sale.totalPrice,
            status: sale.status as SaleStatus,
            createdAt: sale.createdAt,
            updatedAt: sale.updatedAt,
        });
    }

    async updateSale(saleId: string, saleData: SaleEntity): Promise<SaleEntity> {
        const updatedSale = await this.prisma.sale.update({
            where: { id: saleId },
            data: {
                vehicleId: saleData.vehicleId,
                customerId: saleData.customerId,
                saleDate: saleData.saleDate,
                paymentCode: saleData.paymentCode,
                totalPrice: saleData.totalPrice,
                status: saleData.status,
                updatedAt: new Date(),
            },
        });

        return new SaleEntity({
            id: updatedSale.id,
            vehicleId: updatedSale.vehicleId,
            customerId: updatedSale.customerId,
            saleDate: updatedSale.saleDate,
            paymentCode: updatedSale.paymentCode,
            totalPrice: updatedSale.totalPrice,
            status: updatedSale.status as SaleStatus,
            createdAt: updatedSale.createdAt,
            updatedAt: updatedSale.updatedAt,
        });
    }

    async getSalesWithVehicles(txContext?: unknown): Promise<SaleWithVehicleData[]> {
        const prismaClient = txContext ? txContext as PrismaClient : this.prisma;

        const salesWithVehicles = await prismaClient.sale.findMany({
            include: {
                vehicle: true
            },
            orderBy: {
                vehicle: {
                    price: 'asc'
                }
            }
        });

        return salesWithVehicles.map((saleWithVehicle: any) => ({
            sale: new SaleEntity({
                id: saleWithVehicle.id,
                vehicleId: saleWithVehicle.vehicleId,
                customerId: saleWithVehicle.customerId,
                saleDate: saleWithVehicle.saleDate,
                paymentCode: saleWithVehicle.paymentCode,
                totalPrice: saleWithVehicle.totalPrice,
                status: saleWithVehicle.status as SaleStatus,
                createdAt: saleWithVehicle.createdAt,
                updatedAt: saleWithVehicle.updatedAt,
            }),
            vehicle: {
                id: saleWithVehicle.vehicle.id,
                brand: saleWithVehicle.vehicle.brand,
                model: saleWithVehicle.vehicle.model,
                year: saleWithVehicle.vehicle.year,
                color: saleWithVehicle.vehicle.color,
                price: saleWithVehicle.vehicle.price,
            }
        }));
    }
}
