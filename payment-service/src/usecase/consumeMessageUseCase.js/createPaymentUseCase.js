export class CreatePaymentUseCase{
    constructor(dependencies){
this.paymentRepository = new dependencies.repository.MongoPaymentRepository()
    }
    async execute(data){
        try {
            await this.paymentRepository.createPayment(data)
        } catch (error) {
            console.error(error);
            
        }
    }
}