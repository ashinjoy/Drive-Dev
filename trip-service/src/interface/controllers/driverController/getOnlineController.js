export class GetDriverOnlineController {
  constructor(dependencies) {
    this.getDriverOnlineUseCase =
      new dependencies.useCase.GetDriverOnlineUseCase(dependencies);
  }
  async getOnline(req, res, next) {
    try {
      console.log("r", req.body);

      const { driverId, currentLocation } = req.body;
      const getOnline = await this.getDriverOnlineUseCase.execute(
        driverId,
        currentLocation 
      );
      const data = {
        isActive: getOnline?.isActive,
        location: getOnline?.currentLocation,
        currentStatus:getOnline?.currentStatus
      };
      console.log('dataUpdated',data);
      
      res.status(201).json({ data });
    } catch (error) {
      console.error(error);
    }
  }
}
