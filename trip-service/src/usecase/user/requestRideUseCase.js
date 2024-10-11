import { notifyDriver ,emitEvent} from "../../utils/socket.js";
import { RideRequestQueue } from "../../utils/helpers/rideRequestQueue.js";
import { generateRandomUniqueId } from "../../utils/createUniqueId.js";
import { KafkaClient } from "../../events/KafkaClient.js";
import { TRIP_TOPIC,TRIP_CREATED } from "../../events/config.js";

export class RideRequestUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
    this.tripRepository = new dependencies.repository.MongoTripRepository();
    this.requestQueue = new RideRequestQueue();
    this.kafka = new KafkaClient()
  }
  async execute(data) {
 
  try {
   
    const { userId, fare, distance, duration, pickUpCoords, dropCoords, vehicleType,pickupLocation,dropLocation,paymentMethod } = data;
    if (!userId || !fare || !distance || !duration || !pickUpCoords || !dropCoords || !paymentMethod) {
      const error =  new Error();
      error.message = 'Bad Request: Provide necessary details for the request'
      error.status = 400
      throw error
    }
    const [pickupLongitude, pickupLatitude] = pickUpCoords.map(coord => parseFloat(coord));
    const [dropOffLongitude, dropOffLatitude] = dropCoords.map(coord => parseFloat(coord));
    const tripId = generateRandomUniqueId();
    const dataToInsert = {
      tripId,
      userId,
      fare,
      distance: parseInt(distance),
      duration: parseInt(duration),
      startLocation: {
        type: "Point",
        coordinates: [pickupLongitude, pickupLatitude],
      },
      endLocation: {
        type: "Point",
        coordinates: [dropOffLongitude, dropOffLatitude],
      },
      pickUpLocation:pickupLocation,
      dropOffLocation:dropLocation,
      paymentMethod
    };

  
    const createTrip = await this.tripRepository.createTrip(dataToInsert);

    const dataToPublish ={
      _id:createTrip?._id,
      userId:createTrip?.userId,
      driverId:createTrip?.driverId,
      tripStatus:createTrip?.tripStatus,
      requestStatus:createTrip?.requestStatus,
      rejectedDrivers:createTrip?.rejectedDrivers,
      fare:createTrip?.fare,
      startLocation:createTrip?.startLocation,
      endLocation:createTrip?.endLocation,
      startTime:createTrip?.startTime,
      endTime:createTrip?.endTime,
      distance:createTrip?.distance,
      duration:createTrip?.duration,
      pickUpLocation:createTrip?.pickUpLocation,
      dropOffLocation:createTrip?.dropOffLocation,
      createdAt:createTrip?.createdAt
    }

    this.kafka.produceMessage(TRIP_TOPIC,{
      type:TRIP_CREATED,
      value:JSON.stringify(dataToPublish)
    })

    const nearestDrivers = await this.driverRepository.rideRequestToSelectedVehicle(
      pickUpCoords, 
      vehicleType
    );
    nearestDrivers.forEach(driver => this.requestQueue.enqueue(driver._id));
    console.log(this.requestQueue.print())
    const handleRequest = async () => { 
      if (this.requestQueue.isEmpty()) {
        console.log("Request queue is empty");
        return
      }
      const driverId = this.requestQueue.dequeue();
      notifyDriver("ride-request", createTrip, driverId);      
      const handleDriverResponse = async () => {
        try {
          const trip = await this.tripRepository.findTrip(createTrip._id);
          const { requestStatus } = trip;
          if (requestStatus === "accepted") {
            return{
              requestCurrentStatus:"accepted"
            };
          }

          if(requestStatus === 'cancelled'){
            return
          }

          if (["rejected", "pending"].includes(requestStatus)) {
            console.log("Driver rejected or did not respond, retrying...");
            handleRequest(); 
          }
        } catch (error) {
          console.error("Error handling driver response:", error);
          throw error
        }
      };
      setTimeout(handleDriverResponse, 15000);
    };
    handleRequest(); 
    emitEvent('request-ride',createTrip,userId)
    return 
  } catch (error) {
    console.error("Error executing ride request:", error);
    throw error;
  }
}
}
