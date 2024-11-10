import React, { useEffect, useState } from "react";
import Userchart from "../Chart/Userchart";
// import Chart from "chart.js/auto";
import ChartConfig from "../Chart/ChartConfig";

import {
  newlyRegisteredUsers,
  tripReports,
} from "../../../Features/Admin/adminActions";
import { useDispatch, useSelector } from "react-redux";
import BarChartConfig from "../Chart/BarChartConfig";

function Home() {
  const [filter, setFilter] = useState("Daily");
  const [data, setData] = useState();
  const [tripData, setTripData] = useState("");
  const dispatch = useDispatch();
  const { report, tripReport } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(newlyRegisteredUsers(filter));
    dispatch(tripReports(filter));
  }, []);

  useEffect(() => {
    if (report) {
      const dataFromReport = ChartConfig(report);
      setData(dataFromReport);
    }
    if (tripReport) {
      const dataFromReport = BarChartConfig(tripReport);
      setTripData(dataFromReport);
    }
  }, [report, tripReport]);

  const handleFilter = (e) => {
    setFilter(e.target.id);
    dispatch(newlyRegisteredUsers(e.target.id));
  };
  return (
    <>
      <div className="min-w-full h-[35rem]">
        <div className="flex justify-between items-center mt-6">
          <h1 className="text-lg font-medium text-left ml-6 text-green-500">
            New Users
          </h1>
          <div className="flex items-center w-[45%] bg-slate-200  gap-3 mr-4">
            <div
              id="Daily"

              onClick={(e) => handleFilter(e)}
              className={`text-sm ${filter === "Daily" && 'bg-black text-white'} w-[25%] rounded-sm p-1`}
            >
              Daily
            </div>
            <div
              id="Weekly"
              onClick={(e) => handleFilter(e)}
              className={`text-sm ${filter === "Weekly" && 'bg-black text-white'} w-[25%] rounded-sm p-1`}
            >
              Weekly
            </div>
            <div
              id="Monthly"
              onClick={(e) => handleFilter(e)}
              className={`text-sm ${filter === "Monthly" && 'bg-black text-white'} w-[25%] rounded-sm p-1`}
            >
              Monthly
            </div>
            <div
              id="Yearly"
              onClick={(e) => handleFilter(e)}
              className={`text-sm ${filter === "Yearly" && 'bg-black text-white'} w-[25%] rounded-sm p-1`}
            >
              Yearly
            </div>
          </div>
        </div>
        <Userchart data={data} />
      </div>
    </>
  );
}

export default Home;
