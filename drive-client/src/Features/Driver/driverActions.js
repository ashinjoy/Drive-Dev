import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerDriverService,
  verifyOtpService,
  resendOtpService,
  completeProfileService,
  driverLoginService,
  profileUpdateService,
  driverActiveService,
  driverInactiveService,
  logoutService,
  tripChartService
} from "./driverService";

export const registerDriver = createAsyncThunk(
  "registerDriver",
  async (formDetails, { rejectWithValue }) => {
    try {
      const response = await registerDriverService(formDetails);
      return response?.data
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const verifyDriverOtp = createAsyncThunk(
  "verifyDriverOtp",
  async (otp,{rejectWithValue}) => {
    try {
      const response = await verifyOtpService(otp);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.error)
    }
  }
);

export const resendDriverOtp = createAsyncThunk(
  "resendDriverOtp",
  async (email,{rejectWithValue}) => {
    try {
      const response = await resendOtpService(email);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data?.error)
    }
  }
);

export const driverCompleteProfile = createAsyncThunk(
  "driverCompleteProfile",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await completeProfileService(formdata);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const driverLogin = createAsyncThunk("driverLogin", async (formdata,{rejectWithValue}) => {
  try {
    console.log('fr',formdata);
    const response = await driverLoginService(formdata);
    return response.data;
  } catch (error) {
    console.log('err in login',error);
    return rejectWithValue(error?.response?.data?.error)
  }
});

export const profileUpdateRequest = createAsyncThunk('profileUpdate',async(profileDetails,{rejectWithValue})=>{
try {
  const response = await profileUpdateService(profileDetails)
  return response
} catch (error) {
 return rejectWithValue(error?.response?.data?.error)
}
})

export const logoutAction = createAsyncThunk('LogoutAction',async(_,{rejectWithValue})=>{
  try {
    const response = await logoutService()
    return response
  } catch (error) {
   return rejectWithValue(error?.response?.data?.error)
  }
  })

  export const driverActive =createAsyncThunk('driverActive',async(driverData,{rejectWithValue})=>{
try {
  const response = await driverActiveService(driverData)
  return response.data
} catch (error) {
  console.error(error)
}
  })

  export const driverInctive =createAsyncThunk('driverInctive',async(driverId,{rejectWithValue})=>{
    try {
      const response = await driverInactiveService(driverId)
      return response.data
    } catch (error) {
      console.error(error)
    }
      })

export const tripChart = createAsyncThunk('tripChart',async(data,{rejectWithValue})=>{
  try {
    const response = await tripChartService(data)
    return response.data
  } catch (error) {
    console.error(error)
  }
})
  
