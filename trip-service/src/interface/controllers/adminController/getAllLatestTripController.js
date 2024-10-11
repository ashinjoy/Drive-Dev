export class GetAllLatestTripsController{
    constructor(dependencies){
        this.latestTripsUseCase = new dependencies.useCase.GetAllLatestTripsUseCase(dependencies)
    }
    async latestTrips(req,res,next){
        try {
          const getAllLatestTrips  =  await this.latestTripsUseCase.execute()
          res.status(201).json({data:getAllLatestTrips})
        } catch (error) {
            console.error(error)
        }
    }
}