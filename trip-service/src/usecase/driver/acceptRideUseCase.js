import { userNotify } from "../../utils/socket.js";
import generateOTP from "../../utils/generateOtp.js";
import sendMail from "../../utils/nodemailer.js";
import { S3Config } from "../../utils/s3-bucketConfig.js";
import { KafkaClient } from "../../events/KafkaClient.js";
import {TRIP_TOPIC,TRIP_UPDATED} from '../../events/config.js'
export class AcceptRideUseCase {
  constructor(dependencies) {
    this.tripRepository = new dependencies.repository.MongoTripRepository();
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
    this.kafka = new KafkaClient()
  }
  async execute(tripId, driverId, status) {
    try {
      if(!tripId || !driverId ||!status){
        const error = new Error()
        error.status = 400
        error.message = "Bad Request"
        throw error
      }
      const dataToUpdate = {
        driverId: driverId,
        requestStatus: status,
        tripStatus: status,
      };
      
      const acceptRequest = await this.tripRepository.findTripByIdAndUpdate(tripId,dataToUpdate);

      const dataToPublish = {
        _id:acceptRequest?._id,
        userId:acceptRequest?.userId,
        driverId:acceptRequest?.driverId,
        tripStatus:acceptRequest?.tripStatus,
        requestStatus:acceptRequest?.requestStatus,
        rejectedDrivers:acceptRequest?.rejectedDrivers,
        fare:acceptRequest?.fare,
        startLocation:acceptRequest?.startLocation,
        endLocation:acceptRequest?.endLocation,
        startTime:acceptRequest?.startTime,
        endTime:acceptRequest?.endTime,
        distance:acceptRequest?.distance,
        duration:acceptRequest?.duration,
        pickupLocation:acceptRequest?.pickupLocation,
        dropOffLocation:acceptRequest?.dropOffLocation,
        createdAt:acceptRequest?.createdAt
      }

      this.kafka.produceMessage(TRIP_TOPIC,{
        type:TRIP_UPDATED,
        value:JSON.stringify(dataToPublish)
      })

      const findTrip = await this.tripRepository.findTrip(tripId);
      const findUserEmail = findTrip.userId?.email
      const otp = generateOTP();
      console.log("otp for Driver", "=============>", otp);
      await sendMail(otp, findUserEmail);
      const awsS3 = new S3Config()
      const profileUrl = await awsS3.getImageUrl({type:"ProfileImg",Key:acceptRequest?.driverId?.profileImg})
      const dataToUser = {
        driverDetails:{
            name:acceptRequest?.driverId?.name,
            email:acceptRequest?.driverId?.email,
            phone:acceptRequest?.driverId?.phone,
            currentLocation:acceptRequest?.driverId?.currentLocation,
            profileImg:profileUrl.url,
            vehicleDetails:{
                vehicleType:acceptRequest?.driverId?.vehicleDetails?.vehicle_type,
                rc_No:acceptRequest?.driverId?.vehicleDetails?.rc_Number
            },
        },
        driverId:acceptRequest?.driverId?._id,
        userId:acceptRequest?.userId,
        tripStatus:acceptRequest?.tripStatus,
        fare:acceptRequest?.fare,
        startLocation:acceptRequest?.startLocation,
        endLocation:acceptRequest?.endLocation,
        startTime:acceptRequest?.startTime,
        endTime:acceptRequest?.endTime,
        distance:acceptRequest?.distance,
        duration:acceptRequest?.duration,
        pickUpLocation:acceptRequest?.pickUpLocation,
        dropOffLocation:acceptRequest?.dropOffLocation,
        paymentMethod:acceptRequest?.paymentMethod,
        otp,
        _id:acceptRequest?._id

      }
      console.log('datoToUser',dataToUser);
      
      userNotify("ride-accept", dataToUser, acceptRequest.userId);
      return { acceptRequest, otp };
    } catch (error) {
      console.error(error);
      throw error
    }
  }
}
