import { KafkaClient } from "../../events/KafkaClient.js";
import { TOPIC ,USER_UPDATED } from "../../events/config.js";


export class SaveContactsUseCase{
    constructor(dependencies){
        this.userRepository = new dependencies.repository.MongoUserRepository()
        this.kafka = new KafkaClient()
    }
    async execute(contactDetails){
        try {
            const {userId,...rest} = contactDetails
            console.log("contactDetails",contactDetails);
            
          const saveContacts  = await this.userRepository.getUserAndSaveContacts(userId,rest)
          console.log("saved",saveContacts);
          this.kafka.produceMessage(TOPIC,{
            type:USER_UPDATED,
            value:JSON.stringify(saveContacts)
          })
          
          return saveContacts
        } catch (error) {
            console.log(error);
            
        }
    }
}