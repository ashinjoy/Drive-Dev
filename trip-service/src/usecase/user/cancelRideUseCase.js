import { KafkaClient } from "../../events/KafkaClient.js";
import { notifyDriver } from "../../utils/socket.js";

export class CancelRideUseCase {
  constructor(dependencies) {
    this.tripRepository = new dependencies.repository.MongoTripRepository();
    this.kafka = new KafkaClient();
  }
  async execute(cancelInfo) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { userId, tripId, cancelReason } = cancelInfo;
      if (!userId || !cancelReason || !tripId) {
        const error = new Error();
        error.message = "Bad Request";
        error.status = 400;
        throw error;
      }

      const trip = await this.tripRepository.findTrip(tripId);
      if (trip.requestStatus === "cancelled") {
        const error = new Error();
        error.message = "The Ride Has Been Cancelled Already";
        error.status = 400;
        throw error;
      }
      if (
        trip.requestStatus == "pending" ||
        trip.requestStatus == "rejected" ||
        trip.requestStatus == "accepted"
      ) {
        const cancelTrip = await this.tripRepository.findTripByIdAndUpdate(
          trip._id,
          {
            requestStatus: "cancelled",
            tripStatus: "cancelled",
            cancellationReason: cancelInfo.cancelReason,
          }
        );
        console.log("requestStatus", trip.requestStatus);
        console.log("tripStatus", trip.tripStatus);

        if (trip.requestStatus == "accepted") {
          notifyDriver(
            "cancel-ride",
            cancelInfo?.cancelReason,
            cancelTrip?.driverId?._id
          );
        }
        return;
      }
    } catch (error) {
      console.error("errr in resp", error);
      throw error;
    }
  }
}
