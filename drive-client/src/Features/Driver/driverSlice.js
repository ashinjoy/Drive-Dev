  import { createSlice } from "@reduxjs/toolkit";
import {
  driverCompleteProfile,
  registerDriver,
  resendDriverOtp,
  verifyDriverOtp,
  driverLogin,
  profileUpdateRequest,
  driverActive,
  driverInctive,
  tripChart,
  logoutAction
} from "./driverActions";


const driverData  =JSON.parse(localStorage.getItem('driverData'))
const driverAccessToken = localStorage.getItem('driverAccessToken')
const driverStatus = JSON.parse(localStorage.getItem('status'))
const initialState = {
  driver: driverData ? driverData :'',
  token:driverAccessToken ? driverAccessToken : null,
  loading: false,
  success: false,
  currentStatus:driverStatus || null,
  report:null,
  message:'',
  error: "",
};

const driverSlice = createSlice({
    name: "driverSlice",
    initialState,
    reducers: {
      resestAll: (state) => {
       return initialState   
      },
      reset:(state)=>{
        state.loading = false
        state.success = false
        state.message = ""
      }
      
    },
    extraReducers(builder) {
      builder
        .addCase(registerDriver.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(registerDriver.fulfilled, (state, action) => {
            state.success = true
            state.message = action?.payload?.message
        })
        .addCase(registerDriver.rejected, (state, action) => {
          state.error = action?.payload
        })

        .addCase(verifyDriverOtp.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(verifyDriverOtp.fulfilled, (state, action) => {
          localStorage.setItem('driverData',JSON.stringify(action?.payload?.data))
          state.driver = action?.payload?.data
          state.message = action?.payload?.message
        })
        .addCase(verifyDriverOtp.rejected, (state, action) => {
          state.error = action?.payload
        })
        .addCase(resendDriverOtp.pending, (state, action) => {
          state.loading =  true
        })
        .addCase(resendDriverOtp.fulfilled, (state, action) => {
          console.log('actionnnnn',action);
          state.success =  true
          state.message = action?.payload?.message
        })
        .addCase(resendDriverOtp.rejected, (state, action) => {
          state.error = action?.payload
        })
        .addCase(driverLogin.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(driverLogin.fulfilled, (state, action) => {
          console.log('asas',action)
          localStorage.setItem('driverData',JSON.stringify(action?.payload?.data))
          localStorage.setItem('driverAccessToken',action?.payload?.accessToken)
          state.success = true
          state.driver = action?.payload?.data
          state.token = action?.payload?.accessToken
          state.message = action?.payload?.message
        })
        .addCase(driverLogin.rejected, (state, action) => {
          state.error = action?.payload
        })
        .addCase(driverCompleteProfile.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(driverCompleteProfile.fulfilled, (state, action) => {
          localStorage.setItem('driverData',JSON.stringify(action?.payload?.data))
          state.success = true
          state.driver = action?.payload?.data
          state.message = action?.payload?.message       
        })
        .addCase(driverCompleteProfile.rejected, (state, action) => {
          state.error = action?.payload
        })
        .addCase(profileUpdateRequest.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(profileUpdateRequest.fulfilled, (state, action) => {
          console.log('myactionin',action);
          localStorage.setItem('driverData',JSON.stringify(action?.payload?.data?.driverData))
          localStorage.removeItem('driverAccessToken')
          state.success = true
          state.driver = action?.payload?.data
          state.message = action?.payload?.data?.message
        })
        .addCase(profileUpdateRequest.rejected, (state, action) => {
          console.log('profileUpdation',action);
          // state.error
        })
        .addCase(driverActive.pending,(state,action)=>{
          state.loading = true
        })
        .addCase(driverActive.fulfilled,(state,action)=>{
          localStorage.setItem('status',JSON.stringify(action?.payload?.data))
          state.success = true
          state.currentStatus = action?.payload?.data
        })
        .addCase(driverActive.rejected,(state)=>{
          // state.error = 
        })
        .addCase(driverInctive.pending,(state,action)=>{
          state.loading = true
        })
        .addCase(driverInctive.fulfilled,(state,action)=>{
          localStorage.setItem('status',JSON.stringify(action?.payload?.data))
          state.currentStatus = action?.payload?.data
          state.message = action?.payload?.message
        })
        .addCase(driverInctive.rejected,(state,action)=>{
          // state.error = error
        })
        .addCase(tripChart.pending,(state)=>{
          state.loading = true
        })
        .addCase(tripChart.fulfilled,(state,action)=>{
          state.report = action?.payload?.tripStat
        })
        .addCase(tripChart.rejected,(state,action)=>{

        })
        .addCase(logoutAction.pending,(state)=>{
          state.loading = true
        })
        .addCase(logoutAction.fulfilled,(state,action)=>{
          localStorage.removeItem('driverData')
          localStorage.removeItem('driverAccessToken')  
          state.driver = null
          state.token = null          
        })
        .addCase(logoutAction.rejected,(state)=>{
          console.log('error');
          
        })
        
    }
})  
export const {resestAll,reset} = driverSlice.actions
export default driverSlice.reducer;
