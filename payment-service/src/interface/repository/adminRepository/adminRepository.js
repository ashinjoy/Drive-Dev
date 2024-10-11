import { adminModel } from "../../database/schema/adminSchema/adminSchema.js";
import { userModel } from "../../database/schema/userSchema/userSchema.js";
import { driverModel } from "../../database/schema/driverSchema/driverSchema.js";
export class AdminRepository {
  constructor() {}
  async findAdminByEmailandName(name, email) {
    return await adminModel.findOne({ name, email });
  }

  async findAdminById(id) {
    return await adminModel.findById({ _id: id }).lean();
  }

  async approveProfileUpdateRequest(driverId) {
    return await driverModel.findByIdAndUpdate(
      { _id: driverId },
      { $set: { editRequest: false, isVerified: true } }
    );
  }
}
// }
