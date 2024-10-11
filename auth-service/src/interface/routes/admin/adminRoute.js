import express from "express";
import { adminLogincontroller } from "../../controller/admin/adminLoginController.js";
import { GetAllDriverControllers } from "../../controller/admin/getAllDriverController.js";
import { DriverDetailsController } from "../../controller/admin/getDriverDetails.js";
import { ApproveDriverController } from "../../controller/admin/approveDriverController.js";
import { DriverBlockUnblockController } from "../../controller/admin/driverBlockUnblockController.js";
import { UserBlockUnblockController } from "../../controller/admin/userBlockUnblockController.js";
import { verifyProfileUpdateController } from "../../controller/admin/verifyProfileUpdatedController.js";
import { GetAllUserController } from "../../controller/admin/getAllUsersController.js";
import { AdminRefreshTokenController } from "../../controller/admin/adminRefreshController.js";
import { NewlyEnrolledUserController } from "../../controller/admin/newlyEnrolledUsersController.js";
import { AuthHandler } from "../../middleware/authMiddleware.js";

import { dependencies } from "../../../config/dependencies.js";
const adminRouter = express.Router();
const controllers = {
  loginController: new adminLogincontroller(dependencies),
  getAllDriversController: new GetAllDriverControllers(dependencies),
  getDriverDetailsController: new DriverDetailsController(dependencies),
  approveDriverController: new ApproveDriverController(dependencies),
  verifyProfileUpdateController: new verifyProfileUpdateController(dependencies),
  adminDriverBlockAndUnblockController: new DriverBlockUnblockController(dependencies),
  adminUserBlockAndUnblockController: new UserBlockUnblockController(dependencies),
  getAllUsersController: new GetAllUserController(dependencies),
  adminRefreshTokenController: new AdminRefreshTokenController(dependencies),
  newUsersReportController: new NewlyEnrolledUserController(dependencies)
  
};

adminRouter.post("/login", async (req, res, next) =>
  controllers.loginController.login(req, res, next)
);
adminRouter.get('/refreshToken',async(req,res,next)=>controllers.adminRefreshTokenController.refreshUserToken(req,res,next))

adminRouter.get(
  "/getAllDrivers",
  AuthHandler.isAdminLogin,
  async (req, res, next) =>
    controllers.getAllDriversController.getAllDrivers(req, res, next)
);
adminRouter.get(
  "/viewDriver-Detail/:driverId",
  AuthHandler.isAdminLogin,
  async (req, res, next) =>
    controllers.getDriverDetailsController.getDriverDetails(req, res, next)
);
adminRouter.patch(
  "/approveDriver/:driverId",
  AuthHandler.isAdminLogin,
  async (req, res, next) =>
    controllers.approveDriverController.approve(req, res, next)
);
adminRouter.patch(
  "/verify-driverProfileUpdate/:driverId/:status",
  AuthHandler.isAdminLogin,
  async (req, res, next) =>
    controllers.verifyProfileUpdateController.profileUpdateManage(
      req,
      res,
      next
    )
);
adminRouter.patch(
  "/blockUnblockDrivers/:driverId",
  AuthHandler.isAdminLogin,
  async (req, res, next) =>
    controllers.adminDriverBlockAndUnblockController.driverBlockUnblock(
      req,
      res,
      next
    )
);
adminRouter.patch(
  "/blockunblockUser/:userId",
  AuthHandler.isAdminLogin,
  async (req, res, next) =>
    controllers.adminUserBlockAndUnblockController.userBlockUnblock(
      req,
      res,
      next
    )
);
adminRouter.get(
  "/getAllUsers",
  AuthHandler.isAdminLogin,
  async (req, res, next) =>
    controllers.getAllUsersController.getAllUsers(req, res, next)
);
adminRouter.get('/dashboard/newusers/:filter',AuthHandler.isAdminLogin,async(req,res,next)=>controllers.newUsersReportController.newlyEnrolledUsers(req,res,next))


export default adminRouter;
