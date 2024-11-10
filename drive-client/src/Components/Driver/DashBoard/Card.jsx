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
    <div className="w-[25dvw] h-[25dvh] border-2 border-gray-300 bg-white shadow-lg  rounded-lg p-6">
    <div className='flex flex-col items-center gap-7'>
    <h1 className='text-2xl font-bold'>{type == "wallet" ? 'Cash Earned' : 'Total Trips '}</h1>
    <h1 className='text-3xl font-bold'>{type == "wallet" ? `₹${moneyEarned}` : `Trips Completed:${totalTrips}`}</h1>
    </div>
  </div>
  )
}

export default Card
