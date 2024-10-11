import React from 'react'
import LiveMapUpdates from '../../../Components/User/Maps/LiveMap'
import BookingInfo from '../../../Components/User/BookingInfo/BookingInfo'
import UserNavbar from '../../../Components/Navbar/UserNavbar'

function LiveLocation() {
  return (
    <>
    <UserNavbar/>
    <BookingInfo/>
    <LiveMapUpdates/>
    </>
  )
}

export default LiveLocation