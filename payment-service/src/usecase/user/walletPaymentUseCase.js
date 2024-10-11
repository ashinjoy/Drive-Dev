import { KafkaClient } from "../../events/KafkaClient.js";
import { PAYMENT_TOPIC,PAYMENT_COMPLETED } from "../../events/config.js";
import { WalletRecordUpates } from "../../helpers/walletRecordUpdate.js";
export class WalletPaymentUseCase {
  constructor(dependencies) {
    this.paymentRepository =
    new dependencies.repository.MongoPaymentRepository();
    this.walletUpdates = new WalletRecordUpates();
    this.userRepository = new dependencies.repository.MongoUserRepository()
    this.kafka = new KafkaClient()
  }
  async execute(data) {
    try {
      const { userId, tripId, driverId, paymentMethod, fare } = data;
      const userDetails = await this.userRepository.findUserById(userId)
      const {walletBalance}  = userDetails
      if(walletBalance<fare){
        const error = new Error()
        error.message='No Sufficient Balance in Wallet'
        error.status = 400
        throw error
      }
      const payment = await this.paymentRepository.findTripAndUpdate(tripId,{fare,paymentStatus: "paid"});
      await this.walletUpdates.UpdateWallets(fare, driverId, tripId, paymentMethod, userId);
      this.kafka.produceMessage(PAYMENT_TOPIC,{
        type:PAYMENT_COMPLETED,
        value:JSON.stringify({...payment,driverId})
      })
      return 
    } catch (error) {
      console.error(error);
      throw error
    }
  }
}
