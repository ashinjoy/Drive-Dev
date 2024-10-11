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
  password: {
    type: String,
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
      enum:['point'],
      default:'point'
    },
    coordinates:{
      type:Array
    }
  }
},{timestamps:true});

export const driverModel = mongoose.model("driver", driverSchema);
