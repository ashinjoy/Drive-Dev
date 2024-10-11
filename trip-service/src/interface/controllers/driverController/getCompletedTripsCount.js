export class CompletedTripsCountController{
    constructor(dependencies){
        this.completedTripsCountUseCase = new dependencies.useCase.CompletedTripCountUseCase(dependencies)
    }
    async getCompletedTripsCount(req,res,next){
        try {
            const {driverId} = req.params
           const completedTrips =  await this.completedTripsCountUseCase.execute(driverId)
           res.status(201).json({tripCount:completedTrips})
            
        } catch (error) {
            console.error(error);
            
        }
    }
}