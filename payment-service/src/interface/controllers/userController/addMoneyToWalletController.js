export class AddMoneyToWalletController {
  constructor(dependencies) {
    this.addMoneytoWalletUseCase =
      new dependencies.useCase.AddMoneyToWalletUseCase(dependencies);
  }
  async addMoney(req, res, next) {
    try {
      const addMoney = await this.addMoneytoWalletUseCase.execute(req.body);
      res
        .status(201)
        .json({
          stripeSession: addMoney?.createStripeSession,
          walletHistory: addMoney?.createWalletHistory,
          Balance: addMoney?.addMoneyToWallet?.walletBalance,
        });
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}
