import { verifyRefreshToken ,createAccessToken } from "../../utils/jwt.js";


export class userRefreshTokenUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
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
      if (decodeUserRefreshToken.role !== "USER") {
        const error = new Error();
        error.status = 403;
        error.message = "Not Authorized";
        throw error;  
      }

      const isUserValid = await this.userRepository.findUserById(
        decodeUserRefreshToken.id
      );
      if (!isUserValid || isUserValid.isBlocked) {
        const error = new Error("User is not Valid");
        error.status = 403;
        throw error;
      }
      const data = {
        id: isUserValid._id,
        name: isUserValid.name,
        email: isUserValid.email,
        phone: isUserValid.phone,
        isBlocked: isUserValid.isBlocked,
        isVerified: isUserValid.isVerified,
      };
      const newAccessToken = await createAccessToken({
        ...data,
        role: "USER",
      });
    
      
      return newAccessToken;
  } catch (error) {
    console.error(error);
    throw error
    
  }
      
    } 
  }

