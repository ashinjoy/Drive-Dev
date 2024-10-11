import React from "react";
import { NavLink } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { RiWallet2Fill } from "react-icons/ri";
import { AiOutlineSafety } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../Features/User/userActions";

function UserAccountMenu() {
  const dispatch = useDispatch()
  const handleLogout =()=>{
    dispatch(userLogout())
  }
  return (
    <>
        <div className="w-[15%] h-[35vh] flex flex-col gap-8 p-5 border-2 drop-shadow-lg bg-white fixed top-16 right-16 rounded-lg transition-all duration-400 ease-in-out">
      <div className="flex justify-between items-center group">
        <NavLink 
          to={"/wallet"} 
          className="text-gray-700 font-medium group-hover:text-blue-500 transition-colors duration-200"
          aria-label="Go to Wallet">
          Wallet
        </NavLink>
        <RiWallet2Fill 
          className="text-gray-700 group-hover:text-blue-500 transition-colors duration-200" 
          size={24} 
          aria-hidden="true" />
      </div>
      {/* <div className="flex justify-between items-center group">
        <NavLink 
          to={"/safety"} 
          className="text-gray-700 font-medium group-hover:text-green-500 transition-colors duration-200"
          aria-label="Go to Safety">
          Safety
        </NavLink>
        <AiOutlineSafety 
          className="text-gray-700 group-hover:text-green-500 transition-colors duration-200" 
          size={24} 
          aria-hidden="true" />
      </div> */}
      <div className="flex justify-between items-center group">
        <NavLink 
          to={"/userprofile"} 
          className="text-gray-700 font-medium "
          aria-label="Go to User Profile">
          UserProfile
        </NavLink>
        <FaCircleUser 
          className="text-gray-700" 
          size={24} 
          aria-hidden="true" />
      </div>

      <div className="flex justify-between items-center group">
        <button onClick={handleLogout}  className="text-gray-700 font-medium "aria-label="Go to User Profile">
          Logout
          </button>
        <IoLogOut 
          className="text-gray-700" 
          size={24} 
          aria-hidden="true" />
      </div>
      
    </div>
    </>
  );
}

export default UserAccountMenu;
