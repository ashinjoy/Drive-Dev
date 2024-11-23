import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FcApproval } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import AdminNavbar from '../../Components/Navbar/AdminNavbar';
import AdminSidebar from '../../Components/Navbar/AdminSidebar';
import { driverDetails ,approveDriver,approveDriverProfileUpdate} from '../../Features/Admin/adminActions';

export default function DriverDetailsPage() {
    const {driverData} = useSelector(state=>state.admin)
    const {driverId} = useParams() 
    console.log('params',driverId);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(driverDetails(driverId))
    },[])

    const handleDriverApproval=(driverId)=>{
        dispatch(approveDriver(driverId))
    }

    const handleProfileUpdateRequest = (driverId)=>{
        dispatch(approveDriverProfileUpdate(driverId))
    }
  return (
    <>
    <AdminNavbar/>
    <AdminSidebar/>
        <div className="ml-[15rem] mt-[7rem] flex flex-row gap-8 w-full h-[81vh]">
  <div className="flex flex-col p-6 gap-4 w-[25%] border-2 shadow-lg rounded-lg bg-white">
    {driverData?.profileUrl && (
      <div className="border-2 border-dashed border-gray-400 rounded-lg p-2 h-36 w-36 mx-auto">
        <img src={driverData?.profileUrl} className="object-cover w-full h-full rounded-lg" alt="Profile" />
      </div>
    )}
    <h1 className="text-xl font-bold text-gray-800 text-center">{driverData?.name}</h1>
    <div className="rounded-lg border-2 border-gray-400 bg-gray-100 p-2 text-center">
      <p className="font-semibold text-gray-700">Driver ID: {driverData?.id}</p>
    </div>
    <div className="flex flex-col gap-3 mt-4">
      <button
        className="flex items-center justify-center gap-2 rounded-md bg-green-500 w-full py-2 text-white hover:bg-green-600 transition"
        onClick={() => handleDriverApproval(driverData?.id)}
      >
        <FcApproval size={22} />
        Approve Driver
      </button>
      <button
        className="flex items-center justify-center gap-2 rounded-md bg-red-500 w-full py-2 text-white hover:bg-red-600 transition"
        // onClick={() => handleDriverRejection(driverData?.id)}
      >
        <FcCancel size={22} />
        Reject Driver
      </button>
      {/* <button
        className="flex items-center justify-center gap-2 rounded-md bg-blue-500 w-full py-2 text-white hover:bg-blue-600 transition"
        onClick={() => handleProfileUpdateRequest(driverId)}
      >
        <FcApproval size={22} />
        Approve Profile Update
      </button> */}
    </div>
  </div>
  <div className="flex flex-col w-[50%] gap-6">
    <div className="border-2 border-gray-300 shadow-md rounded-lg p-6 bg-white">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Driver Information</h1>
    <div className="flex flex-col md:flex-row gap-4">
  <div className="shadow-lg rounded-lg p-4 border-2 border-slate-400 bg-gray-50 flex-1">
    <h1 className="text-gray-700">Email: {driverData?.email}</h1>
  </div>
  <div className="shadow-lg rounded-lg p-4 border-2 border-slate-400 bg-gray-50 flex-1">
    <h1 className="text-gray-700">Number: {driverData?.phone}</h1>
  </div>
</div>

      {driverData?.license_Number !== 'nill' && (
       <div className="shadow-lg rounded-lg p-2 border-2 border-slate-400 bg-gray-50 mt-2 w-1/2">
          <h1 className="text-gray-700">License Number: {driverData?.license_Number}</h1>
        </div>
      )}
      {driverData?.licenseUrl !== 'nill' && (
        <div className="w-full flex justify-center mt-6">
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-2 h-36 w-44">
            <img src={driverData?.licenseUrl} className="object-contain w-full h-full rounded-lg" alt="License" />
          </div>
        </div>
      )}
    </div>
    <div className="border-2 border-gray-300 shadow-md rounded-lg p-6 bg-white">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Vehicle Details</h1>
      <div className="flex flex-col md:flex-row gap-4">

      {driverData?.vehicleDetails?.vehicle_type !== 'nill' && ( <div className="shadow-lg rounded-lg p-4 border-2 border-slate-400 bg-gray-50 flex-1">
    <h1 className="text-gray-700">Vehicle Type: {driverData?.vehicleDetails?.vehicle_type}</h1>
  </div>)}
    {driverData?.vehicleDetails?.rc_Number !== 'nill' &&(<div className="shadow-lg rounded-lg p-4 border-2 border-slate-400 bg-gray-50 flex-1">
    <h1 className="text-gray-700">RC Number: {driverData?.vehicleDetails?.rc_Number}</h1>
  </div>)}
    </div>
      {driverData?.vehicleDetails?.vehicle_type === 'Auto' && (
        <div className="mb-4">
          <h2 className="text-gray-700">Vehicle Permit</h2>
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-2 h-36 w-44 mx-auto">
            <img src={driverData?.vehicleDetails?.permitUrl} className="object-contain w-full h-full rounded-lg" alt="Permit" />
          </div>
        </div>
      )}
    </div>
  </div>
</div>

   
        {/* </div>

    </div> */}
    </>
  )
}
