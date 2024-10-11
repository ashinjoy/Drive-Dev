import mongoose from "mongoose";
const vehicleSchema = new mongoose.Schema({
  vehicle_type: {
    type: String,
    required: true,
  },
  rc_Number: {
    type: String,
    required: true,
  },
  permit: {
    type: String,
  }
});
const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  license_Number: {
    type: String,
    required: true,
  },
  license_Img: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  vehicleDetails: vehicleSchema,
  walletBalance:{
    type:Number,
    default:0
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  editRequest:{
    type:Boolean,
    default:false
  },
  currentLocation:{
    type:{
      type:String,
      enum:['Point'],
      default:'Point'
    },
    coordinates:{
      type:Array,
      default:[70.89898,10.98888]
    }
  },
  isActive:{
    type:Boolean,
    default:false
  },
  currentStatus:{
    type:String,
    enum:['inactive','active','busy'],
    default:'inactive'
  },
  
});

driverSchema.index({currentLocation:"2dsphere"})

export const driverModel = mongoose.model("driver", driverSchema);
