export class GetDriverWalletBalanceController {
  constructor(dependencies) {
    this.getDriverWalletUseCase =
      new dependencies.useCase.GetDriverWalletBalanceUseCase(dependencies);
  }
  async getDriverBalance(req, res, next) {
    try {
        const {driverId} = req.params
        if(!driverId){
          const error = new Error()
          error.message = 'Bad Request'
          error.status = 400
          throw error
        }
        const getDriverWalletBalance = await this.getDriverWalletUseCase.execute(driverId)
        res.status(201).json({balance:getDriverWalletBalance})
    } catch (error) {
        console.error(error);
        next(error)
        
    }
  }
}
