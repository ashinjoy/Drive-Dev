import React from 'react'
import DriverNavBar from '../../../Components/Navbar/DriverNavBar'
import UserNavbar from '../../../Components/Navbar/UserNavbar'

function Approval() {
  return (
    <>
{/* <DriverNavBar/> */}
<UserNavbar driver={'driver'}/>
<div className="flex h-screen items-center justify-center">
  <div className="flex flex-col items-center">
    <div className="w-[300px] h-[300px] rounded-full border border-gray-300 flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 shadow-md">
      <span className="text-2xl font-semibold text-gray-700">Approval Pending</span>
    </div>
    <div className="mt-6 text-center">
      <p className="text-base text-gray-500">Your profile is under review. We will notify you once it's approved.</p>
      <button className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
        Learn More
      </button>
    </div>
  </div>
</div>


  </>
  )
}

export default Approval
