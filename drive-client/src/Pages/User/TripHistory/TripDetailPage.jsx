import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getTripDetailService } from '../../../Features/Trip/tripService';
import UserNavbar from '../../../Components/Navbar/UserNavbar';

function TripDetailPage() {
    const {tripId} = useParams()
    const [tripDetail,setTripDetail] = useState(null)
    const [date,setDate] =useState(null)
     useEffect(() => {
        const getTripDetail = async()=>{
         const response =    await getTripDetailService(tripId)
         setTripDetail(response?.getTripDetail)
         setDate(response?.getTripDetail?.createdAt)
        }
        getTripDetail()
       
    }, []);
  return (
    <>
    <UserNavbar/>
    <div className="min-h-screen mt-[2rem] flex items-center justify-center p-4">
  <div className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="bg-blue-500 text-white p-6">
      <h1 className="text-2xl font-semibold">Trip Details</h1>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Pickup Location</h2>
          <p className="text-gray-600">{tripDetail?.pickUpLocation}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Dropoff Location</h2>
          <p className="text-gray-600">{tripDetail?.dropOffLocation}</p>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Driver</h2>
          <p className="text-gray-600">{tripDetail?.driverId?.name}</p>
        </div>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            JD
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Vehicle Details</h2>
          <p className="text-gray-600">{tripDetail?.driverId?.vehicleDetails?.vehicle_type}</p>
        </div>
        <div className="flex items-center">
          <svg
            className="w-12 h-12 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.75 12a.75.75 0 100-1.5.75.75 0 000 1.5zM17.25 12a.75.75 0 100-1.5.75.75 0 000 1.5z"
            />
            <path
              fillRule="evenodd"
              d="M1.5 11.25A4.5 4.5 0 016 6.75h12a4.5 4.5 0 014.5 4.5v7.5a1.5 1.5 0 01-1.5 1.5h-1.19a2.25 2.25 0 11-4.31 0H8.5a2.25 2.25 0 11-4.31 0H3a1.5 1.5 0 01-1.5-1.5v-7.5zm18 7.5a.75.75 0 10-1.5 0 .75.75 0 001.5 0zM7.5 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Fare</h2>
          <p className="text-gray-600">{tripDetail?.fare}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Trip Status</h2>
          <p className="text-gray-600">{tripDetail?.tripStatus}</p>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Trip Date</h2>
         {date && <p className="text-gray-600">{ new Date(date).toLocaleString({
             month:'short',
            day:'2-digit'
         })}</p>}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Trip Time</h2>
          {date &&<p className="text-gray-600">{new Date(date).toLocaleString('en-US', {
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          }).replace(":", ".")}</p>}
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default TripDetailPage
