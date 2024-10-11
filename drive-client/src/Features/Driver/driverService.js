import axios from '../../Utils/Axios/baseUrl'

import {driverPrivate} from "../../Utils/Axios/driverInterceptor";

export const registerDriverService = async (formDetails) => {
  try {
    const response = await axios.post("auth/driver/signup",formDetails);
    return response;
  } catch (error) {

    throw error
    // console.error(error);
  }
};

export const verifyOtpService = async (otp) => {

    return await axios.post("auth/driver/verify-otp", { otp });
  

};

export const resendOtpService = async (email) => {
  try {
    return await axios.post("auth/driver/resend-otp", { email });
  } catch (error) {
    console.error(error);
  }
};

export const completeProfileService = async (formdata) => {
  try {
    console.log("from", formdata);
    return await axios.post("auth/driver/complete-profile", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error(error);
  }
};

export const profileUpdateService = async (formDetails) => {
  return driverPrivate.put('auth/driver/profileUpdate-request',formDetails,{headers:{'Content-Type':'multipart/form-data'}})
 };


export const driverLoginService = async(formDetails)=>{
  return await axios.post('auth/driver/login',formDetails)
}

export const logoutService = async()=>{
  return await driverPrivate.get('auth/driver/logout')
}

export const driverActiveService = async(driverDetails)=>{
return await driverPrivate.put('trip/driver/online',driverDetails)
}

export const driverInactiveService = async(driverId)=>{
  return await driverPrivate.put('trip/driver/offline',{driverId})
  }
export const getDriverBalance = async(driverId)=>{
  try {
  const response = await driverPrivate.get(`payment/driver/walletbalance/${driverId}`)
  console.log(response.data);
  
  return response.data
  } catch (error) {
    console.error(error)
  }
}  

export const getDriverWalletDetailService = async(data)=>{
  
return await driverPrivate.get(`payment/driver/walletdetails?driverId=${data?.driverId}&page=${data?.page}`)
}

export const tripChartService =async(data)=>{
  return await driverPrivate.get(`trip/driver/tripcount?driverId=${data?.driverId}&filter=${data?.filter}`)
}

export const getCompletedTripsCountService = async(driverId)=>{
  try {
  const response =  await driverPrivate.get(`trip/driver/completedtrip-count/${driverId}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getTopTripsService = async(driverId)=>{
  try {
    const response = await driverPrivate.get(`trip/driver/top-trips/${driverId}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const latestTripService = async(driverId)=>{
  try {
    const response = await driverPrivate.get(`trip/driver/latest-trips/${driverId}`)
    return response.data
  } catch (error) {
    console.error(error);
    
  }
}