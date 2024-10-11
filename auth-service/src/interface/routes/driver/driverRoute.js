import express from "express";
import { DriverRegisterController } from "../../controller/driver/registrationController.js";
import { VerifyOtpController } from "../../controller/driver/verifyOtpController.js";
import { ResendOtpController } from "../../controller/driver/resendOtpController.js";

import { CompleteProfileController } from "../../controller/driver/completeProfileController.js";
import { DriverProfileUpdateController } from "../../controller/driver/updateProfileController.js"
;
import {DriverLoginController} from '../../controller/driver/driverLoginController.js'
import { DriverLogoutController } from "../../controller/driver/driverLogoutController.js";

import { DriverRefreshTokenController } from "../../controller/driver/driverRefreshController.js";

import { dependencies } from "../../../config/dependencies.js";

import { upload } from "../../../utils/multer.js";

import { AuthHandler } from "../../middleware/authMiddleware.js";

const driverRouter = express.Router();

const controllers = {
  registerController: new DriverRegisterController(dependencies),
  verifyOtpController: new VerifyOtpController(dependencies),
  resendOtpController: new ResendOtpController(dependencies),
  completeProfileController: new CompleteProfileController(dependencies),
  updateProfileController: new DriverProfileUpdateController(dependencies),
  driverLogincontroller:new DriverLoginController(dependencies),
  driverLogoutcontroller: new DriverLogoutController(dependencies),
  refreshTokenController : new DriverRefreshTokenController(dependencies)
  
};

driverRouter.post("/signup", async (req, res, next) =>
  controllers.registerController.registerDriver(req, res, next)
);
driverRouter.post("/verify-otp", async (req, res, next) =>
  controllers.verifyOtpController.verifyOtp(req, res, next)
);
driverRouter.post("/resend-otp", async (req, res, next) =>
  controllers.resendOtpController.resendOtp(req, res, next)
);

driverRouter.post('/login',async(req,res,next)=>controllers.driverLogincontroller.login(req,res,next))

driverRouter.get('/refreshToken',async(req,res,next)=>controllers.refreshTokenController.refreshUserToken(req,res,next))

driverRouter.post("/complete-profile", upload.any(), async (req, res, next) =>
  controllers.completeProfileController.completeProfile(req, res, next)
);
driverRouter.put(
  "/profileUpdate-request",
  AuthHandler.isDriverLogin,
  upload.any(),
  async (req, res, next) => {
    controllers.updateProfileController.updateProfile(req, res, next);
  }
);
driverRouter.get('/logout',AuthHandler.isDriverLogin,async(req,res,next)=>controllers.driverLogoutcontroller.logout(req,res,next))

export default driverRouter;
