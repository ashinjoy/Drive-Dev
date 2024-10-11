import { createSlice } from "@reduxjs/toolkit";

import {adminLogin,getDriverDetails,blockUnblockDriver,driverDetails,getUserDetails, blockUnblockUser,approveDriver,newlyRegisteredUsers, tripReports} from './adminActions'

const adminData = JSON.parse(localStorage.getItem('adminData'))
const adminAccessToken = localStorage.getItem('adminAccessToken')

const initialState = {
    adminData: adminData ? adminData : '',
    adminToken:adminAccessToken ? adminAccessToken: null,
    userData:'',
    driverData:null,
    loading:false,
    success:false,
    message:'',
    totalDocs:1,
    error:'',
    report:null,
    tripReport:null
  };
  const adminSlice = createSlice({
      name: "adminSlice",
      initialState,
      reducers: {
        resetAdminState: () => {
         return initialState   
        }
      },
      extraReducers(builder) {
        builder
          .addCase(adminLogin.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(adminLogin.fulfilled, (state, action) => {
            localStorage.setItem('adminAccessToken',action?.payload?.accessToken)
            localStorage.setItem('adminData',JSON.stringify(action?.payload?.data))
              state.success = true
              state.adminData = action?.payload?.data
              state.adminToken = action?.payload?.accessToken
              state.message = action?.payload?.message
          })
          .addCase(adminLogin.rejected, (state, action) => {
            state.error = action?.payload
          })
          .addCase(getDriverDetails.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getDriverDetails.fulfilled, (state, action) => {
              state.success = true
              state.driverData = action?.payload?.driverDetails
              state.totalDocs =action.payload?.totalPages
              state.message = action?.payload?.message
          })
          .addCase(getDriverDetails.rejected, (state, action) => {
          })
          .addCase(blockUnblockDriver.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(blockUnblockDriver.fulfilled, (state, action) => {
              state.success = true
              state.driverData = state.driverData.map((data)=>{
                if(data._id == action?.payload?.id){
                  return {...data,isBlocked:action?.payload?.isBlocked}
                }
                return data
              })
              state.message = 'DriverManaged '
          })
          .addCase(blockUnblockUser.rejected, (state, action) => {
            console.log('action')
            state.error = action?.payload
          })
          .addCase(blockUnblockUser.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(blockUnblockUser.fulfilled, (state, action) => {
              state.success = true
              state.userData = state.userData.map((data)=>{
                if(data._id == action?.payload?.id){
                  return {...data,isBlocked:action?.payload?.isBlocked}
                }
                return data
              })
              state.message = 'UserManaged '
          })
          .addCase(blockUnblockDriver.rejected, (state, action) => {
            console.log('action')
            state.error = action?.payload
          })
          .addCase(driverDetails.pending, (state,action) => {
            state.loading = true;
          })
          .addCase(driverDetails.fulfilled, (state,action) => {
              state.success = true
              state.driverData = action?.payload?.driverDetails
              // state.totalDocs = action.payload?.totalPages
              state.message = action?.payload?.message
          })
          .addCase(driverDetails.rejected, (state, action) => {
            state.error = action?.payload
          })
          .addCase(getUserDetails.pending, (state) => {
            state.loading = true;
          })
          .addCase(getUserDetails.fulfilled, (state,action) => {
           
              state.success = true
              state.userData = action?.payload?.userDetails
              state.totalDocs = action.payload?.totalPages
              state.message = action?.payload?.message
          })
          .addCase(approveDriver.pending,(state,action)=>{
            state.loading = true
          })
          .addCase(approveDriver.fulfilled,(state,action)=>{
            state.success =  true
            state.driverData.isAccepted = action?.payload?.driverUpdatedData?.isAccepted
            state.message = action?.payload?.message
        })  
        .addCase(newlyRegisteredUsers.pending,(state,action)=>{
          state.loading = true
        })
        .addCase(newlyRegisteredUsers.fulfilled,(state,action)=>{
          console.log(action);
          
          state.report = action?.payload?.usersData
        })
        .addCase(newlyRegisteredUsers.rejected,(state,action)=>{
          // state.error
        })
        .addCase(tripReports.pending,(state)=>{
          state.loading = true
        })
        .addCase(tripReports.fulfilled,(state,action)=>{
          console.log('action in tripReport',action?.payload?.tripStat);
          
          state.tripReport = action?.payload?.tripStat
        })
        .addCase(tripReports.rejected,(state,action)=>{
          // state.error = 
        })
      }   
  })

  export const {resetAdminState,updateDriver} = adminSlice.actions

  export default adminSlice.reducer