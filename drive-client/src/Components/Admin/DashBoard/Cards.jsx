import React, { useEffect, useState } from 'react'
import { companyBalanceService, tripsCountService } from '../../../Features/Admin/adminService'

function Cards({type}) {
    const [companyBalance,setCompanyBalance] = useState(0)
    const [TripCount,setTripCount] = useState(0)

    useEffect(()=>{
        const getData = async()=>{
            if(type === "companyBalance"){
                const response = await companyBalanceService()
                const {balance} = response?.balance
                setCompanyBalance(balance)
                return
            }
            if(type === "trips"){
                const response = await tripsCountService()
                const {data} = response
                setTripCount(data)
                return
            }
        }
        getData()
    },[])
  return (
    <div className=" w-full lg:w-[25%]  h-[8rem] border-2  flex  justify-center items-center  border-gray-300 bg-white shadow-lg  rounded-xl p-3">
    <div className='h-full flex flex-col justify-center items-center gap-3'>
    <p className='text-xl md:text-2xl font-bold'>{type === "companyBalance" ? "Total Revenue Earned" : "Trips Completed"}</p>
    <h1 className='text-2xl font-medium'>{type ===  "companyBalance" ? `₹${companyBalance.toFixed(2)}` : TripCount }</h1>
    </div>
    <div>
    </div>
  </div>
  )
}

export default Cards
