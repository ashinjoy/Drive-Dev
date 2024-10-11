import { driverOnlineService } from "./locationServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const driverOnlineAction =  createAsyncThunk('driverOnline',async(data,{rejectWithValue})=>{
 try {
    console.log('dtaatoBacked',data);
    
    const {location,driverId} = data
 const response = await driverOnlineService(driverId,location)
 return response.data
 } catch (error) {
     console.log(error);
     rejectWithValue(error)
 }

})
    
 