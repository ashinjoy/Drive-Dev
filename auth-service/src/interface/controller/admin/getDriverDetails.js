import { errorLogger } from "../../../config/winstonConfig.js";

export class DriverDetailsController {
  constructor(dependencies) {
    this.getDriverDetailUseCase =
      new dependencies.useCase.GetDriverDetailsUseCase(dependencies);
  }
  async getDriverDetails(req, res, next) {
    try {
      const { driverId } = req.params;
      const driverDetails = await this.getDriverDetailUseCase.execute(driverId);
      res.status(200).json({ driverDetails: driverDetails, message: "sucess" });
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      next(error);
    }
  }
}
