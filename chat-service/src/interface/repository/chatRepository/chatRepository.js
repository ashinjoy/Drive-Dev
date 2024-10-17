
import { chatModel } from "../../database/schema/chatSchema/chatSchema.js";
import { messageModel } from "../../database/schema/chatSchema/messageSchema.js";
export class ChatRepository {
  constructor() {}

  async findChatByTripId(id) {
    try {
      const data = await chatModel.findOne({ tripId: id });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createChat(data) {
    try {
      return await chatModel.create({
        tripId: data?.tripId,
        participants: [
          {
            userId: data?.senderId,
          },
          {
            driverId: data?.recieverId,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async createNewMessage(data) {
    try {
      const newMessage = await messageModel.create({
        senderId: data?.senderId,
        senderType: data?.senderType,
        recieverId: data?.recieverId,
        recieverType: data?.recieverType,
        message: data?.message,
      });
     await chatModel.findOneAndUpdate(
        { tripId: data?.tripId },
        { $push: { messages: newMessage._id } },
        { new: true }
      );

      return newMessage;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllMessages(id) {
    try { 
      const chats = await chatModel
      .findOne({ tripId: id })
      .populate("messages") 
        console.log(chats);
        
      if (!chats) {
        return [];
      }
      return chats?.messages;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
