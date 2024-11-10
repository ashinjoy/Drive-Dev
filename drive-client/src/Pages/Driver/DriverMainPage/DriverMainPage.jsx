import React from "react";
import DriverNavBar from "../../../Components/Navbar/DriverNavBar";
import Home from "../../../Components/Driver/Home/Home";
import Card from "../../../Components/Driver/DashBoard/Card";
import Table from "../../../Components/Driver/DashBoard/Table";

function DriverMainPage() {
  return (
    <>
      <DriverNavBar />

      <div className="relative ">
        <div className="absolute top-[5rem] left-[13rem]  min-h-screen  flex  gap-10">
          <Card type={"wallet"} />

          <Card type={"totalTrips"} />
        </div>

        <Home />

        <div className="absolute top-[55rem] left-64 w-fit space-y-12">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Top Earned Trips</h2>
            <Table type={"topTrips"} />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Latest Rides</h2>
            <Table type={"latestTrips"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverMainPage;
