import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  googleAuthService,
  emailAuthService,
  verifyOtpService,
  resendOtpService,
  userProfileUpdateService,
  userLogoutService,
  userCurrentLocationService,
  saveContactServices,
  SosAlertService,
  reviewRatingsService,
} from "../../Features/User/userService";

export const googleAuth = createAsyncThunk(
  "googleAuth",
  async (token, { rejectWithValue }) => {
    try {
      const response = await googleAuthService(token);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const emailAuth = createAsyncThunk(
  "emailAuth",
  async (email, { rejectWithValue }) => {
    try {
      const response = await emailAuthService(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "verifyOtp",
  async (otp, { rejectWithValue }) => {
    try {
      const response = await verifyOtpService(otp);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "resendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resendOtpService(email);
      return response.data;
    } catch (error) {
      console.error("err in user action", error?.response?.data?.error);
     return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const userProfileUpdate = createAsyncThunk(
  "userProfileUpdate",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await userProfileUpdateService(formData);
      return response.data;
    } catch (error) {
      console.error(error?.response?.data?.error);
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const userLogout = createAsyncThunk("userLogout", async () => {
  try {
    const response = await userLogoutService();
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const userCurrentLocation = createAsyncThunk(
  "userCurrentLocation",
  async (coordinates) => {
    try {
      const response = await userCurrentLocationService(coordinates);
      return response.data;
    } catch (error) {}
  }
);

export const saveContacts = createAsyncThunk(
  "saveContacts",
  async (contactDetails) => {
    try {
      console.log("contactDetails", contactDetails);

      const response = await saveContactServices(contactDetails);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const SosAlert = createAsyncThunk(
  "sosAlert",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await SosAlertService(userId);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const reviewRatings = createAsyncThunk(
  "sosAlert",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await reviewRatingsService(formdata);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
