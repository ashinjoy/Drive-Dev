import { errorLogger } from "../../../config/winstonConfig.js";

export class GetAllDriverControllers {
  constructor(dependencies) {
    this.getAllDriverUseCase = new dependencies.useCase.GetAllDriverUseCase(
      dependencies
    );
  }
  async getAllDrivers(req, res, next) {
    try {
      const { search, page } = req.query;
      const searchInp = search ? search : "";
      const currentPageNumber = page ? page : 1;
      const getDrivers = await this.getAllDriverUseCase.execute(
        searchInp,
        currentPageNumber
      );
      res.status(201).json({
        driverDetails: getDrivers.allDrivers,
        totalPages: getDrivers.totalPages,
      });
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      next(error);
    }
  }
}
