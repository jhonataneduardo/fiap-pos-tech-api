import { Customer } from "@prisma/client";
import { CustomerEntity } from "@/modules/vehicles/domain/entities/customer.entity";
import { CustomerStatus } from "@/modules/vehicles/domain/entities/enums";

/**
 * CustomerMapper
 *
 * Responsável pela conversão entre CustomerEntity (domínio) e modelos de persistência (Prisma).
 * Garante que detalhes do domínio não vazem para a camada de infraestrutura e vice-versa.
 */
export class CustomerMapper {
    /**
     * Converte modelo Prisma para CustomerEntity (domínio)
     */
    static toEntity(prismaCustomer: Customer): CustomerEntity {
        return new CustomerEntity({
            id: prismaCustomer.id,
            name: prismaCustomer.name,
            email: prismaCustomer.email,
            nationalId: prismaCustomer.nationalId,
            status: prismaCustomer.status as CustomerStatus,
            createdAt: prismaCustomer.createdAt,
            updatedAt: prismaCustomer.updatedAt,
        });
    }

    /**
     * Converte CustomerEntity (domínio) para dados de persistência (Prisma)
     * Retorna apenas os dados necessários para persistência, sem expor a entidade
     */
    static toPersistence(entity: CustomerEntity) {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            nationalId: entity.nationalId,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
}
