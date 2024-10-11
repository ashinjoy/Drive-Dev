export class GetNearByDriverUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
  }
  async execute(pickupLocation) {
    try {
      
      const parsedLongitude = parseFloat(pickupLocation?.pickupLongitude);
      const parsedLatitude = parseFloat(pickupLocation?.pickupLatitude);
      const pickupCoordinates = [parsedLongitude, parsedLatitude];
      return  await this.driverRepository.findNearstDriversAvailable(pickupCoordinates); 
    } catch (error) {
      console.error(error);
      throw error
    }
  }
}
