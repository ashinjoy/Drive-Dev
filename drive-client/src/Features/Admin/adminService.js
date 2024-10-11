import axios from "../../Utils/Axios/baseUrl";
import { adminPrivate } from "../../Utils/Axios/adminInterceptor";

export const adminLoginService = async (formdata) => {
  return await axios.post("auth/admin/login", formdata);
};

export const getDriverDetailService = async (data) => {
  console.log("enterd get req");
  return adminPrivate.get(`auth/admin/getAllDrivers?page=${data}`);
};

export const blockUnblockDriverService = async (driverId) => {
  return adminPrivate.patch(
    `/auth/admin/blockUnblockDrivers/${driverId}`
  );
};

export const driverDetailService = async (driverId) => {
  return adminPrivate.get(
    `/auth/admin/viewDriver-Detail/${driverId}`
  );
};

export const approveDriverService =async(driverId)=>{
  return adminPrivate.patch(`/auth/admin/approveDriver/${driverId}`)
}

export const approveDriverProfileUpdateService =async(driverId)=>{
  return adminPrivate.patch(`/auth/admin/verify-driverProfileUpdate/${driverId}/approval`)
}

export const getUserDetailService =async(data)=>{
  return adminPrivate.get(`/auth/admin/getAllUsers?page=${data}`)
}

export const blockUnblockUserService = async(userId)=>{
  return adminPrivate.patch(`/auth/admin/blockunblockUser/${userId}`)
}

export const searchDriverService = async(search)=>{
  return adminPrivate.get(`/auth/admin/drivers?search=${search}`)
}

export const newlyRegisteredUserService = async(filter)=>{
  return adminPrivate.get(`auth/admin/dashboard/newusers/${filter}`)
}

export const companyBalanceService = async()=>{
  try {
    const response = await adminPrivate.get('payment/admin/balance')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const tripsCountService = async()=>{
  try {
    const response = await adminPrivate.get('trip/admin/total-trips-completed')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const latestRidesService =async()=>{
  try {
    
    const response = await adminPrivate.get('trip/admin/latest-trips')
    return response.data
  } catch (error) {
    console.error(error)
    
  }
}
export const mostActiveDriversService =async()=>{
  try {
    
    const response = await adminPrivate.get('trip/admin/most-active-drivers')
    return response.data
  } catch (error) {
    console.error(error)
    
  }
}

export const tripReportService = async(filter)=>{
return await adminPrivate.get(`payment/admin/trip-report/${filter}`)
}

export const downloadReportService = async(filter)=>{
  return await adminPrivate.post(`payment/admin/download-report`,filter)
}

