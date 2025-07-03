import { UseCaseInterface } from "@/core/application/use-case.interface";

export class RegisterNewSaleUseCase implements UseCaseInterface<string, string> {
    async execute(request?: string): Promise<string> {
        // Implement your logic to register a new sale
        return "New sale registered successfully";
    }
}