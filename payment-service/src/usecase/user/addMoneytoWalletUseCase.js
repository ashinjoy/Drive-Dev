import Stripe from "stripe";
export class AddMoneyToWalletUseCase {
  constructor(dependencies) {
    this.walletRepository = new dependencies.repository.MongoWalletRepository();
    this.userRepository = new dependencies.repository.MongoUserRepository();
  }
  async execute(data) {
    try {
      const { userId, amount } = data;
      if (!userId || !amount) {
        const error = new Error();
        error.message = "Bad Request";
        error.status = 400;
        throw error;
      }
      const userDetails = await this.userRepository.findUserById(userId);
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const createStripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "http://localhost:3000/wallet",
        cancel_url: "http://localhost:3000/payment-failure",
        customer_email: userDetails?.email,
        client_reference_id: userId,
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: `Money Added  To Wallet`,
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
      });
      const addMoneyToWallet = await this.userRepository.updateWalletBalance(
        userId,
        { walletBalance: amount }
      );
      const createWalletHistory = await this.walletRepository.createWallet({
        userId: userId,
        amount: amount,
        type: "credit",
        description: "Wallet Top-up money Added To wallet",
      });

      return {
        createStripeSession,
        createWalletHistory,
        addMoneyToWallet,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
