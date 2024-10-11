import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user" ||"driver"
    },
   recieverId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "user" || "driver"
   },
   message:{
    type:String
   }
},{timestamps:true})

export const messageModel = mongoose.model('message',messageSchema)