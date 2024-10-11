export class GetCompanyWalletBalanceController {
    constructor(dependencies) {
      this.getCompanyBalanceUseCase = new dependencies.useCase.GetCompanyWalletUseCase(dependencies);
    }
    async getComapanyWalletBalance(req, res, next) {
      try {
          const getCompanyBalance = await this.getCompanyBalanceUseCase.execute()
          res.status(201).json({balance:getCompanyBalance})
      } catch (error) {
          console.error(error);
          
      }
    }
  }
  