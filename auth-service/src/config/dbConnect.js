import mongoose from "mongoose";
import { errorLogger, infologger } from "./winstonConfig.js";

export const dbConnect = async () => {
  try {
    const mongoString = process.env.MONGO_STRING;
    const connection = await mongoose.connect(mongoString);
    if (connection) {
      infologger.info("Auth Db Connected SuccessFully");
    }
  } catch (error) {
    errorLogger.error("err",error);
    throw error;
  }
};
