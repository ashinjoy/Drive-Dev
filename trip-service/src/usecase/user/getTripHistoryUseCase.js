export class GetTripHistoryUseCase{
    constructor(dependencies){
    this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(userId,page){
        try {
          const getUsersTrips  =   await this.tripRepository.getUsersTrip(userId,page)
          const getUsersTotalTripCount = await this.tripRepository.getUsersTotalTripCount(userId)
          return {
            getUsersTrips,
            getUsersTotalTripCount
          }
        } catch (error) {
            console.error(error);
            throw error
        }
    }
}

