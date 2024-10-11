import { twilioAlertMessage } from "../../utils/twilioAlert.js";
export class EmergencyAlertUseCase{
    constructor(dependencies){
        this.userRepository = new dependencies.repository.MongoUserRepository()
    }
    async execute(data){
        try {
            const {userId} = data
            const date = new Date()
           const userData =  await this.userRepository.findUserById(userId)
           const getUserSavedContacts = userData.savedContacts
           console.log("userData",userData);
           console.log("getUserSavedContacts",getUserSavedContacts);

           
          const alert  = await  twilioAlertMessage(userData,getUserSavedContacts)
        //   console.log(alert);
        //   return alert
          
        } catch (error) {
            console.error(error);
            
        }
    }
}