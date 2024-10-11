import { logDOM } from '@testing-library/react'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CancelConfirmedModal() {
  const {tripStatus,cancelData} = useSelector(state=>state.trip)
  const navigate = useNavigate()
  setTimeout(()=>{
    navigate('/search-ride')
  },3000)

  return createPortal(
    <>
    <div className='fixed inset-0 flex flex-col justify-center items-center bg-slate-900 bg-opacity-75 z-40'>
    <div className="flex flex-col w-[90%] max-w-md h-auto rounded-lg bg-white shadow-lg p-6 items-center gap-6">
    
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Ride Cancelled </h2>
      <p className="text-gray-600 text-sm">
        You've canceled the ride Sorry For the Inconvenience
      </p>
    </div>
    
  </div>
      
    </div>
    </>,document.getElementById('cancel-modal')
  )
}

export default CancelConfirmedModal
