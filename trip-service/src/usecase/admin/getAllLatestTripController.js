export class GetAllLatestTripsUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(){
        try {
            return  await this.tripRepository.getAllLatestTrips()
         } catch (error) {
             console.error(error)
         }
             }
    }
    