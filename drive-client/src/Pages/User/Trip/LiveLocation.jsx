import React from 'react'
import LiveMapUpdates from '../../../Components/User/Maps/LiveMap'
import BookingInfo from '../../../Components/User/BookingInfo/BookingInfo'
import UserNavbar from '../../../Components/Navbar/UserNavbar'

function LiveLocation() {
  return (
    <>
    <UserNavbar/>
    .
    <div className="flex flex-col-reverse lg:flex-row w-full  justify-center">
    <BookingInfo/>
    <LiveMapUpdates/>
    </div>
    </>
  )
}

export default LiveLocation