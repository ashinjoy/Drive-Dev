import mongoose from "mongoose";

const savedLocationSchema = new mongoose.Schema({
  name:{
    type:String
  },
  address:{
    type:{
      type:String,
      enum:['point'],
      default:'point'
    },
    coordinates:{
      type:Array,
      default:[0,0]
    }
  }
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  profileImg: {
    type: String,
  },
  authType: {
    type: String,
    enum: ["GOOGLE_AUTH", "EMAIL_AUTH"],
    default: "EMAIL_AUTH",
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
  currentLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: Array,
      default:[0,0]
    },
  },
  savedLocation : {
    type:[savedLocationSchema]
  },
  walletBalance:{
    type:Number,
    default:0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.index({ currentLocation: "2dsphere" });

export const userModel = mongoose.model("user", userSchema);
