export class GetLatestTripsController{
    constructor(dependencies){
        this.latestTripsUseCase = new dependencies.useCase.GetLatestTripsUseCase(dependencies)
    }
    async latestTrips(req,res,next){
        try {
            const {driverId} = req.params
            console.log(driverId);
            
          const getTopTrips  =  await this.latestTripsUseCase.execute(driverId)
          res.status(201).json({data:getTopTrips})
        } catch (error) {
            console.error(error)
        }
    }
}