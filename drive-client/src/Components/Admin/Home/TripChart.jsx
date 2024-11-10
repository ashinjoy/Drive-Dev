import React, { useEffect, useState } from 'react'
import Userchart from '../Chart/Userchart'
import Chart from 'chart.js/auto'
import ChartConfig from '../Chart/ChartConfig'

import { newlyRegisteredUsers,  tripReports } from '../../../Features/Admin/adminActions'
import { useDispatch, useSelector } from 'react-redux'
import TripReportChart from '../Chart/TripReportChart'
import BarChartConfig from '../Chart/BarChartConfig'




function TripChart() {
  const [filter,setFilter] = useState('Daily')
  const [data,setData]  = useState()
  const dispatch = useDispatch()
  const {tripReport} = useSelector(state=>state.admin)
  useEffect(()=>{
    dispatch(tripReports(filter))
  },[])

  useEffect(()=>{

    if(tripReport){
      const dataFromReport = BarChartConfig(tripReport)
      setData(dataFromReport)
    }
    
  },[tripReport])

  const handleFilter = (e)=>{
    setFilter(e.target.id)

    dispatch(tripReports(e.target.id))
  }
  return (
    <>
{/* <div className="flex gap-2 md:gap-4 justify-center items-center">
  <p
    id="Daily"
    onClick={(e) => handleFilter(e)}
    className="cursor-pointer   md:text-lg px-1 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-50 transition-all duration-300 ease-in-out active:bg-blue-100"
  >
    Daily
  </p>
  <p
    id="Weekly"
    onClick={(e) => handleFilter(e)}
    className="cursor-pointer   md:text-lg px-1 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-50 transition-all duration-300 ease-in-out active:bg-blue-100"
  >
    Weekly
  </p>
  <p
    id="Monthly"
    onClick={(e) => handleFilter(e)}
    className="cursor-pointer   md:text-lg px-1 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-50 transition-all duration-300 ease-in-out active:bg-blue-100"
  >
    Monthly
  </p>
  <p
    id="Yearly"
    onClick={(e) => handleFilter(e)}
    className="cursor-pointer   md:text-lg px-1 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-50 transition-all duration-300 ease-in-out active:bg-blue-100"
  >
    Yearly
  </p>
</div> */}
    <div className="min-w-full h-[35rem]">
    <div className="flex justify-between items-center mt-6">
          <h1 className="text-lg font-medium text-left ml-6 text-green-500">
            Trips Completed
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
        <TripReportChart data={data}/>
    </div>
    </>
  )
}

export default TripChart
