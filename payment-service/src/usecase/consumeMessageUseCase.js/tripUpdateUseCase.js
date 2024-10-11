export class TripUpdateUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
        this.paymentRepository =  new dependencies.repository.MongoPaymentRepository()
    }
    async execute(id,data){
        try {
       const result = await this.tripRepository.findTripByIdAndUpdate(id,data)
       await this.paymentRepository.findTripAndUpdate(result._id,{paymentMethod:result.paymentMethod})
       return result
        } catch (error) {
            console.log(error);
            
        }
    
    }
}