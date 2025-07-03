import { UseCaseInterface } from "@/core/application/use-case.interface";

export class FindAvailableVehiclesUseCase implements UseCaseInterface<string, string> {
    async execute(request?: string): Promise<string> {
        // Implement your logic to find available vehicles
        return "Available vehicles found successfully";
    }
}