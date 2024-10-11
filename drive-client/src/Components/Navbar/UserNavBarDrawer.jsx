import React from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function UserNavBarDrawer() {
  const { token } = useSelector((state) => state.user);
  return createPortal(
    <>
      <motion.div
        className="fixed top-0 w-screen h-screen bg-gradient-to-br from-slate-50 to-white z-30"
        initial={{ y: -1000 }}
        animate={{ y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <div className="flex flex-col mt-[6rem] w-full gap-8 ml-[4.5rem]">
          <NavLink
            className="text-2xl font-semibold leading-tight hover:text-yellow-500 transition-colors"
            to="/search-ride"
          >
            Ride
          </NavLink>
          <NavLink
            className="text-2xl font-semibold leading-tight hover:text-yellow-500 transition-colors"
            to="/driver/signup"
          >
            Drive
          </NavLink>
          <NavLink
            className="text-2xl font-semibold leading-tight hover:text-yellow-500 transition-colors"
            to={"/contact"}
          >
            Contact Us
          </NavLink>
          {token ? (
            <>
              <NavLink
                className="text-2xl font-semibold leading-tight hover:text-yellow-500 transition-colors"
                to="/trips"
              >
                My Trips
              </NavLink>
              <NavLink
                className="text-2xl font-semibold leading-tight hover:text-yellow-500 transition-colors"
                to="/userprofile"
              >
                Profile
              </NavLink>
              <NavLink
                className="text-2xl font-semibold leading-tight hover:text-yellow-500 transition-colors"
                to="/safety"
              >
                Safety
              </NavLink>
            </>
          ) : (
            <NavLink
              className="text-2xl font-semibold leading-tight hover:text-yellow-500 transition-colors"
              to="/login"
            >
              Signup
            </NavLink>
          )}
        </div>
      </motion.div>
    </>,
    document.getElementById("navbar-modal")
  );
}

export default UserNavBarDrawer;
