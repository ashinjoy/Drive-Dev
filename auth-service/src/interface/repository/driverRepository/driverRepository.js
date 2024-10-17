import { errorLogger } from "../../../config/winstonConfig.js";
import { driverModel } from "../../database/schema/driverSchema/driverSchema.js";
export class DriverRepository {
  constructor() {}
  async createDriver(driverDetails) {
    try {
      const driver = new driverModel(driverDetails);
      return driver.save();
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
  async findDriverbyId(id) {
    try {
      return await driverModel.findById({ _id: id }, { password: 0 });
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
  async findDriverByEmail(email) {
    try {
      return await driverModel.findOne({ email: email }).lean();
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
  async findDriverByPhone(phone) {
    try {
      return await driverModel.findOne({ phone });
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
  async findDriverByIdAndUpdate(id, detailsToUpdate) {
    try {
      return await driverModel
        .findByIdAndUpdate(
          { _id: id },
          { $set: detailsToUpdate },
          { new: true }
        )
        .lean();
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }

  async getDriverByIdAndUpdate(id, dataToUpdate) {
    try {
      return await driverModel.findByIdAndUpdate(
        { _id: id },
        { $set: dataToUpdate },
        { new: true }
      );
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
  async getAllDrivers(search, page) {
    try {
      const result = await driverModel
        .find({ name: new RegExp(search, "i") }, { password: 0 })
        .skip((page - 1) * 7)
        .limit(7);
      return result;
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }

  async findDriverByIdAndApprove(driverId) {
    try {
      return await driverModel.findByIdAndUpdate(
        { _id: driverId },
        { $set: { isAccepted: true } },
        { new: true }
      );
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }

  async getTotalDocs(search) {
    try {
      const totalDocs = await driverModel.countDocuments({
        name: new RegExp(search, "i"),
      });
      return totalDocs;
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }

  async sortDriversRegistrationByDate(dateRanges) {
    try {
      const facetObj = {};
      dateRanges.forEach((element) => {
        const key = element.label;
        facetObj[key] = [
          {
            $match: {
              createdAt: {
                $gte: element.startTime,
                $lte: element.endTime,
              },
            },
          },
          {
            $count: "totalNewUsers",
          },
        ];
      });
      return await driverModel.aggregate([
        {
          $facet: facetObj,
        },
      ]);
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
}
