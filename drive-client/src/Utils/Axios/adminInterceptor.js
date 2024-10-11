import axios from 'axios'

export const adminInstance = axios.create({
    baseURL:'http://localhost:3001/api/',
    withCredentials:true
})

const getAccessToken =()=>{
    return localStorage.getItem('adminAccessToken')
}

export const adminPrivate = axios.create({
    baseURL:'http://localhost:3001/api/',
    headers:{
        'Content-Type':'application/json'
    },  
    withCredentials:true
})

adminPrivate.interceptors.request.use((request)=>{
const adminAccessToken = getAccessToken()
if(adminAccessToken){
    request.headers['Authorization'] = `Bearer ${adminAccessToken}`
}
return request
},(error)=>{
   return Promise.reject(error)
})

adminPrivate.interceptors.response.use((response)=>{
    return response
},async(error)=>{
    const originalRequest = error.config;
    console.log(error);
    try {
      if (error?.response?.status === 401 && !originalRequest._retry) {
        console.log('entry'); 
        originalRequest._retry = true
        const response = await adminPrivate.get("auth/admin/refreshToken");
        const newUserAcceessToken = response.data;
        console.log('user',newUserAcceessToken);
     localStorage.setItem(
          "adminAccessToken",
          newUserAcceessToken
        );
        adminPrivate.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newUserAcceessToken}`;
        return adminPrivate(originalRequest);
      }
    } catch (error) {

    }
    return Promise.reject(error)
    
})

