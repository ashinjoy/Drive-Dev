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
<div className="flex gap-4 w-[50%] justify-center items-center">
  <p
    id="Daily"
    onClick={(e) => handleFilter(e)}
    className="cursor-pointer px-4 py-2 rounded-md hover:bg-blue-50 transition-all duration-300 ease-in-out active:bg-blue-100"
  >
    Daily
  </p>
  <p
    id="Weekly"
    onClick={(e) => handleFilter(e)}
    className="cursor-pointer px-4 py-2 rounded-md hover:bg-blue-50 transition-all duration-300 ease-in-out active:bg-blue-100"
  >
    Weekly
  </p>
  <p
    id="Monthly"
    onClick={(e) => handleFilter(e)}
    className="cursor-pointer px-4 py-2 rounded-md hover:bg-blue-50 transition-all duration-300 ease-in-out active:bg-blue-100"
  >
    Monthly
  </p>
  <p
    id="Yearly"
    onClick={(e) => handleFilter(e)}
    className="cursor-pointer px-4 py-2 rounded-md hover:bg-blue-50 transition-all duration-300 ease-in-out active:bg-blue-100"
  >
    Yearly
  </p>
</div>
    <div className="min-w-full ">
        <TripReportChart data={data}/>
    </div>
    </>
  )
}

export default TripChart
