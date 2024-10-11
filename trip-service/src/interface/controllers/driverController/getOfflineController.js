export class GetDriverOfflineController {
  constructor(dependencies) {
    this.getDriverOfflineUseCase =
      new dependencies.useCase.GetDriverOfflineUseCase(dependencies);
  }
  async getOffline(req, res, next) {
    try {
      const { driverId } = req.body;
      if (!driverId) {
        console.log("No id");
        return;
      }
      const driverOffline = await this.getDriverOfflineUseCase.execute(driverId)
      const data ={
        isActive:driverOffline?.isActive,
        currentStatus:driverOffline?.currentStatus
      }
      res.status(200).json({message:'You are Offline',data})
    } catch (error) {
      console.error(error);
    }
  }
}
