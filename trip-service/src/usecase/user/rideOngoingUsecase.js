import { S3Config } from "../../utils/s3-bucketConfig.js";
export class RideOngoingUseCase{
    constructor(depedencies){
        this.tripRepository = new depedencies.repository.MongoTripRepository(depedencies)
    }
    async execute(userId){
        try {
         const ongoingTrip =    await this.tripRepository.getTripsByUserId(userId)
      const awsS3 = new S3Config()
      if(!ongoingTrip){
        return
      }
      const profileUrl = await awsS3.getImageUrl({type:"ProfileImg",Key:ongoingTrip?.driverId?.profileImg})
         const dataToUser = {
            driverDetails:{
                name:ongoingTrip?.driverId?.name,
                email:ongoingTrip?.driverId?.email,
                phone:ongoingTrip?.driverId?.phone,
                currentLocation:ongoingTrip?.driverId?.currentLocation,
                profileImg:profileUrl.url,
                vehicleDetails:{
                    vehicleType:ongoingTrip?.driverId?.vehicleDetails?.vehicle_type,
                    rc_No:ongoingTrip?.driverId?.vehicleDetails?.rc_Number
                },
            },
            driverId:ongoingTrip?.driverId?._id,
            userId:ongoingTrip?.userId,
            tripStatus:ongoingTrip?.tripStatus,
            fare:ongoingTrip?.fare,
            startLocation:ongoingTrip?.startLocation,
            endLocation:ongoingTrip?.endLocation,
            startTime:ongoingTrip?.startTime,
            endTime:ongoingTrip?.endTime,
            distance:ongoingTrip?.distance,
            duration:ongoingTrip?.duration,
            pickUpLocation:ongoingTrip?.pickUpLocation,
            dropOffLocation:ongoingTrip?.dropOffLocation,
            paymentMethod:ongoingTrip?.paymentMethod,
            isPaymentComplete:ongoingTrip?.isPaymentComplete,
            _id:ongoingTrip?._id
    
          }
            return dataToUser
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}