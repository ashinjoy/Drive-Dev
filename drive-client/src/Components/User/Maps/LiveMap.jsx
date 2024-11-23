import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Map, { Marker, Source, Layer } from "react-map-gl";
import { useSocket } from "../../../Hooks/socket";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import RippleEffect from "./RippleEffect";

function LiveMapUpdates() {
  const mapContainerRef = useRef(null);
  const { token } = useSelector((state) => state.user);
  const { tripDetail,tripStatus } = useSelector((state) => state.trip);
  const [pickup, setPickUp] = useState([]);
  const [dropOff, setDropoff] = useState([]);
  const [route,setRoute] = useState(null)
  const {socket,chatSocket} = useSocket();
  const [driverCoords, setDriverCoords] = useState([]);
  const [viewState, setViewState] = useState({ 
    latitude:9.934814501530493,
    longitude:76.3260732465575,
    zoom:13
  });


  const calculateBounds = useCallback(() => {
    if (!tripDetail) return null;
    const { startLocation, endLocation, driverDetails } = tripDetail;
    return [
      [
        Math.min(
          startLocation.coordinates[0],
          endLocation.coordinates[0],
          driverDetails.currentLocation.coordinates[0]
        ),
        Math.min(
          startLocation.coordinates[1],
          endLocation.coordinates[1],
          driverDetails.currentLocation.coordinates[1]
        ),
      ],
      [
        Math.max(
          startLocation.coordinates[0],
          endLocation.coordinates[0],
          driverDetails.currentLocation.coordinates[0]
        ),
        Math.max(
          startLocation.coordinates[1],
          endLocation.coordinates[1],
          driverDetails.currentLocation.coordinates[1]
        ),
      ],
    ];
  }, [tripDetail]);

  const fetchRoute = useCallback(async () => {
    if (!tripDetail) return;
    const { startLocation, endLocation, driverDetails } = tripDetail;
    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${driverDetails.currentLocation.coordinates[0]},${driverDetails.currentLocation.coordinates[1]};${startLocation.coordinates[0]},${startLocation.coordinates[1]};${endLocation.coordinates[0]},${endLocation.coordinates[1]}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
    );
    const routeData = response?.data?.routes[0]?.geometry;
    if (routeData) setRoute(routeData);
  }, [tripDetail]);

  const updateViewState = useCallback(() => {
    const bounds = calculateBounds();
    if (mapContainerRef.current && bounds) {
      mapContainerRef.current.fitBounds(bounds, { padding: 20 });
    }
  }, [calculateBounds]);

  useEffect(() => {
    if (chatSocket && token) {
      chatSocket.emit("user-chat-connect", tripDetail?._id);
    }
  }, [chatSocket, token, tripDetail]);

  useEffect(() => {
    if (tripDetail && (tripStatus === "started" || tripStatus === "accepted")) {
      const { startLocation, endLocation, driverDetails } = tripDetail;

      setPickUp(startLocation.coordinates);
      setDropoff(endLocation.coordinates);
      setDriverCoords(driverDetails.currentLocation.coordinates);

      fetchRoute();
      updateViewState();
    }
  }, [tripDetail, tripStatus, fetchRoute, updateViewState]);

  useEffect(() => {
    if (socket && tripDetail && (tripStatus === "accepted" || tripStatus === "started")) {
      const handleLiveLocation = (data) => {
        setDriverCoords(data?.liveLocation);
      };

      socket.on("live-location", handleLiveLocation);

      return () => {
        socket.off("live-location", handleLiveLocation);
      };
    }
  }, [socket, tripDetail, tripStatus]);

  const routeLine = useMemo(
    () => ({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": 5,
        "line-opacity": 0.75,
      },
    }),
    []
  );

  return (
    <>
     <div
    className="w-full lg:w-[65%] h-[50vh] lg:h-[80dvh] mt-4 lg:mt-[5rem] lg:ml-[2rem] flex justify-center items-center"
    style={{ position: 'relative' }}
  >
    <Map
      ref={mapContainerRef}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{ width: '100%', height: '100%' }}
      attributionControl={false}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      {pickup && pickup.length > 0 && (
        <Marker longitude={pickup[0]} latitude={pickup[1]} style={{ width: '2rem' }}>
          <img src="/assets/pickup_marker.png" alt="Dropoff Marker" />
        </Marker>
      )}
      {dropOff && dropOff.length > 0 && (
        <Marker longitude={dropOff[0]} latitude={dropOff[1]} style={{ width: '2rem' }}>
          <img src="/assets/dest_marker.png" alt="Dropoff Marker" />
        </Marker>
      )}

      {driverCoords && driverCoords.length > 0 && (
        <Marker longitude={driverCoords[0]} latitude={driverCoords[1]} style={{ width: '2rem' }}>
          <img src="/assets/wifi-tracking.png" alt="Dropoff Marker" />
        </Marker>
      )}
      {route && (
        <Source id="route" type="geojson" data={route}>
          <Layer {...routeLine} />
        </Source>
      )}
      {tripStatus === 'requested' && <RippleEffect />}
    </Map>
  </div>
  
   </>
  );
}

export default LiveMapUpdates;
