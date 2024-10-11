export class TotalTripsCompleted{
    constructor(dependencies){
        this.totalTripsCompletedUseCase = new dependencies.useCase.TotalTripsCountUseCase(dependencies)
    }
    async totalTrips(req,res,next){
        try {
          const getTotalTripsCount  =  await this.totalTripsCompletedUseCase.execute()
          res.status(201).json({data:getTotalTripsCount})
        } catch (error) {
            console.error(error)
        }
    }
}