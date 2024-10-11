import axios from "axios";


const getAccessToken = () => {
  return localStorage.getItem("userAccessToken");
};

//Private Api foe User Protected Routes
// reference from medium article
//https://medium.com/@velja/token-refresh-with-axios-interceptors-for-a-seamless-authentication-experience-854b06064bde


export const UserPrivate = axios.create({
  baseURL: "http://localhost:3001/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

UserPrivate.interceptors.request.use(
  (request) => {
    const userAccessToken = getAccessToken();
    if (userAccessToken) {
      request.headers["Authorization"] = `Bearer ${userAccessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

UserPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    try {

      //handling error from backend when AccwessToken expiures and creates new token

      if (error?.response?.status === 401 && !originalRequest._retry) {
        
        //To avoid infinite retry loops
        originalRequest._retry = true
        try {
          const response = await UserPrivate.get("auth/user/refreshToken");
          const newUserAccessToken = response.data;
          
       localStorage.setItem(
            "userAccessToken",
            newUserAccessToken
          );
          UserPrivate.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newUserAccessToken}`;
          return UserPrivate(originalRequest);
        } catch (error) {
          console.log("handle Error by logging out user");
          return Promise.reject(error)
          
        }
       
      }
      if(error?.response?.status === 403  && !originalRequest._retry){
        console.log('inside te');
        
        localStorage.removeItem('userAccessToken')
        localStorage.removeItem('userDetail')
        window.location.href ='/login'
        
        
      }
    } catch (error) {
      
    }
    return Promise.reject(error)
  }
);
