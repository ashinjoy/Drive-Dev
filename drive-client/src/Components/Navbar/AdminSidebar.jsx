import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaTaxi } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";

function AdminSidebar() {
  return (
    <div className="fixed top-0 bottom-0 left-0 h-screen w-[16rem]   border-r-2 z-40 bg-white">
      <div className="w-full flex justify-center items-center ">
        <img
          src="/assets/logo-cl.png"
          alt="drive logo"
          className="w-1/2 h-1/2 object-contain"
        />
      </div>
      <div className="flex flex-col h-2/3 min-w-full items-center space-y-10 mt-5 ">
        <div className="flex flex-row min-w-[60%] h-[3rem] justify-center items-center hover:bg-slate-100 rounded-md">
          <NavLink
            to="/admin/home"
            className={({ isActive }) =>
              `flex flex-row min-w-[100%] h-[3rem] justify-center items-center rounded-md gap-2 
        ${
          isActive
            ? "bg-yellow-500 text-white "
            : "hover:bg-slate-100 text-black"
        }`
            }
          >
            <MdOutlineDashboard size={20} />
            <span className="text-lg font-medium text-gray-700">Dashboard</span>
          </NavLink>
        </div>
        <div className="flex flex-row min-w-[60%] h-[3rem] justify-center items-center hover:bg-slate-100 rounded-md">
          <NavLink
            to="/admin/driver-list"
            className={({ isActive }) =>
              `flex flex-row min-w-[100%] h-[3rem] justify-center items-center rounded-md gap-2 
        ${
          isActive
            ? "bg-yellow-500 text-white "
            : "hover:bg-slate-100 text-black"
        }`
            }
          >
            <FaTaxi size={18} />
            <span className="text-lg font-medium text-gray-700">
              Drivers List
            </span>
          </NavLink>
        </div>

        <div className="flex flex-row min-w-[60%] h-[3rem] justify-center items-center hover:bg-slate-100 rounded-md">
          <NavLink
            to="/admin/users-list"
            className={({ isActive }) =>
              `flex flex-row min-w-[100%] h-[3rem] justify-center items-center rounded-md gap-2 
        ${
          isActive
            ? "bg-yellow-500 text-white "
            : "hover:bg-slate-100 text-black"
        }`
            }
          >
            <FaUsers size={20} />
            <span className="text-lg font-medium text-gray-700">
              Users List
            </span>
          </NavLink>
        </div>


      
      </div>
    </div>
  );
}

export default AdminSidebar;
