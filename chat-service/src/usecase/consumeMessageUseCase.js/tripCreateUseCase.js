export class TripCreateUseCase {
    constructor(dependencies) {
      this.tripRepository = new dependencies.repository.MongoTripRepository();
    }
  
    async execute(data) {
      try {
          // console.log('data',data); 
        await this.tripRepository.createTrip(data);
      } catch (error) {
        console.error(error);
      }
    }
  }