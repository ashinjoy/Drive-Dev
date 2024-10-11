export class TripUpdateController{
    constructor(dependencies){
this.tripUpdateUseCase = new dependencies.useCase.TripUpdateConsumerUseCase(dependencies)
    }
    async tripUpdatedConsumer(data){
        try {            
            const {tripId,driverId,paymentMethod} = data
            const dataToUpdate = {
                isPaymentComplete:true,
                paymentMethod:paymentMethod
            }
            await this.tripUpdateUseCase.execute(tripId,dataToUpdate,driverId)
        } catch (error) {
            console.error(error);
            
        }
    }
    
}