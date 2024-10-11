import { KafkaClient } from "../../events/KafkaClient.js"
import { TRIP_TOPIC ,PAYMENT_MODE_UPDATED} from "../../events/config.js"
export class ChangePaymentUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
        this.kafka = new KafkaClient()
    }
    async execute(tripId,paymentMethod){
        try {
            const dataToUpdate = {paymentMethod}
          const updatePaymentMethod =   await this.tripRepository.findTripAndUpdate(tripId,dataToUpdate)
          this.kafka.produceMessage(TRIP_TOPIC,{
            type:PAYMENT_MODE_UPDATED,
            value:JSON.stringify(updatePaymentMethod)
          })
          return updatePaymentMethod
          
        } catch (error) {
            console.error(error)
        }
    }
}