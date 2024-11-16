import React, { useState } from "react";
import UserNavbar from "../../../Components/Navbar/UserNavbar";
import SearchLocation from "../../../Components/User/SearchLocations/SearchLocation";
import Maps from "../../../Components/User/Maps/Maps";



function RidePage() {
  const [isSearch,setSearch] = useState(false)
  return (
    <>
      <UserNavbar />  
      <div className="flex flex-col lg:flex-row w-screen  gap-3">
        <SearchLocation isSearch={isSearch} setSearch={setSearch} />
        <Maps isSearch={isSearch} setSearch={setSearch} /> 
      </div>
    </>
  );
}

export default RidePage;
