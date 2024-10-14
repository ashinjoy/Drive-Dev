import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    tripId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'trip'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    driverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'driver'
    },
    review:{
        type:String
    },
    rating:{
        type:String
    }
})

export const reviewModal = mongoose.model('review',reviewSchema)
