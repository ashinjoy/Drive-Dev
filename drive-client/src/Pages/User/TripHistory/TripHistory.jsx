import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllTripsService } from '../../../Features/Trip/tripService'
import UserNavbar from '../../../Components/Navbar/UserNavbar'
import TripCard from '../../../Components/TripCard/TripCard'
import  Pagination  from '@mui/material//Pagination'

function TripHistory() {
    const [tripDetails,setTripDetails] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const {user} = useSelector(state=>state.user)
    const handlePageChange = (evt,value)=>{
      setCurrentPage(value)
    }
    useEffect(()=>{
        const getAllTrips=async()=>{
          try {
            const response = await getAllTripsService({userId:user?.id,page:currentPage})         
            setTripDetails(response?.tripDetails)
            setTotalPages(Math.ceil(response?.totalDocs/6))
          } catch (error) {
            console.error(error);
            throw error
          }
        }
        getAllTrips()
    },[currentPage])
  return (
    <>
    <UserNavbar/>
    
    <div className='w-[100%] flex  justify-center'>
    <div className=" h-[80%] w-[80%] mt-[7rem] flex flex-col justify-center items-center">
    <h1 className="text-2xl font-bold mb-6">My Trips</h1>
       {(tripDetails && tripDetails.length > 0 ) && tripDetails.map((trip)=>{
        const dateFormat = new Date(trip?.createdAt)
        const formattedDate =dateFormat.toLocaleString('en-US',{
            month:'short',
            day:'2-digit'
        })
        const formattedTime = dateFormat.toLocaleString('en-US', {
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          }).replace(":", ".");
      return ( <TripCard
        title={trip?.pickUpLocation}
        date={formattedDate}
        time={formattedTime}
        price={trip?.fare}
        status={trip?.tripStatus}
        id = {trip?._id}
        key={trip._id}
        trip={trip}
      />)
       })} 
       <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color='primary' />
    </div>
    </div>
    </>
  )
}

export default TripHistory
