import { driverModel } from "../../database/schema/driverSchema/driverSchema.js";
export class DriverRepository {
  constructor() {}
  async createDriver(driverDetails) {
    try {
      const driver = new driverModel(driverDetails);
      return driver.save();
    } catch (error) {
      console.error(error);
      throw error
    }
  }
  async findDriverbyId(id) {
    
    return await driverModel.findById({ _id: id }, { password: 0 });
  }
  async findDriverByEmail(email) {
    return await driverModel.findOne({ email: email }).lean();
  }
  async findDriverByPhone(phone) {
    return await driverModel.findOne(phone);
  }
  async findDriverByIdAndUpdate(id, detailsToUpdate) {
    try {
    console.log(id,detailsToUpdate);
      return await driverModel
      .findByIdAndUpdate({ _id: id }, { $set: detailsToUpdate }, { new: true })
      .lean();
    } catch (error) {
      console.error(error);
      throw error
      
    }
   
  }

  async getDriverByIdAndUpdate(id, dataToUpdate) {
    return await driverModel.findByIdAndUpdate(
      { _id: id },
      { $set: dataToUpdate },
      { new: true }
    );
  }
  async getAllDrivers(filter, page, limit) {
    return await driverModel
      .find(filter, { password: 0 })
      .skip(page - 1)
      .limit(limit);
  }

  async findDriverByIdAndApprove(driverId) {
    return await driverModel.findByIdAndUpdate(
      { _id: driverId },
      { $set: { isAccepted: true } }
    );
  }

  async getTotalDocs() {
    return await driverModel.countDocuments();
  }

  async findNearstDriversAvailable(pickupCoordinates) { 
    try {
      const data =  await driverModel.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [pickupCoordinates[0], pickupCoordinates[1]],
            },
            distanceField: "dist.calculated",
            maxDistance: 8000,
            query: { 
              isAccepted: true,
              isBlocked: false,
               isVerified: true,
               isProfileComplete: true,
  
               isActive: true,
               currentStatus: "active"  
              },
              spherical: true,
            }
            
          }]);
          return data
    } catch (error) {
        console.error(error);
        throw error

    }
    

  }
  async rideRequestToSelectedVehicle(pickupCoordinates,vehicleType) {
    try {
      const data = await driverModel.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [pickupCoordinates[0], pickupCoordinates[1]],
            },
            distanceField: "dist.calculated",
            maxDistance: 8000,
            query: { isAccepted: true },
            spherical: true,
          },
        },
        {
          $match: {
            isBlocked: false,
            isVerified: true,
            "vehicleDetails.vehicle_type": vehicleType,
            isActive: true,
            // currentStatus:'active'
          },
        },
      ]);
      return data;
    } catch (error) {
      console.error(error);
      
    }
  }

  async updateDriverStatus(driverId, status) {
    try {
      return await driverModel.findByIdAndUpdate(
        { _id: driverId },
        { $set: status },
        { new: true }
      );
    } catch (error) {
      console.error(error);
    }
  }
 
 
}
