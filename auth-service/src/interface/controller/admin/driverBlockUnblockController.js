export class DriverBlockUnblockController {
  constructor(dependencies) {
    this.driverBlockUnblockUseCase =
      new dependencies.useCase.DriverBlockUnblockUseCase(dependencies);
  }
  async driverBlockUnblock(req, res, next) {
    try {
      const { driverId } = req.params;
      if (!driverId) {
        const error = new Error();
        error.message = "Bad Request";
        error.status = 400;
        throw error;
      }
      const manageDriver = await this.driverBlockUnblockUseCase.execute(
        driverId
      );
      const data = {
        id: manageDriver._id,
        isBlocked: manageDriver?.isBlocked,
      };
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}
