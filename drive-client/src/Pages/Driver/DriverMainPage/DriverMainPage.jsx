import React from 'react'
import DriverNavBar from '../../../Components/Navbar/DriverNavBar'
import Home from '../../../Components/Driver/Home/Home'
import Card from '../../../Components/Driver/DashBoard/Card'
import Table from '../../../Components/Driver/DashBoard/Table'

function DriverMainPage() {
  return (
    <>
    <DriverNavBar/>
     {/* <div className='relative '>
    
  <div className='absolute  top-[5rem] left-[13rem] min-h-screen  flex  gap-10'>
    <Card type={"wallet"}/>
    <Card type={"totalTrips"}/>
    </div>
    <div className='absolute top-[27rem] left-64 w-1/2 h-[55vh]  p-4'>
    <Home/>
    </div>
    <div className='absolute flex flex-col  top-[50rem] gap-[4rem] left-64 w-full'>
    <Table type={"topTrips"}/>
    <Table type={"latestTrips"}/>
    </div> 
    </div>  */}
    <div className="relative ">
  {/* Top section with cards */}
  <div className="absolute top-[5rem] left-[13rem]  min-h-screen  flex  gap-10">
    
      <Card type={"wallet"} />
    
    
      <Card type={"totalTrips"} />
    
  </div>

  {/* Home section with BarChart */}
 <Home/>

  {/* Tables Section: Top Trips and Latest Rides */}
  <div className="absolute top-[55rem] left-64 w-[90%] space-y-12">
    {/* Top Trips Table */}
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Top Earned Trips</h2>
      <Table type={"topTrips"} />
    </div>
    
    {/* Latest Rides Table */}
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Latest Rides</h2>
      <Table type={"latestTrips"} />
    </div>
  </div>
</div>

</>
  )
}

export default DriverMainPage
