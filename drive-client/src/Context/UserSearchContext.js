import React, { createContext, useState } from "react";
export const searchLocationContext = createContext(null);

function UserSearchContext({ children }) {
  const [pickUpCoords, setPickUpCoords] = useState([]);
  const [dropCoords, setDropCoords] = useState([]);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");

  const selectPickupLocation = (value) => {
    setPickUpCoords(value);
  };
  const selectDropOffLocation = (value) => {
    setDropCoords(value);
  };
  return (
    <searchLocationContext.Provider
      value={{
        pickUpCoords,
        selectPickupLocation,
        dropCoords,
        selectDropOffLocation,
        pickupLocation,
        setPickupLocation,
        dropLocation,
        setDropLocation,
      }}
    >
      {children}
    </searchLocationContext.Provider>
  );
}

export default UserSearchContext;
