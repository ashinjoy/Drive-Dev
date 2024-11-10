import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getDriverBalance,getCompletedTripsCountService } from '../../../Features/Driver/driverService'
function Card({type}) {
  const [moneyEarned,setMoney] = useState(0)
  const [totalTrips,setTotalTrips] = useState(0)
  const {driver} = useSelector(state=>state.driver)
  useEffect(()=>{
    const getData = async()=>{
      if(type == "wallet"){
        const response =   await getDriverBalance(driver?.id)
        setMoney(parseFloat(response?.balance).toFixed(2))
        return
      }
      if(type == "totalTrips"){
        const response = await getCompletedTripsCountService(driver?.id)
        setTotalTrips(response?.tripCount)
        return
      }

    }
    getData()
    
  },[])
 
  return (
    <div className="w-[25dvw] h-[25dvh] border border-gray-200 bg-gradient-to-br from-yellow-100 via-white to-yellow-50 shadow-lg rounded-2xl p-6 transition duration-200 hover:shadow-xl">
    <div className="flex flex-col items-center gap-5">
      <div className="text-yellow-500 text-4xl">
        {type === "wallet" ? "💰" : "🚗"}
      </div>
      <h1 className="text-xl font-semibold text-gray-800">
        {type === "wallet" ? "Cash Earned" : "Total Trips"}
      </h1>
      <h1 className="text-3xl font-bold text-gray-900">
        {type === "wallet" ? `₹${moneyEarned}` : `Trips Completed: ${totalTrips}`}
      </h1>
    </div>
  </div>
  
  )
}

export default Card
