export class TopTripsController{
    constructor(dependencies){
        this.topTripsUseCase = new dependencies.useCase.TopTripUseCase(dependencies)
    }
    async topTrips(req,res,next){
        try {
            const {driverId} = req.params
            console.log(driverId);
            
          const getTopTrips  =  await this.topTripsUseCase.execute(driverId)
          res.status(201).json({data:getTopTrips})
        } catch (error) {
            console.error(error)
        }
    }
}