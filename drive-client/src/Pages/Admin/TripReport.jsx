import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Navbar/AdminSidebar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from '../../Components/Admin/DashBoard/Table';
import TripDetails from '../../Components/Admin/Trip/TripDetails';

function TripReport() {
  const [startDate,setStartDate] = useState(new Date())
  useEffect(()=>{
  console.log(startDate);

  },[startDate])
  return (
    <>
    <div className='flex flex-row'>
      <AdminSidebar/>
    <div className='flex-1 min-h-screen border-2 flex flex-col'>
      <div className='flex flex-row ml-[19rem] gap-3'>
        <DatePicker selected={startDate} onChange={(date)=>setStartDate(date)}/>
        <DatePicker selected={startDate} onChange={(date)=>setStartDate(date)}/>
          <button className='bg-gray-500 w-[10rem] p-2 rounded-sm'>Download Report</button>
      </div>
      <div className='w-[70%] ml-[19rem] shadow-lg p-5 rounded-lg'>
      <TripDetails/>
        
      </div>
    </div>
    </div>

    </>
  )
}

export default TripReport 
