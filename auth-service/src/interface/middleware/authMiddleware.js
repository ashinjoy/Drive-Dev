import { errorLogger, infologger } from "../../config/winstonConfig.js";
import { verifyAccessToken } from "../../utils/jwt.js";
import {
  MongoUserRepository,
  MongoAdminRepository,
  MongoDriverRepository,
} from "../repository/index.js";

export class AuthHandler {
  static async isUserLogin(req, res, next) {
    try {
      const userRepository = new MongoUserRepository();
      if (!req.headers["Authorization"] && !req.headers["authorization"]) {
        const error = new Error();
        error.message = "No access Token";
        error.status = 400;
        throw error;
      }
      const header =
        req.headers["Authorization"] || req.headers["authorization"];
      const userAccessToken = header.split(" ")[1];
      if (!userAccessToken) {
        const error = new Error();
        error.message = "No Token";
        error.status = 403;
        throw error;
      }
      const decodeToken = await verifyAccessToken(userAccessToken);
      if (!decodeToken) {
        const error = new Error();
        error.message = "Token is not Valid";
        error.status = 401;
        throw error;
      }
      if (!decodeToken.role == "USER") {
        const error = new Error();
        error.status = 403;
        error.message = "You are not Authorized";
        throw error;
      }
      const isUservalid = await userRepository.findUserById(decodeToken.id);

      if (!isUservalid || isUservalid.isBlocked) {
        const error = new Error();
        error.status = 403;
        error.message = "Your Account has been Blocked temporarily";
        throw error;
      }

      next();
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      next(error);
    }
  }
  static async isDriverLogin(req, res, next) {
    try {
      const driverRepository = new MongoDriverRepository();
      if (!req.headers["Authorization"] && !req.headers["authorization"]) {
        const error = new Error();
        error.message = "No access Token";
        error.status = 400;
        throw error;
      }
      const header =
        req.headers["Authorization"] || req.headers["authorization"];
      const driverAccessToken = header.split(" ")[1];
      if (!driverAccessToken) {
        const error = new Error();
        error.message = "No Token";
        error.status = 403;
        throw error;
      }
      const decodeToken = await verifyAccessToken(driverAccessToken);
      if (!decodeToken) {
        const error = new Error();
        error.message = "Token is not Valid";
        error.status = 401;
        throw error;
      }
      if (!decodeToken.role == "DRIVER") {
        const error = new Error();
        error.status = 403;
        error.message = "You are not Authorized";
        throw error;
      }
      console.log("decode", decodeToken);
      infologger.info("decode", decodeToken);

      const isDrivervalid = await driverRepository.findDriverbyId(
        decodeToken._id
      );

      if (!isDrivervalid || isDrivervalid.isBlocked) {
        const error = new Error();
        error.status = 403;
        error.message = "Your Account has been Blocked temporarily";
        throw error;
      }

      next();
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      next(error);
    }
  }
  static async isAdminLogin(req, res, next) {
    try {
      const adminRepository = new MongoAdminRepository();
      if (!req.headers["Authorization"] && !req.headers["authorization"]) {
        const error = new Error();
        error.message = "No access Token";
        error.status = 400;
        throw error;
      }
      const header =
        req.headers["Authorization"] || req.headers["authorization"];
      const userAccessToken = header.split(" ")[1];
      if (!userAccessToken) {
        const error = new Error();
        error.message = "No Token";
        error.status = 403;
        throw error;
      }
      const decodeToken = await verifyAccessToken(userAccessToken);
      if (!decodeToken) {
        const error = new Error();
        error.message = "Token is not Valid";
        error.status = 401;
        throw error;
      }
      if (!decodeToken.role == "ADMIN") {
        const error = new Error();
        error.status = 403;
        error.message = "You are not Authorized";
        throw error;
      }

      await adminRepository.findAdminById(decodeToken.id);
      next();
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      next(error);
    }
  }
}
