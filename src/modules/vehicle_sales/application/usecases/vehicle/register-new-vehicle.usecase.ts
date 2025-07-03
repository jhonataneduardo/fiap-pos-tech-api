import { UseCaseInterface } from "@/core/application/use-case.interface";

export class RegisterNewVehicleUseCase implements UseCaseInterface<string, string> {
    async execute(request?: string): Promise<string> {
        // Implement your logic to register a new vehicle
        return "Vehicle registered successfully";
    }
}