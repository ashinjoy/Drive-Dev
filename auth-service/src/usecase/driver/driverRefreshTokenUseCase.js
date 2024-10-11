import { verifyRefreshToken } from "../../utils/jwt.js";
import { createAccessToken } from "../../utils/jwt.js";

export class DriverRefreshTokenUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
  }
  async execute(RefreshToken) {
    try {
      const decodeUserRefreshToken = await verifyRefreshToken(RefreshToken);
      if (!decodeUserRefreshToken) {
        const error = new Error();
        error.status = 400;
        error.message = "Refresh Token is not valid";
        throw error;
      }
      if (decodeUserRefreshToken.role !== "DRIVER") {
        const error = new Error();
        error.status = 403;
        error.message = "Not Authorized";
        throw error;  
      }

      const isDriverValid = await this.userRepository.findDriverbyId(
        decodeUserRefreshToken.id
      );
      if (!isDriverValid || isDriverValid.isBlocked) {
        const error = new Error("User is not Valid");
        error.status = 403;
        throw error;
      }
      const data = {
        id: isDriverValid._id,
        name: isDriverValid.name,
        email: isDriverValid.email,
        phone: isDriverValid.phone,
        isBlocked: isDriverValid.isBlocked,
        isVerified: isDriverValid.isVerified,
      };
      const newAccessToken = await createAccessToken({
        ...data,
        role: "USER",
      });
      console.log('newyser',newAccessToken);
      
      return newAccessToken;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
