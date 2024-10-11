import { verifyRefreshToken } from "../../utils/jwt.js";
import { createAccessToken } from "../../utils/jwt.js";

export class AdminRefreshTokenUseCase {
  constructor(dependencies) {
    this.adminRepository = new dependencies.repository.MongoAdminRepository();
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
      if (decodeUserRefreshToken.role !== "ADMIN") {
        const error = new Error();
        error.status = 403;
        error.message = "Not Authorized";
        throw error;  
      }

      const isAdminValid = await this.adminRepository.findAdminById(
        decodeUserRefreshToken.id
      );
      if (!isAdminValid || isAdminValid.isBlocked) {
        const error = new Error("User is not Valid");
        error.status = 403;
        throw error;
      }
      const data = {
        id: isAdminValid._id,
        name: isAdminValid.name,
        email: isAdminValid.email,
        phone: isAdminValid.phone,
        isBlocked: isAdminValid.isBlocked,
        isVerified: isAdminValid.isVerified,
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
