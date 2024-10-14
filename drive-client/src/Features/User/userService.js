import axios from "../../Utils/Axios/baseUrl";
import { UserPrivate } from "../../Utils/Axios/userInterceptor";

export const googleAuthService = async (token) => {
    const data = { token };
    return await axios.post("auth/user/login/google", data);
};

export const emailAuthService = async (email) => {
    return await axios.post("auth/user/login/email", { email });
};
export const verifyOtpService = async (otp) => {
  return await axios.post("auth/user/verify-otp", { otp });
};

export const resendOtpService = async (email) => {

    return await axios.post("auth/user/resend-otp", { email });
};

export const userProfileUpdateService = async (formdata) => {
  return await UserPrivate.put(`auth/user/userProfileUpdate`, formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const userLogoutService = async () => {
  return await UserPrivate.get("auth/user/logout");
};

export const userCurrentLocationService = async (coordinates) => {
  return await UserPrivate.post("trip/users/location", coordinates);
};

export const geoCodeService = async(pickup,pickupLong)=>{
  return await axios.get(`trip/users/reverse-geocode?pickupLat=${pickup}&pickupLong=${pickupLong}`)
}


export const addMoneyToWalletService = async (data) => {
  try {
    const response = await UserPrivate.post("payment/user/wallet-addmoney", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const getWalletBalance = async (userId) => {
  try {
    const response = await UserPrivate.get(`payment/user/walletbalance/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error
    
  }
};



export const getWalletHistoryService = async (data) => {
  try {
    const response = await UserPrivate.get(`payment/user/wallethistory?userId=${data?.userId}&page=${data?.page}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const saveContactServices = async (contactDetails) => {

    return await UserPrivate.post("auth/user/save-contacts", contactDetails);
 
};

export const SosAlertService = async(userId)=>{
  return await UserPrivate.post('trip/users/emergency-alert',{userId})
}

export const reviewRatingsService = async(formData)=>{
  return await UserPrivate.post('trip/users/review',formData)
}
