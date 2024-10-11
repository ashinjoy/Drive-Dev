import { chatModel } from "../../database/schema/chatSchema/chatSchema.js"
import { messageModel } from "../../database/schema/chatSchema/messageSchema.js"
export class ChatRepository{
    constructor(){}

    async findChatByTripId(id){
        try {
            const data =  await chatModel.findOne({tripId:id})
            return data
        } catch (error) {
            console.error(error);
            throw error
        }

    }
    async createChat(data){
        try {
            
         return  await chatModel.create({
                tripId:data?.tripId,
                participants:[data?.senderId,data?.receiverId],
            })
        } catch (error) {
            console.error(error)
        }
    }

    async createNewMessage(data){
        try {
          const newMessage =    await messageModel.create({
                senderId:data?.senderId,
                recieverId:data?.receiverId,
                message:data?.message
            })
            console.log('newMessage',newMessage);
            
            const updateChat_LatestMessage = await chatModel.findOneAndUpdate({tripId:data?.tripId},{$push:{messages:newMessage._id}},{new:true})
            console.log('updatelatest',updateChat_LatestMessage);
            
            return newMessage
        } catch (error) {
            console.error(error)
        }
    }

    async getAllMessages(id){
        try {
 const chats = await chatModel.findOne({tripId:id}).populate("messages")
 if(!chats){
    return []
 }
 return chats.messages    
        } catch (error) {
            
        }
    }
}