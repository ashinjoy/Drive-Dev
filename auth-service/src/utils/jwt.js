import jwt from "jsonwebtoken";

export const createAccessToken = async (data) => {
  try {
    const accessToken = await jwt.sign(
      data,
      process.env.JWT_ACCESSTOKEN_SECRET,
      {
        expiresIn: "2d",
      }
    );
    return accessToken;
  } catch (error) {
    console.error(error);
  }
};

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

export const createRefreshToken = async (data) => {
  try {
    const refreshToken = await jwt.sign(
      data,
      process.env.JWT_REFRESHTOKEN_SECRET,
      { expiresIn: "15d" }
    );
    return refreshToken;
  } catch (error) {
    console.error(error);
  }
};
export const verifyRefreshToken = async (data) => {
  try {
    const verifyToken = await jwt.verify(
      data,
      process.env.JWT_REFRESHTOKEN_SECRET
    );
    return verifyToken;
  } catch (error) {
    console.error(error);
  }
};
