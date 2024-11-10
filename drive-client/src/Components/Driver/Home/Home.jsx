import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto'
import BarChart from "../Chart/BarChart";
import ChartConfig from "../Chart/ChartConfig";

import { useDispatch, useSelector } from "react-redux";
import { tripChart } from "../../../Features/Driver/driverActions";
import Card from "../DashBoard/Card";


function Home() {
  
  const dispatch = useDispatch();
  const [data,setData]  = useState()

  const { report,driver } = useSelector((state) => state.driver);
  const [filter,setFilter] =useState('Daily')
  useEffect(()=>{
    dispatch(tripChart({filter:filter,driverId:driver?.id}))
  },[])
  useEffect(() => {
    if (report) {
      const dataFromReport = ChartConfig(report)
      setData(dataFromReport)
      console.log('data',dataFromReport);
      
    }
  }, [report]);

  const handleFilter = (e)=>{
    console.log('event',e.target.id);
    setFilter(e.target.id)
    dispatch(tripChart({filter:e.target.id,driverId:driver?.id}))
  }
  return (

    <>
     <div className="w-11/12 sm:w-1/2 p-6 border-2 border-yellow-300 shadow-xl rounded-lg">
  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Trips Completed</h2>
  <div className="flex gap-6 justify-center mb-6">
    <p
      id="Daily"
      className="cursor-pointer text-lg font-medium text-gray-800 hover:text-yellow-500 transition duration-300"
      onClick={handleFilter}
    >
      <span role="img" aria-label="daily">📅</span> Daily
    </p>
    <p
      id="Weekly"
      className="cursor-pointer text-lg font-medium text-gray-800 hover:text-yellow-500 transition duration-300"
      onClick={handleFilter}
    >
      <span role="img" aria-label="weekly">📆</span> Weekly
    </p>
    <p
      id="Monthly"
      className="cursor-pointer text-lg font-medium text-gray-800 hover:text-yellow-500 transition duration-300"
      onClick={handleFilter}
    >
      <span role="img" aria-label="monthly">📅</span> Monthly
    </p>
    <p
      id="Yearly"
      className="cursor-pointer text-lg font-medium text-gray-800 hover:text-yellow-500 transition duration-300"
      onClick={handleFilter}
    >
      <span role="img" aria-label="yearly">📅</span> Yearly
    </p>
  </div>
  <div className="w-full">
    <BarChart data={data} />
  </div>
</div>
    
    </>
  );
}

export default Home;
