export class TopTripUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(driverId){
try {
   return  await this.tripRepository.topTrips(driverId)
} catch (error) {
    console.error(error)
}
    }
}