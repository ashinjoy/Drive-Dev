import React from 'react'
import LiveMapUpdates from '../../../Components/User/Maps/LiveMap'
import BookingInfo from '../../../Components/User/BookingInfo/BookingInfo'
import UserNavbar from '../../../Components/Navbar/UserNavbar'

function LiveLocation() {
  return (
    <>
    <UserNavbar/>
    <div className="relative flex flex-col md:flex-row w-full h-full">
    <BookingInfo/>
    <LiveMapUpdates/>
    </div>
    </>
  )
}

export default LiveLocation