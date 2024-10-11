export class GetDriverWalletDetailsController {
  constructor(dependencies) {
    this.getDriverWalletDetailsUseCase =
      new dependencies.useCase.GetDriverWalletDetailsUseCase(dependencies);
  }
  async getDriverWalletDetails(req, res, next) {
    try {
      const { driverId,page } = req.query;
      const getDriverWalletData = await this.getDriverWalletDetailsUseCase.execute(driverId,page); 
      res.status(201).json({
          driverBalance: getDriverWalletData?.driverWalletBalance,
          driverWalletHistory: getDriverWalletData?.getDriverWalletHistory,
          totalDocs:getDriverWalletData?.getTotalDocs
        });
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}
