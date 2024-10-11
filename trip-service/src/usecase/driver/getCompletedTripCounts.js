export class CompletedTripCountUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(driverId){
        try {
            // const {driverId} = req.params
         const count =    await this.tripRepository.completedTripCount(driverId)
         return count
            
        } catch (error) {
            console.error(error);
            
        }
    }
}