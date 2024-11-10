export class CreatePaymentController{
    constructor(dependencies){
this.createPaymentUseCase = new dependencies.useCase.CreatePaymentUseCase(dependencies)
    }
    async createPayment(data){
try {
    await this.createPaymentUseCase.execute(data)
} catch (error) {
    console.error(error);
    next(error)
    
}
    }
}