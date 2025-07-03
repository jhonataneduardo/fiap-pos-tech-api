import { UseCaseInterface } from "@/core/application/use-case.interface";

export class FindSoldVehiclesUseCase implements UseCaseInterface<string, string> {
    async execute(request?: string): Promise<string> {
        // Implement your logic to find sold vehicles
        return "Sold vehicles found successfully";
    }
}