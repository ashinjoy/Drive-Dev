export class TripCountController{
    constructor(dependencies){
        this.tripCountUseCase = new dependencies.useCase.TripCountUseCase(dependencies)
    }
    async tripCount(req,res,next){
        try {
            console.log('iin cont');
            
            const {driverId,filter} = req.query
            if(!filter || !driverId){
                const error = new Error()
                error.status = 400
                error.message = "Bad Request"
                throw error
            }
          const getTripCountForChart =   await this.tripCountUseCase.execute(driverId,filter)
          res.status(201).json({tripStat:getTripCountForChart})

        } catch (error) {
            
        }
       
    }
}