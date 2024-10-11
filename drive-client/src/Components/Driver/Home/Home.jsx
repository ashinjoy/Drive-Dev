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
     
     <div className="absolute top-[20rem] left-64 w-1/2 p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-xl font-bold mb-4">Trips Completed</h2>
    <div className="flex gap-4 mb-4">
      <p id="Daily" className="cursor-pointer" onClick={handleFilter}>Daily</p>
      <p id="Weekly" className="cursor-pointer" onClick={handleFilter}>Weekly</p>
      <p id="Monthly" className="cursor-pointer" onClick={handleFilter}>Monthly</p>
      <p id="Yearly" className="cursor-pointer" onClick={handleFilter}>Yearly</p>
    </div>
    <div className="w-full">
      <BarChart data={data} />
    </div>
  </div>
    
    </>
  );
}

export default Home;
