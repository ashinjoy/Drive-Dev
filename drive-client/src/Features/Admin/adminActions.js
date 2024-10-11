import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminLoginService,
  getDriverDetailService,
  blockUnblockDriverService,
  driverDetailService,
  approveDriverService,
  approveDriverProfileUpdateService,
  getUserDetailService,
  blockUnblockUserService,
  searchDriverService,
  newlyRegisteredUserService,
  tripReportService,
  downloadReportService
} from "./adminService";


export const adminLogin = createAsyncThunk(
  "adminLogin",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await adminLoginService(formdata);
      return response.data;
    } catch (error) {
      console.log("errin catch", error);
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const getDriverDetails = createAsyncThunk(
  "getDriverDetails",
  async (data, { rejectWithValue }) => {
    try {
      console.log("enterd list");
      const response = await getDriverDetailService(data);
      console.log("resp", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const blockUnblockDriver = createAsyncThunk(
  "blockUnblockDriver",
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await blockUnblockDriverService(driverId);
      console.log("resp", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const driverDetails = createAsyncThunk(
  "driverDetails",
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await driverDetailService(driverId);
      console.log("resp", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const approveDriver = createAsyncThunk(
  "approveDriver",
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await approveDriverService(driverId);
       return response.data
    } catch (error) {
      console.error(error);
      rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const approveDriverProfileUpdate = createAsyncThunk(
  "approveDriverProfileUpdate",
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await approveDriverProfileUpdateService(driverId);
      return response.data;
    } catch (error) {
      console.error(error);
      rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (data, { rejectWithValue }) => {
    try {
      console.log("enterd list");
      const response = await getUserDetailService(data);
      console.log("resp", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      rejectWithValue(error)
    }
  }
);

export const blockUnblockUser = createAsyncThunk(
  "blockUnblockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await blockUnblockUserService(userId);
      console.log("resp", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const searchDrivers = createAsyncThunk(
  "driverSearch",
  async (search,{rejectWithValue}) => {
    try {
      
      const response = await searchDriverService(search);
      console.log('response',response.data)
      return response.data  
    } catch (error) {
        console.error(error)
    }
  }
)

export const newlyRegisteredUsers = createAsyncThunk('newlyRegisterdUsers',async(filter,{rejectWithValue})=>{
try {
  console.log('fiyyer',filter);
  
  const response = await newlyRegisteredUserService(filter)
  return response.data
} catch (error) {
  console.error(error)
}
})

export const tripReports = createAsyncThunk('tripReport',async(filter,{rejectWithValue})=>{
  try {
    const response = await tripReportService(filter)
    return response.data
  } catch (error) {
    console.error(error);
    
  }
})

export const downloadReport = createAsyncThunk('downloadReport',async(filter,{rejectWithValue})=>{
  try {
    const response = await downloadReportService(filter)
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'driver-TripCollection-Report.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    return response.data;
  } catch (err) {
    console.error(err);
    
  }
})

