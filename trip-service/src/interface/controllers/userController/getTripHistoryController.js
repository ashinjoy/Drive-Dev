export class GetTripHistoryController {
  constructor(dependencies) {
    this.getTripHistoryUseCase = new dependencies.useCase.GetTripHistoryUseCase(
      dependencies
    );
  }
  async getTripHistory(req, res, next) {
    try {
      const { userId,page } = req.query;
      if(!userId || !page){
        const error = new Error()
        error.message = 'Bad Request'
        error.status = 400
        throw error
      }
      const getTripDetails = await this.getTripHistoryUseCase.execute(userId,page);
      res.status(201).json({
          tripDetails: getTripDetails?.getUsersTrips,
          totalDocs: getTripDetails?.getUsersTotalTripCount,
        });
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}
