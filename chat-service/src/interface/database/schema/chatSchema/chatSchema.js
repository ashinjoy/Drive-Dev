import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    tripId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Trip"
    },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user" || "driver"
    }],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"message"
        }
    ]
},{timestamps:true})

export const chatModel = mongoose.model('chat',chatSchema)