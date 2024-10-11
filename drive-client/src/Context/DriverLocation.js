import React, { createContext, useEffect, useState } from "react";
export const driverLiveLocation = createContext(null);

function DriverLocation({ children }) {
  const [driverLive, setDriverLive] = useState([]);

  const [tripCoordinates, setTripCoordintes] = useState([]);

  const [startRide, setStartRide] = useState(false);

  const [endRide, setEndRide] = useState(false);


  const [enableChat, setEnableChat] = useState(false);


  useEffect(()=>{
console.log('startRide in UseEffect',startRide);

  },[startRide])
  return (
    <driverLiveLocation.Provider
      value={{
        driverLive,
        setDriverLive,
        enableChat,
        setEnableChat,
        tripCoordinates,
        setTripCoordintes,
        startRide,
        setStartRide,
        endRide,
        setEndRide
      }}
    >
      {children}
    </driverLiveLocation.Provider>
  );
}

export default DriverLocation;
