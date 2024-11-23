import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

function AdminNavbar() {
  return (

    <nav className='fixed top-0 left-[15rem] flex flex-row justify-around items-center  h-[5rem] drop-shadow-lg w-[97dvw] 9 bg-white z-50 border'>
      <div className="w-1/3 h-10 flex">
    </div >
    <div className="flex gap-[3rem]">
      {/* <IoIosNotifications size={25} className="cursor-pointer text-gray-600 hover:text-gray-800 transition" /> */}
      <FaRegUser size={25}/>
      </div>
    </nav>

  );
}

export default AdminNavbar;
