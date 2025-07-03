import { UseCaseInterface } from "@/core/application/use-case.interface";

export class UpdateVehicleUseCase implements UseCaseInterface<string, string> {
    async execute(request?: string): Promise<string> {
        // Implement your logic to update a vehicle
        return "Vehicle updated successfully";
    }
}