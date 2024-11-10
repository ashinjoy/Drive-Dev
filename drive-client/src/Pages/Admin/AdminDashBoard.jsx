import React, { useState } from "react";
import AdminSideBar from "../../Components/Navbar/AdminSidebar";
import Home from "../../Components/Admin/Home/Home";
import Cards from "../../Components/Admin/DashBoard/Cards";
import Table from "../../Components/Admin/DashBoard/Table";
import TripChart from "../../Components/Admin/Home/TripChart";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { downloadReport } from "../../Features/Admin/adminActions";

function AdminDashBoard() {
  const [startDate, SetStartDate] = useState(new Date());
  const [endDate, SetEndDate] = useState(new Date());
  const dispatch = useDispatch();
  const handleReport = () => {
    dispatch(downloadReport({ startDate, endDate }));
  };

  return (
    <>
      <AdminSideBar />
      <div className="mt-5 md:mt-0 flex flex-col md:ml-[15rem] md:p-2  lg:p-8 gap-[2rem] md:gap-[2.5rem] bg-gray-200">
        <div className="flex flex-col lg:flex-row justify-center items-center md:justify-start md:items-start  gap-[1rem] min-w-full  ">
          <Cards type={"companyBalance"}/>
          <Cards type={"trips"} />
          <Cards type={"trips"} />
          <Cards type={"trips"} />
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center md:justify-start md:items-start  gap-8 min-w-full ">
          <div className="w-[50%] bg-white rounded-lg ">
            <Home />
          </div>
          <div className="w-[50%] bg-white rounded-lg">
            {/* <DatePicker
              selected={startDate}
              onChange={(date) => SetStartDate(date)}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => SetEndDate(date)}
            />
            <button onClick={handleReport}>Create Report</button> */}
            <TripChart />
          </div>
        </div>
        <div className="flex flex-col  gap-[4rem] ">
          <div className="w-full rounded-lg bg-white p-4 shadow-lg overflow-x-scroll">
            <h1 className="text-lg font-semibold">Latest Trips</h1>
            <Table type={"latestRide"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashBoard;
