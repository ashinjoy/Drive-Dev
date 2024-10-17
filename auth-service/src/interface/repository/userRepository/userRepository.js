import { errorLogger } from "../../../config/winstonConfig.js";
import { userModel } from "../../database/schema/userSchema/userSchema.js";
export class UserRepository {
  constructor() {}
  async createUser(userData) {
    try {
      return await userModel.create(userData);
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
  async findUserByEmail(email) {
    try {
      return await userModel.findOne({ email: email });
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
  async findUserById(id) {
    try {
      return await userModel.findById({ _id: id });
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
  async findByIdUpdate(id, dataToUpdate) {
    try {
      return await userModel
        .findByIdAndUpdate({ _id: id }, { $set: dataToUpdate }, { new: true })
        .lean();
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
  async getAllUsers(search, page) {
    try {
      const result = await userModel
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

  async getTotalDocs(search) {
    try {
      return await userModel.countDocuments({ name: new RegExp(search, "i") });
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
  async getUserAndSaveContacts(id, data) {
    try {
      return await userModel.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { savedContacts: data } },
        { new: true }
      );
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }

  async sortNewlyRegisterdUsers(dateRanges) {
    try {
      let facetObj = {};
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
      return await userModel.aggregate([
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
