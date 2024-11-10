import React from "react";
import DriverNavBar from "../../../Components/Navbar/DriverNavBar";
import Home from "../../../Components/Driver/Home/Home";
import Card from "../../../Components/Driver/DashBoard/Card";
import Table from "../../../Components/Driver/DashBoard/Table";

function DriverMainPage() {
  return (
    <>
      <DriverNavBar />
      <div className="flex flex-col items-center gap-[5rem] min-h-screen ml-[12rem]">
      <div className="flex justify-center md:gap-[4rem] mt-[3rem]">
          <Card type={"wallet"} />
          <Card type={"totalTrips"} />
        </div>
        <Home />
          <div className="bg-gray-50 border-2 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Top Earned Trips</h2>
            <Table type={"topTrips"} />
          </div>
          <div className="bg-gray-50 border-2 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Latest Rides</h2>
            <Table type={"latestTrips"} />
          </div>
      </div>
        
      
    </>
  );
}

export default DriverMainPage;
