import { UseCaseInterface } from "@/core/application/use-case.interface";

export class UpdatePaymentStatusUseCase implements UseCaseInterface<string, string> {
    async execute(request?: string): Promise<string> {
        // Implement your logic to update the payment status
        return "Payment status updated successfully";
    }
}