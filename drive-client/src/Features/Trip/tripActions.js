import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  searchNearByDriverService,
  requestRideService,
  acceptTripService,
  rejectTripService,
  startRideService,
  finishRideService,
  sendMessageService,
  cancelRideService,
  paymentService,
  rideOngoingService,
  stripePaymentConfirmService
} from "./tripService";


export const seacrhNearByDriver = createAsyncThunk(
  "searchNearByDrivers",
  async (details, { rejectWithValue }) => {
    try {
      const response = await searchNearByDriverService(details);
      return response.data;
    } catch (error) {
      rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const requestRideAction = createAsyncThunk(
  "requestRide",
  async (data, { rejectWithValue }) => {
    try {
      const response = await requestRideService(data);
      return response.data;
    } catch (error) {
      console.log("error inside requestride", error);
      rejectWithValue(error);
    }
  }
);

export const acceptTrip = createAsyncThunk(
  "acceptTrip",
  async (details, { rejectWithValue }) => {
    try {
      const response = await acceptTripService(details);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const rejectTrip = createAsyncThunk(
  "acceptTrip",
  async (details, { rejectWithValue }) => {
    try {
      const response = await rejectTripService(details);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const startTrip = createAsyncThunk(
  "startRide",
  async (data, { rejectWithValue }) => {
    try {
      const response = await startRideService(data);
      return response.data;
    } catch (error) {
      console.error(error);
      rejectWithValue(error);
    }
  }
);

export const finishRide = createAsyncThunk("finishRide", async (data) => {
  try {
    const response = await finishRideService(data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const sendMessage = createAsyncThunk("sendMessage", async (data) => {
  try {
    const response = await sendMessageService(data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const cancelRide = createAsyncThunk(
  "cancelRide",
  async (rideCancelInfo,{rejectWithValue}) => {
    try {
      const response = await cancelRideService(rideCancelInfo);
      return response.data;
    } catch (error) {
    return rejectWithValue(error?.response?.data?.error)
    }
  }
);

export const payment = createAsyncThunk("payment", async (paymentData,{rejectWithValue}) => {
  try {
    const response = await paymentService(paymentData);
    if (response && response?.payment && response?.payment?.url) {
      window.location.href = response.payment.url;
    }
    console.log('response',response);
    
    return response;
  } catch (error) {
console.error(error);
return rejectWithValue(error?.response?.data?.error)

  }
});

export const rideOngoing = createAsyncThunk("rideOngoing",async(userId)=>{
  try {
    const response = await rideOngoingService(userId)
    return response.data
  } catch (error) {
    console.error(error);
  }
})

export const stripePaymentConfirmation = createAsyncThunk('stripePaymentConfirmation',async(paymentInfo)=>{
  try {
    const response = await stripePaymentConfirmService(paymentInfo)
    return response.data
  } catch (error) {
    console.error(error);
    throw error
    
  }
})
