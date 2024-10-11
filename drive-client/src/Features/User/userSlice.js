import { createSlice } from "@reduxjs/toolkit";
import { emailAuth, googleAuth, verifyOtp, resendOtp,userProfileUpdate,userCurrentLocation, saveContacts, userLogout } from "./userActions";


const userDetails = JSON.parse(localStorage.getItem('userDetail'))

const userAccessToken = localStorage.getItem('userAccessToken')

const initialState = {
  user:userDetails ? userDetails : null,
  token: userAccessToken ? userAccessToken :null,
  loading: false,
  success: false,
  error: "",
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetAll: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.success = false;
      state.error = "";
      state.message = "";
    },
    reset:(state)=>{
      state.loading = false;
      state.success = false
      state.error = ""
      state.message = ''
    }
  },

  extraReducers(builder) {
    builder
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
      })

      .addCase(googleAuth.fulfilled, (state, action) => {
        localStorage.setItem("userAccessToken", action?.payload?.accessToken);
        localStorage.setItem('userDetail',JSON.stringify(action?.payload?.data))
        state.success = true;
        state.user = action?.payload?.data;
        state.token = action?.payload?.accessToken;
        state.message = action?.payload?.message;
      })

      .addCase(googleAuth.rejected, (state, action) => {  
        state.error = action?.payload;
      })

      .addCase(emailAuth.pending, (state) => {
        state.loading = true;
      })

      .addCase(emailAuth.fulfilled, (state, action) => {
        state.success = true;
        state.message = action?.payload?.message;
      })
      .addCase(emailAuth.rejected, (state, action) => {
        state.error = action?.payload;
      })
      .addCase(verifyOtp.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        
        localStorage.setItem("userAccessToken", action?.payload?.accessToken);
        localStorage.setItem('userDetail',JSON.stringify(action?.payload?.data))
        state.success = true;
        state.user = action?.payload?.data;
        state.token = action?.payload?.accessToken;
        state.message = action?.payload?.message;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.error = action?.payload;
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.success = true;
        state.message = action?.payload?.message;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.error = action?.payload?.message;
      })
      .addCase(userProfileUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(userProfileUpdate.fulfilled, (state, action) => {
        
        localStorage.setItem('userDetail',JSON.stringify(action?.payload?.data))
        state.success = true;
        state.user = action?.payload?.data
        state.message = action?.payload?.message;
      })
      .addCase(userProfileUpdate.rejected, (state,action) => {
        console.log('updateProfile',action);
        state.error = action?.payload
      })
      .addCase(userCurrentLocation.pending,(state,action)=>{
        state.loading = true
      })
      .addCase(userCurrentLocation.fulfilled,(state,action)=>{
        localStorage.setItem('userDetail',JSON.stringify(action.payload?.userDetail))
        state.success = true
        state.user =action?.payload?.userDetail
      })
      .addCase(userCurrentLocation.rejected,(state,action)=>{
        console.log('eror');
        
        // state.error = action.payload
      })
      .addCase(saveContacts.pending,(state,action)=>{
       state.loading =  true
      })
      .addCase(saveContacts.fulfilled,(state,action)=>{
        localStorage.setItem('userDetail',JSON.stringify(action.payload?.userDetail))
        state.success = true
        state.user = action?.payload?.userDetail
      })
      .addCase(saveContacts.rejected,(state,action)=>{
        // state.error = 
      })
      .addCase(userLogout.pending,(state)=>{
        state.loading = true
      })
      .addCase(userLogout.fulfilled,(state,action)=>{
        localStorage.removeItem('userDetail')
        localStorage.removeItem('userAccessToken')
        state.token = null
        state.user =null
        state.message = action.payload?.message
      })
      .addCase(userLogout.rejected,(state,action)=>{
        console.log('err');
        
      })
  },
});

export const { resetAll ,reset } = userSlice.actions;

export default userSlice.reducer;
