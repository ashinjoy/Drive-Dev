import mongoose from 'mongoose'
const paymentSchema = new mongoose.Schema({
    tripId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Trip'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    fare:{
        type:Number
    },
    paymentMethod:{
        type:String
    },
    paymentStatus:{
        type:String,
        enum:['pending','paid','cancelled'],
        default:'pending'

    }
},{
    timestamps:true
})

export const paymentModel = mongoose.model('payment',paymentSchema)