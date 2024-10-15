

export class RideOngoingController {
  constructor(dependencies) {
    this.rideOngoingUseCase = new dependencies.useCase.RideOngoingUseCase(
      dependencies
    );
  }
  async isRideOngoing(req, res, next) {
    try {
      const { userId } = req.params;
      if (!userId) {
        const error = new Error();
        error.message = "Bad Request";
        error.status = 400;
        throw error;
      }
    const rideOngoing =   await this.rideOngoingUseCase.execute(userId)
    if(rideOngoing){
      return  res.status(200).json({tripDetail:rideOngoing,message:'user is already in Trip'})
    }
    res.status(200).json({message:'user ride available'})
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
