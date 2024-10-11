export class RejectRideController{
    constructor(dependencies){
        this.rejectRideUseCase = new dependencies.useCase.RejectRideUseCase(dependencies)
    }
    async rejectRide(req,res,next){
        try {
            const {driverId,status,tripId} = req.body
            if(!driverId || !status || !tripId){
                const error = new Error()
                error.message = "Bad Request"
                error.status = 400
            }
         const rejectRideRequest =  await this.rejectRideUseCase.execute(tripId,status,driverId)
         res.status(200).json({message:"Ride Rejected"})
        } catch (error) {
            
        }
    }
}