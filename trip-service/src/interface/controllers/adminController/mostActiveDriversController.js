export class DriverWithMaxTripsController{
    constructor(dependencies){
        this.driverWithMaxTripsUseCase = new dependencies.useCase.MostActiveDriverUseCase(dependencies)
    }
    async mostActiveDrivers(req,res,next){
        try {
          const getMostActiveDrivers  =  await this.driverWithMaxTripsUseCase.execute()
          res.status(201).json({data:getMostActiveDrivers})
        } catch (error) {
            console.error(error)
        }
    }
}