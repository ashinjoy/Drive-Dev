import { driverPrivate } from "../../Utils/Axios/driverInterceptor";

export const driverOnlineService = async (driverId,location) => {
  return await driverPrivate.post("trip/driver/online",{ driverId ,location});
};


