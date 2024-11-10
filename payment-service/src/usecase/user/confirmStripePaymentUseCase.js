import { KafkaClient } from "../../events/KafkaClient.js";
 import { PAYMENT_COMPLETED, PAYMENT_TOPIC } from "../../events/config.js";
import { WalletRecordUpates } from "../../helpers/walletRecordUpdate.js";

export class ConfirmStripePaymentUseCase{
    constructor(dependencies){
        this.paymentRepository = new dependencies.repository.MongoPaymentRepository()
        this.kafka =  new KafkaClient()
        this.walletUpdates = new WalletRecordUpates()
    }
    async execute(userId,tripId,driverId,paymentMethod,fare){
        try {
            console.log('fare',fare,typeof fare);
            const parsedFare = fare
        const payment = await this.paymentRepository.findTripAndUpdate(tripId,{parsedFare,paymentStatus: "paid"});
         await this.walletUpdates.UpdateWallets(parsedFare, driverId, tripId,paymentMethod);    
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