// import mongoose from 'mongoose'

// const messageSchema = new mongoose.Schema({
//     senderId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"user" ||"driver"
//     },
//    recieverId:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref: "user" || "driver"
//    },
//    message:{
//     type:String
//    }
// },{timestamps:true})

// export const messageModel = mongoose.model('message',messageSchema)

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderType",
    },
    senderType: {
      type: String,
      enum: ["driver", "user"],
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "recieverType",
    },
    recieverType: {
      type: String,
      enum: ["driver", "user"],
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export const messageModel = mongoose.model("message", messageSchema);
