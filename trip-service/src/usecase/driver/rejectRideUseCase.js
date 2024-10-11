export class RejectRideUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(tripId,status,driverId){
        try {

            await this.tripRepository.findTripByIdAndReject(tripId,status,driverId)
        } catch (error) {
            console.error(error)
        }
    }
}