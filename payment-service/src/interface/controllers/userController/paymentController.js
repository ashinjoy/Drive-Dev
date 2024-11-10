export class PaymentController {
  constructor(dependencies) {
    this.stripePaymentUseCase = new dependencies.useCase.StripePaymentUseCase(
      dependencies
    );
    this.walletPaymentUseCase = new dependencies.useCase.WalletPaymentUseCase(dependencies)
  }
  async payment(req, res, next) {
    try {
      const { userId, tripId, driverId, paymentMethod, fare } = req.body;
      if (!userId || !tripId || !driverId || !paymentMethod || !fare) {
        const error = new Error();
        error.status = 400;
        error.message = "Bad Request!";
        throw error;
      }
      if (paymentMethod === "Online-Payment") {
        const initiateOnlinePayment = await this.stripePaymentUseCase.execute(req.body);
        // res.status(200).json({success: true,payment: initiateOnlinePayment?.stripeSession,paymentStatus: "paid"});
        res.status(200).json({success: true,payment: initiateOnlinePayment?.stripeSession,paymentStatus:"pending"});

      } else if (paymentMethod === "Wallet") {
         await this.walletPaymentUseCase.execute(req.body)
        res.status(201).json({success:true,paymentStatus: "paid"})
      } else {
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
