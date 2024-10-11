export class GetNearByDriversController {
  constructor(dependencies) {
    this.getNearByDriversUseCase =new dependencies.useCase.GetNearByDriverUseCase(dependencies);
    this.getAdditionalTripData =new dependencies.useCase.GetAdditionalTripDataUseCase(dependencies);
  }
  async getNearByDrivers(req, res, next) {
    try {
      const {
        userId,
        pickupLongitude,
        pickupLatitude,
        dropLatitude,
        dropLongitude,
      } = req.query;

      if(!userId || !pickupLongitude || !pickupLatitude || !dropLatitude || !dropLongitude){
        const error = new Error()
        error.status = 400
        error.message = 'Bad Request ! Required details Missing'
        throw error
      }
      
      const pickupLocation = {
        pickupLongitude,
        pickupLatitude,
        // dropLatitude,
        // dropLongitude,
      };

      const getNearByDrivers = await this.getNearByDriversUseCase.execute(
        // userId,
        pickupLocation
      );
      const getAdditionalTripData = await this.getAdditionalTripData.execute(
        pickupLatitude,
        pickupLongitude,
        dropLatitude,
        dropLongitude
      );
      res.status(201).json({ getNearByDrivers, getAdditionalTripData });
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}
