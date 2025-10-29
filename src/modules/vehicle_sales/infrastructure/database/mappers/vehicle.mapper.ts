import { Vehicle } from "@prisma/client";
import { VehicleEntity } from "@/modules/vehicle_sales/domain/entities/vehicle.entity";

/**
 * VehicleMapper
 *
 * Responsável pela conversão entre VehicleEntity (domínio) e modelos de persistência (Prisma).
 * Garante que detalhes do domínio não vazem para a camada de infraestrutura e vice-versa.
 */
export class VehicleMapper {
    /**
     * Converte modelo Prisma para VehicleEntity (domínio)
     */
    static toEntity(prismaVehicle: Vehicle): VehicleEntity {
        return new VehicleEntity({
            id: prismaVehicle.id,
            brand: prismaVehicle.brand,
            model: prismaVehicle.model,
            year: prismaVehicle.year,
            color: prismaVehicle.color,
            price: prismaVehicle.price,
            createdAt: prismaVehicle.createdAt,
            updatedAt: prismaVehicle.updatedAt,
        });
    }

    /**
     * Converte VehicleEntity (domínio) para dados de persistência (Prisma)
     * Retorna apenas os dados necessários para persistência, sem expor a entidade
     */
    static toPersistence(entity: VehicleEntity) {
        return {
            id: entity.id,
            brand: entity.brand,
            model: entity.model,
            year: entity.year,
            color: entity.color,
            price: entity.price,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
}
