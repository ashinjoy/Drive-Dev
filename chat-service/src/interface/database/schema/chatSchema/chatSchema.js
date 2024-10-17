// import mongoose from 'mongoose'

// const chatSchema = new mongoose.Schema({
//     tripId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Trip"
//     },
//     participants:[{
//         type:mongoose.Schema.Types.ObjectId,
//         ref: "user" || "driver"
//     }],
//     messages:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"message"
//         }
//     ]
// },{timestamps:true})

// export const chatModel = mongoose.model('chat',chatSchema)

import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "trip",
    },
    participants: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref:'user',
        },
        driverId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'driver'
        }
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
      },
    ],
  },
  { timestamps: true }
);

export const chatModel = mongoose.model("chat", chatSchema);
