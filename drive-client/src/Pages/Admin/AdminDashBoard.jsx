import React, { useState } from 'react'
import AdminSideBar from '../../Components/Navbar/AdminSidebar'
import Home from '../../Components/Admin/Home/Home'
import Cards from '../../Components/Admin/DashBoard/Cards'
import Table from '../../Components/Admin/DashBoard/Table'
import TripChart from '../../Components/Admin/Home/TripChart'
import DatePicker from 'react-datepicker'
import { useDispatch } from 'react-redux'
import { downloadReport } from '../../Features/Admin/adminActions'


function AdminDashBoard() {
  const [startDate,SetStartDate] = useState(new Date())
  const [endDate,SetEndDate] = useState(new Date())
  const dispatch = useDispatch()
  const handleReport =()=>{
    dispatch(downloadReport({startDate,endDate}))
  }

  return (
    <>
    <AdminSideBar/>
    <div className='flex  flex-col ml-[16rem] p-8 gap-[2.5rem] bg-gray-100 '>
    <div className='flex flex-row  gap-[1rem] '>
    <Cards type={"companyBalance"}/>
    <Cards type={"trips"}/>
    </div>
    <div className='flex flex-col gap-8'>
      <div className='w-[70%] bg-white rounded-lg '>
      <Home/>
      </div>
      <div className='w-[70%] bg-white rounded-lg '>
      <DatePicker selected={startDate} onChange={(date)=>SetStartDate(date)} />
      <DatePicker selected={endDate} onChange={(date)=>SetEndDate(date)}/>
        <button onClick={handleReport}>Crreate Report</button>
      <TripChart/>
      </div>
    </div>
    <div className='flex flex-col  gap-[4rem]'>
      <div className='max-w-[90%] rounded-lg bg-white p-4 shadow-lg '>
        <h1 className='text-lg font-semibold'>Latest Trips</h1>
    <Table type={"latestRide"}/>
      </div>
    </div>
    </div>
    </>
  )
}

export default AdminDashBoard
