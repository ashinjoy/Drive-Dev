import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../../Features/Driver/driverActions'


const getAccessToken =()=>{
    return localStorage.getItem('driverAccessToken')
}

export const driverPrivate = axios.create({
    baseURL:'http://localhost:3001/api/',
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials:true
})

driverPrivate.interceptors.request.use((request)=>{
const driverAccessToken = getAccessToken()
if(driverAccessToken){
    request.headers['Authorization'] = `Bearer ${driverAccessToken}`
}
return request
},(error)=>{
   return Promise.reject(error)
})

driverPrivate.interceptors.response.use((response)=>{
    return response
},async(error)=>{
    const originalRequest = error.config;
    console.log(error);
    try {
      console.log("insied the block");
      
      if (error?.response?.status === 401 && !originalRequest._retry) {
        console.log('entry');
        
        originalRequest._retry = true
        const response = await driverPrivate.get("auth/driver/refreshToken");
        const newUserAccessToken = response.data;
        console.log('user',newUserAccessToken);
     localStorage.setItem(
          "driverAccessToken",
          newUserAccessToken
        );
        driverPrivate.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newUserAccessToken}`;
        return driverPrivate(originalRequest);
      }
      if(error?.response?.status === 403  && !originalRequest._retry){
        // console.log("entrered response");
        localStorage.removeItem('driverAccessToken')
        localStorage.removeItem('driverData')
        // const dispatch = useDispatch()
        window.location.href = '/driver/login'
      }
    } catch (error) {
console.log('catch error',error);
console.error("w",error);


    }
    return Promise.reject(error)
})
