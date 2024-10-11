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
    <div className="w-[20rem] h-[13rem] border-2     border-gray-300 bg-white shadow-lg  rounded-xl p-6">
    <div className='flex flex-col justify-center items-center'>
    <p className='text-base font-medium'>{type === "companyBalance" ? "Total Revenue Earned" : "Trips Completed"}</p>
    <h1 className='text-3xl font-bold'>{type ===  "companyBalance" ? `₹${companyBalance.toFixed(2)}` : TripCount }</h1>
    </div>
    <div>
    <img src="" alt="" />
    </div>
  </div>
  )
}

export default Cards
