export class AcceptRideController{
    constructor(dependencies){
        this.acceptRideUseCase  = new dependencies.useCase.AcceptRideUseCase(dependencies)
    }
    async acceptRide(req,res,next){
        try {
            const {tripId,driverId,status} = req.body

            if(!tripId || !driverId || !status){
                const error = new Error()
                error.message = "Bad Request"
                error.status = 400
                throw error
            }
          const acceptRide =  await this.acceptRideUseCase.execute(tripId,driverId,status)
          req.session.otp = acceptRide?.otp
          res.status(201).json({acceptRide:acceptRide?.acceptRequest})
        } catch (error) {
            console.error(error);
            next(error)
            
        }
        
    }
}