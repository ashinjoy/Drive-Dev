import jwt from "jsonwebtoken";
export const verifyAccessToken = async (data) => {
    try {
      const verifyToken = await jwt.verify(
        data,
        process.env.JWT_ACCESSTOKEN_SECRET
      );
      return verifyToken;
    } catch (error) {
      console.error(error);
    }
  };