import { createSlice } from "@reduxjs/toolkit";
import { driverOnlineAction } from "./locationActions";

const initialState = {
    userLocation:null,
    driverLocation:null,
    loading:false,
    success:false,
    error:'',
    message:false,
}

const locationSlice = createSlice({
    name:'locationSlice',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(driverOnlineAction.pending,(state)=>{
            state.loading =  true
        })
        .addCase(driverOnlineAction.fulfilled,(state,action)=>{
            localStorage.setItem('driverLocation',JSON.stringify(action?.payload?.data));
            state.success = true
            state.driverLocation = action?.payload?.data
        })
        .addCase(driverOnlineAction.rejected,(state,action)=>{
            state.error = action?.payload
        })
    }
})

export default locationSlice.reducer