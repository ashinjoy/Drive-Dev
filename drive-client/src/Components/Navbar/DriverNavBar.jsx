import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import * as turf from "@turf/turf";

import { useSocket } from "../../Hooks/socket";

import RideRequestNotifications from "../Driver/Notifications/RideRequestNotifications";
import { driverLiveLocation } from "../../Context/DriverLocation";

import { MdSpaceDashboard } from "react-icons/md";
import { GiJourney } from "react-icons/gi";
import { FaWallet } from "react-icons/fa6";

import { MdPerson } from "react-icons/md";
import {
  resetTripDetails,
  setPaymentInfo,
} from "../../Features/Trip/tripSlice";

import { logoutAction } from "../../Features/Driver/driverActions";

function DriverNavBar() {
  const [openNotification, setOpenNotification] = useState(false);
  const [trip, setTrip] = useState(null);
  const notificationDurationRef = useRef(null);
  const [rideStarted, setRideStarted] = useState(false);
  const liveIntervalRef = useRef(null);
  const arrayIndexRef = useRef(0);

  const {
    setDriverLive,
    tripCoordinates,
    setEnableChat,
    startRide,
    setTripCoordintes,
  } = useContext(driverLiveLocation);

  const { token, driver } = useSelector((state) => state.driver);
  const { tripDetail, tripStatus } = useSelector((state) => state.trip);
  const { socket, chatSocket } = useSocket();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  useEffect(() => {
    const handleRideRequest = (tripData) => {
      setTrip(tripData);
      setOpenNotification(true);
      chatSocket?.emit("driver-chat-connect", { driverId: driver?.id });
      setEnableChat(true);
      notificationDurationRef.current = setTimeout(() => {
        setOpenNotification(false);
      }, 13000);

    };
    if (token && driver) {
      socket?.emit("driver-connected", driver.id);
      socket?.on("ride-request", (tripData) => {
        handleRideRequest(tripData);
      });
    }
    return () => {
      clearTimeout(notificationDurationRef.current);
      socket?.off("ride-request");
    };
  }, [socket, chatSocket]);

  useEffect(() => {
    if (!token || !driver || !tripDetail) {
      return;
    }
    liveIntervalRef.current = setInterval(() => {
      if (arrayIndexRef.current < tripCoordinates.length) {
        if (startRide) {
          clearInterval(liveIntervalRef.current);
          return;
        }
        const handleJourneyAfterStart = () => {
          const coordinates = [...tripCoordinates];
          coordinates.splice(0, arrayIndexRef.current);
          setTripCoordintes(coordinates);
        };
        if (tripStatus === "started") {
          if (!rideStarted) {
            console.log("inside the condition");

            handleJourneyAfterStart();
            setRideStarted(true);
          }
        }
        setDriverLive(tripCoordinates[arrayIndexRef.current]);
        socket?.emit("location-update", {
          liveLocation: tripCoordinates[arrayIndexRef.current],
          userId: tripDetail?.userId,
        });
        arrayIndexRef.current++;
      } else {
        clearInterval(liveIntervalRef.current);
      }
    }, 5000);
    socket?.on("cancel-ride", () => {
      clearInterval(liveIntervalRef.current);
      dispatch(resetTripDetails());
    });
    socket?.on("payment-update", (data) => {
      dispatch(setPaymentInfo(data));
    });
    return () => {
      clearInterval(liveIntervalRef.current);
      socket?.off("cancel-ride");
    };
  }, [socket, tripDetail, tripCoordinates, startRide, tripStatus]);

  return (
    <>
      <nav className="fixed flex flex-col min-h-screen gap-6 items-center max-w-[12rem]   rounded-sm border-r-2  shadow-md p-3">
        <div className="flex items-center justify-center w-full">
          <img src="/assets/logo-cl.png" alt="logo" className="w-full " />
        </div>

        <div className="w-full">
          <NavLink
            to="/driver/home"
            className="flex gap-2 items-center text-lg font-semibold hover:bg-gray-100 p-3 rounded-lg transition-all"
          >
            <MdSpaceDashboard className="text-xl" /> Home
          </NavLink>
        </div>

        <div className="w-full">
          <NavLink
            to="/driver/trip"
            className="flex gap-2 items-center text-lg font-semibold hover:bg-gray-100 p-3 rounded-lg transition-all"
          >
            <GiJourney className="text-xl" /> Trip
          </NavLink>
        </div>

        <div className="w-full">
          <NavLink
            to="/driver/wallet"
            className="flex gap-2 items-center text-lg font-semibold hover:bg-gray-100 p-3 rounded-lg transition-all"
          >
            <FaWallet className="text-xl" /> Wallet
          </NavLink>
        </div>

        <div className="w-full">
          <NavLink
            to="/driver/profile"
            className="flex gap-2 items-center text-lg font-semibold hover:bg-gray-100 p-3 rounded-lg transition-all"
          >
            <MdPerson className="text-xl" /> Profile
          </NavLink>
        </div>
        <div className="w-full">
          <button
            className="flex gap-2 items-center text-lg font-semibold hover:bg-gray-100 p-3 rounded-lg transition-all"
            onClick={handleLogout}
          >
            <MdSpaceDashboard className="text-xl" /> Logout
          </button>
        </div>
      </nav>
      <AnimatePresence mode="wait">
        {openNotification && (
          <RideRequestNotifications
            trip={trip}
            setOpenNotification={setOpenNotification}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default DriverNavBar;
