export class TotalTripsCountUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(){
        try {
            return  await this.tripRepository.getTotalTripsCompletedCount()
         } catch (error) {
             console.error(error)
         }
             }
    }
    