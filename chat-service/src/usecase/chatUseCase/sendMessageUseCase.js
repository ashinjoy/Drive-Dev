// import { sendMessage } from "../../utils/socket.js"
// export class SendMessageUseCase{
//     constructor(dependencies){
// this.chatRepository = new dependencies.repository.MongoChatRepository()
//     }
//     async execute(data){
//         try {


            
// const isChatExist = await this.chatRepository.findChatByTripId(data?.tripId)


// let chat
// if(!isChatExist){
    
    
//    chat =  await this.chatRepository.createChat(data)
// }
// const latestMessage = await this.chatRepository.createNewMessage(data)


// sendMessage('latestMessage',latestMessage,data?.receiverId)
// return
            
//         } catch (error) {
//             console.error(error)
//         }
//     }
// }
import { sendMessage } from "../../utils/socket.js";

export class SendMessageUseCase{
    constructor(dependencies){
        this.chatRepository = new dependencies.repository.MongoChatRepository()
        
    }
    async execute(data){
        try {
            let recieverType
            const {senderId,recieverId,senderType,tripId,message,token,driverId,userId} = data
            console.log('recieverId in controller ',recieverId);
            
            if(!senderId || !recieverId ||!senderType || !tripId || !message || !token ||!driverId ||!userId){
                const error = new Error()
                error.message = 'Bad Request'
                error.status = 400
                throw error
            }
            if(senderType == 'user'){
                recieverType = 'driver'
            }else if(senderType == 'driver'){
                recieverType = 'user'
            }else{
                console.log('hi');
                
            }

            const isChatStarted = await this.chatRepository.findChatByTripId(tripId)
            // console.log(isChatStarted);
            if(!isChatStarted){
                console.log('inideede');
                
                await this.chatRepository.createChat({tripId,senderId,recieverId,senderType,recieverType,driverId,userId})
            }
            const createMessage = await this.chatRepository.createNewMessage({tripId,senderId,recieverId,senderType,recieverType,message})
            // console.log(createMessage);
            
            const messageDetails = {
                senderId:createMessage?.senderId,
                message:createMessage?.message,
                createdAt:createMessage?.createdAt,
                _id:createMessage?._id
            }
            console.log('messageDetails',messageDetails);
            
            sendMessage('latestMessage',messageDetails,tripId)
            console.log('lohg');
            
            return createMessage

        } catch (error) {
            console.error(error);
            throw error
            
        }
    }
}