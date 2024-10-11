export class GetLatestTripsUseCase{
constructor(dependencies){
    this.tripRepository = new dependencies.repository.MongoTripRepository()
}
async execute(driverId){
    try {
        return  await this.tripRepository.latestTrips(driverId)
     } catch (error) {
         console.error(error)
     }
         }
}
