import { userNotify } from "../../utils/socket.js";

export class StartRideUseCase{
constructor(dependencies){
    this.tripRepository = new dependencies.repository.MongoTripRepository()
}
async execute(inpOtp,userOtp,tripId) {
    try {
        if(inpOtp === userOtp){
            const dataToUpdate ={tripStatus:'started'}
          const updateTripStatus =  await this.tripRepository.findTripByIdAndUpdate(tripId,dataToUpdate)
          userNotify('ride-start','started',updateTripStatus?.userId)
          return updateTripStatus
        }
        const error = new Error()
        error.message = "OTP is not Valid"
        error.status = 400
        throw error
        
    } catch (error) {
        console.error(error)
        throw error
    }
    
}
}