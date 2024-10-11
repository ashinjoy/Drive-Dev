export class StartRideController{
    constructor(dependencies){
this.startRideUseCase = new dependencies.useCase.StartRideUseCase(dependencies) 
    }
    async startRide(req,res,next){
        try {
            const  {tripOtp,tripId} = req.body
            if(!tripId || !tripOtp){
                const error = new Error()
                error.message = "Bad Request"
                error.status = 400
                throw error
            }
            const {otp} = req.session            
            const updatedTrip =   await this.startRideUseCase.execute(tripOtp,otp,tripId)
            res.status(200).json({tripDetail:updatedTrip,message:'Ride started SucessFully'})
        } catch (error) {
            console.error(error);
            next(error)
        }
    }
}