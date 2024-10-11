export class TripReportController{
    constructor(dependencies){
        this.tripReportUseCase = new dependencies.useCase.TripReportUseCase(dependencies)
    }
    async tripReport(req,res,next){
        try {
            const {filter} = req.params
            if(!filter){
                const error = new Error()
                error.status = 400
                error.message = "Bad Request"
                throw error
            }
          const getTripCountForChart =   await this.tripReportUseCase.execute(filter)
          res.status(201).json({tripStat:getTripCountForChart})
            
        } catch (error) {
            console.error(error);
            next(error)
        }
    }
}