import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Map, { Marker, Source, Layer } from "react-map-gl";
import axios from "axios";
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
    console.log("viewState,", viewState, setViewState);
    console.log("coors", pickUpCoords, dropCoords);
  }, [viewState, pickUpCoords, dropCoords]);

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
      <div className="flex w-[100%] gap-2 ">
        {isSearch && (
          <ListVehiclePriceDetails
            pickUpCoords={pickUpCoords}
            dropCoords={dropCoords}
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
          />
        )}
        <Map
          ref={mapRef}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{
            marginTop: "7rem",
            width: isSearch ? "45%" : "90%",
            height: 575,
            overflow: "hidden",
            marginRight: 12,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          attributionControl={false}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          {pickupLongitude && pickupLatitude && (
            <Marker
              longitude={pickupLongitude}
              latitude={pickupLatitude}
              style={{ width: "2rem" }}
            >
              <TbPointFilled size={"2rem"} style={{ color: "#343434" }} />
            </Marker>
          )}
          {dropoffLongitude && dropoffLatitude && (
            <Marker
              longitude={dropoffLongitude}
              latitude={dropoffLatitude}
              style={{ width: "2rem" }}
            >
              <IoLocationSharp size={25} style={{ color: "red" }} />
            </Marker>
          )}
          {route && (
            <Source id="route" type="geojson" data={route}>
              <Layer {...routeLine} />
            </Source>
          )}
          {nearbyDriverLocations &&
            nearbyDriverLocations.length > 0 &&
            nearbyDriverLocations.map((driver, i) => {
              return (
                <Marker
                  key={i}
                  longitude={driver?.coordinates[0]}
                  latitude={driver?.coordinates[1]}
                  style={{ width: "5rem" }}
                >
                  {driver?.type === "Auto" ? (
                    <img
                      src="/assets/TukTuk_Green_v1.png"
                      alt="AutoDriver_Marker"
                    />
                  ) : (
                    <img
                      src="/assets/scooter-illustration-vintage-vehicle-sign-and-symbol-vector-removebg-preview.png"
                      alt="AutoDriver_Marker"
                    />
                  )}
                </Marker>
              );
            })}
        </Map>
      </div>
    </>
  );
}

export default Maps;
