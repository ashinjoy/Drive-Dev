import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    driverId:{
        type:mongoose.Schema.Types.ObjectId
    },
    tripId:{
        type:mongoose.Schema.Types.ObjectId
    },
    amount:{
        type:Number
    },
    description:{
        type:String
    },
    type:{
        type:String
    }
},{
    timestamps:true
})

export const walletModel = mongoose.model('wallet',walletSchema)
