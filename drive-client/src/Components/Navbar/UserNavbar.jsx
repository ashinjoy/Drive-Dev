import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";
import { useSocket } from "../../Hooks/socket";
import {
  setTripData,
  setTripStatus,
  setTripStatusComplete,
} from "../../Features/Trip/tripSlice";
import NearByPickup from "../User/Notification/NearByPickup";
import UserAccountMenu from "../User/UserAccountMenu/UserAccountMenu";
import UserNavBarDrawer from "./UserNavBarDrawer";
import ReviewRating from "../User/Trip/ReviewRating";

function UserNavbar() {
  const { user, token } = useSelector((state) => state.user);
  const { tripDetail } = useSelector((state) => state.trip);
  const [showMenu, setShowMenu] = useState(false);
  const [navDrawer, setNavDrawer] = useState(false);
  const [rideComplete, setRideComplete] = useState(false);
  const [rideCompleteData, setRideCompleteData] = useState(null);
  const [showReviewModal, setReviewModal] = useState(false);
  const dispatch = useDispatch();
  const userId = user?.id;

  const { socket } = useSocket();

  useEffect(() => {
    if (!token || !user || !socket) {
      return;
    }
    socket?.emit("user-connected", userId);
    socket?.on("request-ride", (data) => {
      dispatch(setTripData(data));
    });
    socket?.on("ride-accept", (tripData) => {
      dispatch(setTripData(tripData));
    });
    return () => {
      socket?.off("user-connected");
      socket?.off("ride-accept");
    };
  }, [socket, user]);

  useEffect(() => {
    if (!token || !user || !tripDetail) {
      return;
    }
    const handleRideStartSocket = (data) => {
      dispatch(setTripStatus(data));
    };

    const handleRideEndSocket = (data) => {
      dispatch(setTripStatusComplete());
      setRideComplete(true);
      setRideCompleteData(data);
      setReviewModal(true);
    };
    socket?.on("ride-start", handleRideStartSocket);
    socket?.on("ride-complete", handleRideEndSocket);

    return () => {
      socket?.off("ride-start");
      socket?.off("ride-complete");
    };
  }, [socket, tripDetail]);

  const toggleMobileMenu = () => {
    setNavDrawer(!navDrawer);
  };

  return (
    <nav className="fixed top-0 left-0 flex flex-row justify-between items-center h-[5rem] w-full bg-white shadow-md z-40 border-b">
      <div className="ml-8 w-36">
        <img
          src="/assets/logo-cl.png"
          alt="drive logo"
          className="w-full h-full object-contain"
        />
      </div>
      {showReviewModal && <ReviewRating setReviewModal={setReviewModal} />}
      <div className="hidden md:flex items-center gap-x-12 text-gray-600">
        <NavLink
          to="/"
          className="text-base font-medium leading-tight hover:text-yellow-500 transition-colors"
        >
          Home
        </NavLink>
        {!token && (
          <NavLink
            to="/driver/signup"
            className="text-base font-medium leading-tight hover:text-yellow-500 transition-colors"
          >
            Drive
          </NavLink>
        )}
        <NavLink
          to="/search-ride"
          className="text-base font-medium leading-tight hover:text-yellow-500 transition-colors"
        >
          Ride
        </NavLink>
        <NavLink
          to="/trip-history"
          className="text-base font-medium leading-tight hover:text-yellow-500 transition-colors"
        >
          Trips
        </NavLink>
      </div>

      <div className="hidden md:flex items-center mr-12 text-gray-600">
        {token ? (
          <div
            className="flex items-center hover:cursor-pointer hover:text-yellow-500 transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
            <BiUserCircle size={"28px"} />
            <RiArrowDropDownLine size={"20px"} />
          </div>
        ) : (
          <NavLink
            to="/login"
            className="text-base font-medium leading-tight hover:text-yellow-500 transition-colors"
          >
            Login
          </NavLink>
        )}
      </div>
      {navDrawer && <UserNavBarDrawer />}
      <div className="md:hidden flex items-center mr-6">
        <button onClick={toggleMobileMenu}>
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {rideComplete && (
          <NearByPickup
            setRideComplete={setRideComplete}
            rideCompleteData={rideCompleteData}
          />
        )}
      </AnimatePresence>

      {showMenu && <UserAccountMenu />}
    </nav>
  );
}

export default UserNavbar;
