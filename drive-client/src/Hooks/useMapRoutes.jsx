import React, { useEffect, useState } from "react";
import axios from "axios";

function useMapRoutes(pickUpCoords, dropCoords) {
  const [route, setRoute] = useState(null);
  useEffect(() => {
    if (pickUpCoords.length > 0 && dropCoords.length > 0) {
      const getRoute = async () => {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpCoords[0]},${pickUpCoords[1]};${dropCoords[0]},${dropCoords[1]}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
          );
          console.log("Route GeoJSON", response.data);
          setRoute(response.data?.routes[0]?.geometry);
        } catch (error) {
          console.error("Failed to fetch the route", error);
        }
      };   
      getRoute();
    }
  }, [pickUpCoords, dropCoords]);
  return route
}

export default useMapRoutes;
