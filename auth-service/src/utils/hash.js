import bcrypt from "bcrypt";
import { errorLogger } from "../config/winstonConfig.js";

export const hash = async (password) => {
  try {
    const saltRound = 10;
    return await bcrypt.hash(password, saltRound);
  } catch (error) {
    console.error(error);
    errorLogger.error(error);
    throw error;
  }
};

export const compare = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error(error);
    errorLogger.error(error);
    throw error;
  }
};
