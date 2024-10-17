import { errorLogger } from "../../../config/winstonConfig.js";

export class ApproveDriverController {
  constructor(dependencies) {
    this.driverApproveUseCase = new dependencies.useCase.DriverApprovalUseCase(
      dependencies
    );
  }
  async approve(req, res, next) {
    try {
      const { driverId } = req.params;
      if (!driverId) {
        const error = new Error();
        error.message = "Bad Request";
        error.status = 400;
        throw error;
      }
      const driverApproval = await this.driverApproveUseCase.execute(driverId);
      const driverUpdatedData = {
        id: driverApproval._id,
        isAccepted: driverApproval.isAccepted,
      };
      res
        .status(200)
        .json({ driverUpdatedData, message: "Driver has been Approved" });
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      next(error);
    }
  }
}
