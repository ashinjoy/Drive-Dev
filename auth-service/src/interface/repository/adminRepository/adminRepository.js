import { adminModel } from "../../database/schema/adminSchema/adminSchema.js";
import { driverModel } from "../../database/schema/driverSchema/driverSchema.js";
export class AdminRepository {
  constructor() {}
  async findAdminByEmailandName(name, email) {
    try {
    return await adminModel.findOne({ name, email });
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  async findAdminById(id) {
    try {
    return await adminModel.findById({ _id: id }).lean();
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  async approveProfileUpdateRequest(driverId) {
    try {
      return await driverModel.findByIdAndUpdate(
        { _id: driverId },
        { $set: { editRequest: false, isVerified: true } },
        { new: true }
      );
    } catch (error) {
      console.error(error);
      throw error
    }
   
  }
}

