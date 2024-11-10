import { WalletRecordUpates } from "../../helpers/walletRecordUpdate.js";
import {KafkaClient} from '../../events/KafkaClient.js'
import { createStripeSession } from "../../utils/stripeSession.js";
import { PAYMENT_COMPLETED,PAYMENT_TOPIC } from "../../events/config.js";


export class StripePaymentUseCase {
  constructor(dependencies) {
    this.paymentRepository =new dependencies.repository.MongoPaymentRepository();
    this.userRepository = new dependencies.repository.MongoUserRepository();
    this.tripRepository = new dependencies.repository.MongoTripRepository();
    this.walletUpdates = new WalletRecordUpates()
    this.kafka = new KafkaClient()
    
  }
  async execute(data) {
    try {
      const { userId, tripId, paymentMethod, fare, driverId } = data;
      const [userDetails, tripDetails] = await Promise.all([this.userRepository.findUserById(userId),this.tripRepository.findTripById(tripId)]);
     const paymentDetails =  await this.paymentRepository.findPaymentDetailsByTripById(tripId)
      console.log('paymnet',paymentDetails);
      
      if(paymentDetails.paymentStatus === "paid"){
        const error = new Error()
        error.message = "Your Payment Has Been Completed"
        error.status = 400
        throw error
      }
      const stripeSession = await createStripeSession(
        userDetails?.email,
        tripId,
        tripDetails?.pickUpLocation,
        tripDetails?.dropOffLocation,
        fare
      );
      // const payment = await this.paymentRepository.findTripAndUpdate(tripId,{fare,paymentStatus: "paid"});
      // await this.walletUpdates.UpdateWallets(fare, driverId, tripId,paymentMethod);    
      // this.kafka.produceMessage(PAYMENT_TOPIC,{
      //   type:PAYMENT_COMPLETED,
      //   value:JSON.stringify({...payment,driverId})
      // })
      return {stripeSession};
    } catch (error) {
      console.error(error);
      throw error
    }
  }
}
