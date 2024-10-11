export class ReverseGeoCodeController {
  constructor(dependencies) {
    this.reverseGeocodeUseCase = new dependencies.useCase.ReverseGeoCodeUseCase(
      dependencies
    );
  }
  async reverseGeocode(req, res, next) {
    try {
      const { pickupLat, pickupLong } = req.query;
      const locationData = await this.reverseGeocodeUseCase.execute([
        pickupLat,
        pickupLong,
      ]);
      console.log("locationData", locationData);
      res.status(201).json({ data: locationData.properties.full_address });
    } catch (error) {
      console.error(error);
    }
  }
}
