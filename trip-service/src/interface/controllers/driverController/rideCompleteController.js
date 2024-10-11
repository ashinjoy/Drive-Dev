export class RideCompleteController {
  constructor(dependencies) {
    this.rideCompleteUseCase = new dependencies.useCase.CompleteRideUseCase(
      dependencies
    );
  }
  async completeRide(req, res, next) {
    try {
      const { tripId,userId } = req.body;
      if(!tripId || !userId){
        const error = new Error()
        error.message = "Bad Request"
        error.status = 400
        throw error
      }
      await this.rideCompleteUseCase.execute(tripId,userId);
      res.status(200).json({message:"Ride Completed SuccessFully"})
    } catch (error) {
      console.error(error);
      next(error)
      
    }
    
    
  }
}
