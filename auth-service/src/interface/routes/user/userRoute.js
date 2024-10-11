import express from "express";
import { UserLoginController } from "../../controller/user/userLoginController.js";
import { VerifyOtpController } from "../../controller/user/verifyOtpController.js";
import {ResendOtpController} from "../../controller/user/resendOtpController.js"
import { UpdateUserDataController } from "../../controller/user/updateUserDataController.js";
import {UserRefreshTokenController} from '../../controller/user/userRefreshToken.js'
import { SaveContactsController } from "../../controller/user/saveContactsController.js";
import { UserLogoutController } from "../../controller/user/userLogoutController.js"; 

import { dependencies } from "../../../config/dependencies.js";

import { AuthHandler } from "../../middleware/authMiddleware.js";
import { upload } from "../../../utils/multer.js";

const userRouter = express.Router();

const controllers = {
  userLoginController: new UserLoginController(dependencies),
 VerifyOtpController:new VerifyOtpController(dependencies),
 ResendOtpController: new ResendOtpController(dependencies),
 updateUserDataController : new UpdateUserDataController(dependencies),
 refreshTokenController : new UserRefreshTokenController(dependencies),
 saveContactsController : new SaveContactsController(dependencies),
 logoutController: new UserLogoutController(dependencies)
};

//POST request for Login
//type params represents (google Login, email Login)
// this route uses the login userLoginCotroller from managing user Login
userRouter.post('/login/:type',async (req, res,next) => controllers.userLoginController.userLogin(req,res,next));
userRouter.post('/verify-otp',async (req, res,next) => controllers.VerifyOtpController.verifyOtp(req,res,next));
userRouter.post('/resend-otp',async(req,res,next)=>controllers.ResendOtpController.resendOtp(req,res,next))
userRouter.get('/refreshToken',async(req,res,next)=>controllers.refreshTokenController.refreshUserToken(req,res,next))
userRouter.put('/userProfileUpdate',AuthHandler.isUserLogin,upload.single('profileImg'),async(req,res,next)=>controllers.updateUserDataController.updateUserDetails(req,res,next))
userRouter.post('/save-contacts',AuthHandler.isUserLogin,async(req,res,next)=>controllers.saveContactsController.saveContacts(req,res,next))
userRouter.get('/logout',AuthHandler.isUserLogin,async(req,res,next)=>controllers.logoutController.userLogout(req,res,next))


export default userRouter;
