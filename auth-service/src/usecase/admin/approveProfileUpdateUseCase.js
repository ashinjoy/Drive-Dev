import { KafkaClient } from "../../events/KafkaClient.js"
import { TOPIC,DRIVER_UPDATED } from "../../events/config.js"
export class ApproveProfileUpdateUseCase{
    constructor(dependencies){
        this.adminRepository = new dependencies.repository.MongoAdminRepository()
    this.kafka = new KafkaClient()

    }
    async execute(driverId){
        try {
            const approveProfileUpdate =  await this.adminRepository.approveProfileUpdateRequest(driverId)
            const datToPublish = {
                _id:approveProfileUpdate._id,
                isVerified:approveProfileUpdate.isVerified,
                editRequest:approveProfileUpdate.editRequest
            }
            this.kafka.produceMessage(TOPIC,{
                type:DRIVER_UPDATED,
                value:JSON.stringify(datToPublish)
              })
              return approveProfileUpdate
            
        } catch (error) {
            console.error(error)
        }
    }
}