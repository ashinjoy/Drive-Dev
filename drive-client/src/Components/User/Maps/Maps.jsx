import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { TbPointFilled } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { searchLocationContext } from "../../../Context/UserSearchContext";
import ListVehiclePriceDetails from "../Trip/ListVehiclePriceDetails";
import useGeolocation from "../../../Hooks/useGeolocation";
import useMapRoutes from "../../../Hooks/useMapRoutes";

function Maps({ isSearch }) {
  const mapRef = useRef(null);
  const { pickUpCoords, dropCoords, pickupLocation, dropLocation } = useContext(
    searchLocationContext
  );
  const [pickupLongitude, setPickUpLng] = useState(null);
  const [pickupLatitude, setPickUpLat] = useState(null);
  const [dropoffLongitude, setDropOffLng] = useState(null);
  const [dropoffLatitude, setDropOffLat] = useState(null);
  const { nearbyDrivers } = useSelector((state) => state.trip);
  const [nearbyDriverLocations, setNearbyDriverLocations] = useState(null);
  const [viewState, setViewState] = useGeolocation(); // custom hook for fetching the state for the map
  const route = useMapRoutes(pickUpCoords, dropCoords); // custom hook for fetching the route connectings the markers in maps



  useEffect(() => {
    if (nearbyDrivers && nearbyDrivers.length > 0) {
      const driverCoordinates = nearbyDrivers.map((driver) => ({
        type: driver?.vehicleDetails?.vehicle_type,
        coordinates: driver?.currentLocation?.coordinates,
      }));
      setNearbyDriverLocations(driverCoordinates);
      return;
    }
  }, [nearbyDrivers]);

  useEffect(() => {
    if (pickUpCoords.length > 0) {
      setPickUpLng(pickUpCoords[0]);
      setPickUpLat(pickUpCoords[1]);
      setViewState((prev) => ({
        ...prev,
        longitude: pickUpCoords[0],
        latitude: pickUpCoords[1],
      }));
    }

    if (dropCoords.length > 0) {
      setDropOffLng(dropCoords[0]);
      setDropOffLat(dropCoords[1]);
    }
    if (pickUpCoords.length > 0 && dropCoords.length > 0) {
      const bounds = [ // Map settings in mapbox for setting boundary to map according to the markers.
        [
          Math.min(pickUpCoords[0], dropCoords[0]), 
          Math.min(pickUpCoords[1], dropCoords[1]),
        ],
        [
          Math.max(pickUpCoords[0], dropCoords[0]),
          Math.max(pickUpCoords[1], dropCoords[1]),
        ],
      ];
      if (mapRef.current) {
        mapRef.current.fitBounds(bounds, {
          padding: 20,
        });
      }
    }
  }, [pickUpCoords, dropCoords]);

  const routeLine = {
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#4285F4",
      "line-width": 5,
      "line-opacity": 1,
    },
  };

  return (
    <>
      

<div className={`${isSearch && 'flex-col-reverse lg:flex lg:flex-row '} flex flex-row justify-center w-full md:gap-2 lg:mt-[7rem]  lg:mr-0`}>
  {isSearch && (
    <div className="w-full lg:w-1/2">
      <ListVehiclePriceDetails
        pickUpCoords={pickUpCoords}
        dropCoords={dropCoords}
        pickupLocation={pickupLocation}
        dropLocation={dropLocation}
      />
    </div>
  )}

 
  <div className={`w-[90%] sm:w-full ${isSearch ? "w-full lg:w-[44%] " : "md:w-[85%]"} h-[50dvh]  md:h-[50dvh] lg:h-[82vh]`}>
    <Map
      ref={mapRef}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      attributionControl={false}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    >
      
      {pickupLongitude && pickupLatitude && (
        <Marker longitude={pickupLongitude} latitude={pickupLatitude} style={{ width: "2rem" }}>
          <TbPointFilled size={"2rem"} style={{ color: "#343434" }} />
        </Marker>
      )}
      {dropoffLongitude && dropoffLatitude && (
        <Marker longitude={dropoffLongitude} latitude={dropoffLatitude} style={{ width: "2rem" }}>
          <IoLocationSharp size={25} style={{ color: "red" }} />
        </Marker>
      )}

      
      {route && (
        <Source id="route" type="geojson" data={route}>
          <Layer {...routeLine} />
        </Source>
      )}
      {nearbyDriverLocations &&
        nearbyDriverLocations.map((driver, i) => (
          <Marker
            key={i}
            longitude={driver.coordinates[0]}
            latitude={driver.coordinates[1]}
            style={{ width: "2rem" }}
          >
            {driver.type === "Auto" ? (
              <img src="/assets/TukTuk_Green_v1.png" alt="AutoDriver_Marker" className="w-8" />
            ) : (
              <img
                src="/assets/scooter-illustration-vintage-vehicle-sign-and-symbol-vector-removebg-preview.png"
                alt="ScooterDriver_Marker"
                className="w-8"
              />
            )}
          </Marker>
        ))}
    </Map>
  </div>
</div>

    </>
  );
}

export default Maps;
