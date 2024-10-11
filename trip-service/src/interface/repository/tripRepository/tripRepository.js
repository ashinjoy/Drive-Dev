import mongoose from "mongoose";
import { tripModel } from "../../database/schema/tripSchema/tripSchema.js";
export class TripRepository {
  constructor() {}
  async createTrip(data) {
    try {
    return await tripModel.create(data);
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  async findTrip(tripId) {
    try {
      return await tripModel.findById({ _id: tripId }).populate("userId");
    } catch (error) {
      console.error(error);
      throw error
    }
  }
  async findTripByIdAndUpdate(id, data) {
    try {
      return await tripModel.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true }).populate("driverId")
    } catch (error) {
      console.error(error);
      throw error
    } 
  }
  async findTripByIdAndReject(tripId, status, driverId) {
    try {
      return await tripModel.findByIdAndUpdate(
        { _id: tripId },
        { $set: { requestStatus: status }, $push: { rejectedDrivers: driverId } }
      );
    } catch (error) {
      console.error(error);
      throw error
      
    }
    
  }

  async findTripAndUpdate(id, data) {
    console.log("id and data", id, typeof data, data);
    return await tripModel.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );
  }

  async findTripByUserId(userId) {
    return await tripModel.findOne({ userId }, { requestStatus: "pending" });
  }

  async getDriverTripCompletedStat(driverId, dateRanges) {
    console.log("in");
    console.log(driverId);

    try {
      let facetObj = {};
      dateRanges.forEach((element) => {
        const key = element.label;

        facetObj[key] = [
          {
            $match: {
              driverId: new mongoose.Types.ObjectId(driverId),
              tripStatus: "completed",
              createdAt: {
                $gte: element.startTime,
                $lte: element.endTime,
              },
            },
          },
          {
            $count: "totalRidesCompleted",
          },
        ];
      });
      console.log(facetObj);
      console.log("entry");

      return await tripModel.aggregate([
        {
          $facet: facetObj,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  async getUsersTotalTripCount(userId) {
    try {
      return await tripModel.countDocuments({ userId: userId });
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  async getUsersTrip(userId, page, limit = 6) {
    try {
      return await tripModel.find({ userId: userId }).skip((page-1)*limit).limit(limit).sort({createdAt:-1});
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  async topTrips(driverId) {
    return await tripModel
      .find({ driverId: driverId })
      .sort({ fare: -1 })
      .limit(10)
      .populate({ path: "userId", select: "name" })
      .select("fare pickUpLocation dropOffLocation distance");
  }

  async latestTrips(driverId) {
    return await tripModel
      .find({ driverId: driverId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate({ path: "userId", select: "name" })
      .select("fare pickUpLocation dropOffLocation distance");
  }
  async topRidersBooking(driverId) {
    const data = await tripModel.aggregate([
      { $match: { driverId: new mongoose.Types.ObjectId(driverId) } },
      { $group: { _id: "$userId", topRiders: { $sum: 1 } } },
      { $sort: { topRiders: -1 } },
      { $limit: 6 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          topRiders: 1,
          userName: "$userDetails.name",
        },
      },
    ]);
    return data;
  }
  async completedTripCount(driverId) {
    return await tripModel
      .find({ driverId: driverId, tripStatus: "completed" })
      .countDocuments();
  }

  async getAllLatestTrips() {
    return await tripModel
      .find({ tripStatus: "completed" })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate({ path: "userId", select: "name" })
      .populate({path:"driverId",select:"name"})
      .select("fare pickUpLocation dropOffLocation distance");
  }

  async highActiveDrivers() {
    return await tripModel.aggregate([
      {
        $match: {
          tripStatus: "completed",
        },
      },
      {
        $group: {
          _id: "$driverId",
          totalTripsCompleted: { $sum: 1 },
        },
      },
      {
        $sort: {
          totalTripsCompleted: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "drivers",
          localField: "_id",
          foreignField: "_id",
          as: "driverDetails",
        },
      },
      {
        $unwind:'$driverDetails'
      },
      {
        $project:{
          completedTrips: "$totalTripsCompleted",  
          name: "$driverDetails.name",
          email: "$driverDetails.email",
          phone: "$driverDetails.phone",
          licenseNumber: "$driverDetails.license_Number",
        }
      }
    ]);
  }
  async getTotalTripsCompletedCount(){
    return await tripModel.find({tripStatus:"completed"}).countDocuments()
  }
}
