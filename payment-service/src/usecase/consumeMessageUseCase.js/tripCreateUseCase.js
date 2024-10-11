export class TripCreateUseCase {
    constructor(dependencies) {
      this.tripRepository = new dependencies.repository.MongoTripRepository();
      this.paymentRepository = new dependencies.repository.MongoPaymentRepository()
    }
  
    async execute(data) {
      try {
          console.log('data',data); 
      const tripCreated =   await this.tripRepository.createTrip(data);
        await this.paymentRepository.createPayment({
          tripId:tripCreated._id,
          userId:tripCreated?.userId,
          paymentMethod:tripCreated?.paymentMethod
         })
      } catch (error) {
        console.error(error);
      }
    }
  }