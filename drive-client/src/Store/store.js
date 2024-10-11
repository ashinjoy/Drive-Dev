import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/User/userSlice";
import driverReducer from "../Features/Driver/driverSlice";
import adminReducer from "../Features/Admin/adminSlice";
import locationReducer from '../Features/Location/locationSlice'
import tripReducer from '../Features/Trip/tripSlice'


const store = configureStore({
  reducer: {
    user: userReducer,
    driver:driverReducer,
    admin:adminReducer,
    location:locationReducer,
    trip:tripReducer
  },
});

export default store;
