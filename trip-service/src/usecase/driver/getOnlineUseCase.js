export class GetDriverOnlineUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
  }
  async execute(driverId, location) {
    console.log("location", driverId, location);
    const updateDriverStatus_Active = await this.driverRepository.findDriverByIdAndUpdate(
      driverId,
      {
        isActive: true,
        currentLocation: {
          type: "Point",
          coordinates: [location[0], location[1]],
        },
        currentStatus:'active'
      }
    );
    return updateDriverStatus_Active
  }
}
