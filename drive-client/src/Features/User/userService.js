import axios from "../../Utils/Axios/baseUrl";
import { UserPrivate } from "../../Utils/Axios/userInterceptor";

export const googleAuthService = async (token) => {
  try {
    const data = { token, type: "google" };
    return await axios.post("auth/user/login", data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const emailAuthService = async (email) => {
  try {
    return await axios.post("auth/user/login", { email, type: "email" });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const verifyOtpService = async (otp) => {
  try {
    return await axios.post("auth/user/verify-otp", { otp });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resendOtpService = async (email) => {
  try {
    return await axios.post("auth/user/resend-otp", { email });
  } catch (error) {
    console.error('err in user',error);
    throw error;
  }
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

export const geoCodeService = async (pickup, pickupLong) => {
  return await axios.get(
    `trip/users/reverse-geocode?pickupLat=${pickup}&pickupLong=${pickupLong}`
  );
};

export const addMoneyToWalletService = async (data) => {
  try {
    const response = await UserPrivate.post(
      "payment/user/wallet-addmoney",
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWalletBalance = async (userId) => {
  try {
    const response = await UserPrivate.get(
      `payment/user/walletbalance/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWalletHistoryService = async (data) => {
  try {
    const response = await UserPrivate.get(
      `payment/user/wallethistory?userId=${data?.userId}&page=${data?.page}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveContactServices = async (contactDetails) => {
  return await UserPrivate.post("auth/user/save-contacts", contactDetails);
};

export const SosAlertService = async (userId) => {
  return await UserPrivate.post("trip/users/emergency-alert", { userId });
};

export const reviewRatingsService = async (formData) => {
  return await UserPrivate.post("trip/users/review", formData);
};
