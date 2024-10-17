import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../Hooks/socket";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import * as turf from "@turf/turf";
import { driverLiveLocation } from "../../../Context/DriverLocation"
import {driverActive,driverInctive} from "../../../Features/Driver/driverActions";
import { finishRide } from "../../../Features/Trip/tripActions";
import { FaCar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { AiOutlineBell } from "react-icons/ai";
import { FaComments} from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import DriverNearByDropOff from "../Notifications/DriverNearByDropOff";
import Chat from "../../Chat/Chat";
import RideStartConfirmationModal from "../Modal/RideStartConfirmationModal";


function DriverMap() {
  const mapContainerRef = useRef(null);
  const [recieverId, setRecieverId] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const { driver, currentStatus } = useSelector((state) => state.driver);
  const { tripDetail, message } = useSelector((state) => state.trip);
  const { driverLive, setTripCoordintes, startRide, setStartRide,tripCoordinates } = useContext(driverLiveLocation);
  const dispatch = useDispatch();
  const [openChat, setOpenChat] = useState(false);
  const [pickup, setPickUp] = useState([]);
  const [dropOff, setDropoff] = useState([]);
  const [driverCoords, setDriverCoords] = useState([]);
  const [viewState, setViewState] = useState({
    longitude:76.32143838937851,
    latitude:9.940986128127982,
    zoom:12
  });
  const [route, setRoute] = useState(null);
  const [rideStarted, setRideStarted] = useState(false);
  const [endRide, setEndRide] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const { socket } = useSocket();
  const setMapBoundary = ()=>{
    const bounds = [
      [
        Math.min(
          tripDetail?.startLocation?.coordinates[0],
          tripDetail?.endLocation?.coordinates[0],
          tripDetail?.driverId?.currentLocation?.coordinates[0]
        ),
        Math.min(
          tripDetail?.startLocation?.coordinates[1],
          tripDetail?.endLocation?.coordinates[1],
          tripDetail?.driverId?.currentLocation?.coordinates[1]
        ),
      ],
      [
        Math.max(
          tripDetail?.startLocation?.coordinates[0],
          tripDetail?.endLocation?.coordinates[0],
          tripDetail?.driverId?.currentLocation?.coordinates[0]
        ),
        Math.max(
          tripDetail?.startLocation?.coordinates[1],
          tripDetail?.endLocation?.coordinates[1],
          tripDetail?.driverId?.currentLocation?.coordinates[1]
        ),
      ],
    ];

    if (mapContainerRef.current) {
      mapContainerRef.current.fitBounds(bounds, {
        padding: 20,
      });
    }
  }
  const checkApproxDistance = (driverLocation, destination) => {
    if (
      driverLocation &&
      driverLocation.length > 0 &&
      destination &&
      destination.length > 0
    ) {
      const approx = turf.distance(driverLocation, destination, {
        units: "meters",
      });
      return approx;
    }
  };

  const calculateTripCoordinates = (routeCoords)=>{
    console.log('routes',routeCoords);
    const routeLine = turf.lineString(routeCoords)
    const path = turf.lineChunk(routeLine,100,{units:'meters'})?.features
    const liveCoords = []
    console.log('payh',path);
    for (const point of path){
      console.log(point?.geometry?.coordinates[0]);
      liveCoords.push(point?.geometry?.coordinates[0])
    }
    return liveCoords
  }

  useEffect(() => {
    if (!tripDetail) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setViewState((prev)=>({
            ...prev,
            longitude:pos?.coords?.longitude,
            latitude:pos?.coords?.latitude,
            zoom:13
          }));
        });
      }
    }
  }, []);

  useEffect(() => {
    if (tripDetail) {
      setRecieverId(tripDetail?.userId);
      setSenderId(tripDetail?.driverId?._id);
    }
  }, [tripDetail]);

  useEffect(() => {
    if (tripDetail) { 
      setPickUp(tripDetail?.startLocation?.coordinates);
      setDropoff(tripDetail?.endLocation?.coordinates);
      if(driverLive.length === 0){
        setDriverCoords(tripDetail?.driverId?.currentLocation?.coordinates);
      }
      
      const getRoute = async () => {
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${tripDetail?.driverId?.currentLocation?.coordinates[0]},${tripDetail?.driverId?.currentLocation?.coordinates[1]};${tripDetail?.startLocation?.coordinates[0]},${tripDetail?.startLocation?.coordinates[1]};${tripDetail?.endLocation?.coordinates[0]},${tripDetail?.endLocation?.coordinates[1]}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
        );
        const routeInfo = response.data;
        setRoute(routeInfo?.routes[0]?.geometry);
        if(tripCoordinates.length === 0){
        const liveCoordinate =   calculateTripCoordinates(routeInfo?.routes[0]?.geometry?.coordinates)
        setTripCoordintes(liveCoordinate); 
        }
      };
      setMapBoundary()
      getRoute();
    }
  }, [tripDetail]);


  useEffect(() => {
    if (!driverLive || !tripDetail) return;
    setDriverCoords(driverLive);
    const approx = checkApproxDistance(driverLive, pickup);
    const dropDestination = checkApproxDistance(driverLive, dropOff);
    if (approx <= 100) {
      if (!rideStarted) {
        setStartRide(true);
        setRideStarted(true);
      }
    } else if (dropDestination <100 ) {
      completeJourney();
    } else {
      setEndRide(false);
      setStartRide(false);
    }
  }, [socket,driverLive,tripDetail]);

 

  const routeLine = {
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
  };

  const handleDriverActive = () => {
    let currentLocation;
    if (!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const coordinates = [pos?.coords?.longitude, pos?.coords?.latitude];
      currentLocation = coordinates;
      dispatch(driverActive({ driverId: driver?.id, currentLocation }));
    });
  };

  const handleDriverInactive = () => {
    dispatch(driverInctive(driver?.id));
  };

  const verifyRide = () => {
    // setStartRide(false);
    setShowOtp(true);
  };

  const completeJourney = () => {
    dispatch(
      finishRide({ userId: tripDetail?.userId, tripId: tripDetail?._id })
    );
    localStorage.removeItem('tripCoordsIndex')
  };

  useEffect(() => {
    if (message === "Ride Completed SuccessFully") {
      setEndRide(true);
    }
  }, [socket, message, tripDetail]);

  return (
    <div className="flex flex-1 flex-col">
      {showOtp && (
        <RideStartConfirmationModal
          setShowOtp={setShowOtp}
          setStartRide={setStartRide}
        />
      )}
      <div className="w-full bg-white border-b border-gray-300 shadow-md p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Driver Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button>
            <AiOutlineBell className="text-xl text-gray-600" />
          </button>

          {tripDetail && (
            <button onClick={() => setOpenChat(true)}>
              <FaComments className="text-xl text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1">
        <div className="flex-1 relative">
          <Map
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            ref={mapContainerRef}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            style={{ width: "100%", height: "100%" }}
            attributionControl={false}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          >
            {pickup.length > 0 && (
              <Marker longitude={pickup[0]} latitude={pickup[1]}>
                <MdLocationOn className="text-blue-600 text-3xl" />
              </Marker>
            )}
            {dropOff.length > 0 && (
              <Marker longitude={dropOff[0]} latitude={dropOff[1]}>
                <MdLocationPin className="text-red-600 text-3xl" />
              </Marker>
            )}
            {driverCoords.length > 0 && (
              <Marker longitude={driverCoords[0]} latitude={driverCoords[1]}>
                <FaCar className="text-black text-3xl" />
              </Marker>
            )}
            {route && (
              <Source id="route" type="geojson" data={route}>
                <Layer {...routeLine} />
              </Source>
            )}
          </Map>
        </div>

        <div className="w-[24rem] p-4 flex flex-col space-y-4 bg-gray-100">
          <div className="bg-white rounded-lg p-4 shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800">Driver Status</h2>
            <p className="text-lg text-gray-600 mt-2">
            </p>
            <button
              className={`mt-4 rounded-full w-full h-14 text-xl font-bold shadow-lg transition-transform duration-200 ${
                currentStatus?.currentStatus === "inactive"
                  ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                  : "bg-red-500 hover:bg-red-600 active:bg-red-700"
              }`}
              onClick={() => {
                currentStatus?.currentStatus === "inactive"
                  ? handleDriverActive()
                  : handleDriverInactive();
              }}
            >
              {currentStatus?.currentStatus === "inactive"
                ? "Go Online"
                : "Go Offline"}
            </button>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">
              Ride Controls
            </h2>
            {startRide && (
              <button
                className="w-full h-12 bg-green-600 text-white rounded-md font-bold shadow-md hover:bg-green-700"
                onClick={() => verifyRide()}
              >
                Start Ride
              </button>
            )}
          </div>
        </div>
      </div>
      {openChat && (
          // <Chat
          //   driver={driver}
          //   recieverId={recieverId}
          //   senderId={senderId}
          //   setOpenChat={setOpenChat}
          // />
          <Chat user={'driver'} setOpenChat={setOpenChat}/>
        )}
      <AnimatePresence mode="wait">
        {endRide && <DriverNearByDropOff setEndRide={setEndRide} />}
      </AnimatePresence>
    </div>
  );
}

export default DriverMap;
