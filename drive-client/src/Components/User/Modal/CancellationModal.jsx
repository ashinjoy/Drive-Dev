import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cancelRide } from '../../../Features/Trip/tripActions'
import { resetTripDetails } from '../../../Features/Trip/tripSlice'

function CancellationModal({setCancelModal,setCancelConfirmModal}) {
    const [selectReason,setSelectReason] = useState('')
    const {user} = useSelector(state=>state.user)
    const {tripDetail,tripStatus,cancelData} = useSelector(state=>state.trip)
    useEffect(()=>{
        if(tripStatus === 'cancelled'){
        setCancelConfirmModal(true)
        setCancelModal(false)
        dispatch(resetTripDetails())
        }

    },[cancelData,tripStatus])

    const dispatch = useDispatch()
    const handleCancellation = ()=>{
        dispatch(cancelRide({userId:user?.id,tripId:tripDetail?._id,cancelReason:selectReason}))
    }
  return createPortal(
    <>
   <div className='fixed inset-0 flex flex-col justify-center items-center bg-slate-900 bg-opacity-75 z-40'>
    <div className='flex flex-col w-[45%] h-[70%] rounded-md bg-gray-50 justify-center items-center gap-3'>
        <h1 className='text-xl font-bold'>Cancellation Reasons</h1>
    <div className='w-full flex flex-col justify-center items-center space-y-4'>
        <label className='w-[80%] flex  gap-2 p-2 border border-black rounded-md cursor-pointer'>
          <input type="radio" value={"Selected Wrong Pickup Location"} className="text-blue-600 focus:ring-blue-500" onClick={(e)=>setSelectReason(e.target.value)} />    
          Selected Wrong Pickup Location
        </label>

        <label className='w-[80%] flex  gap-2 p-2 border border-black rounded-md cursor-pointer'>
          <input type="radio" value={"Selected Wrong Drop Location"} className="text-blue-600 focus:ring-blue-500" onClick={(e)=>setSelectReason(e.target.value)}/>
          Selected Wrong Drop Location
        </label>

        <label className='w-[80%] flex  gap-2 p-2 border border-black rounded-md cursor-pointer'>
          <input type="radio" value={"Booked by Mistake"} className="text-blue-600 focus:ring-blue-500" onClick={(e)=>setSelectReason(e.target.value)}/>
          Booked by Mistake
        </label>

        <label className='w-[80%] flex  gap-2 p-2 border border-black rounded-md cursor-pointer'>
          <input type="radio" value={"Selected different vehicle type"} className="text-blue-600 focus:ring-blue-500" onClick={(e)=>setSelectReason(e.target.value)}/>
          Selected different vehicle type
        </label>

        <label className='w-[80%] flex  gap-2 p-2 border border-black rounded-md cursor-pointer'>
          <input type="radio" value={"Taking too long to confirm ride"} className="text-blue-600 focus:ring-blue-500" onClick={(e)=>setSelectReason(e.target.value)}/>
          Taking too long to confirm ride
        </label>
      </div>
      <div className='w-full flex justify-around mt-6'>
        <button className='text-blue-600 ' onClick={()=>setCancelModal(false)}>Don’t Cancel</button>
        <button className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'onClick={handleCancellation}>
          Yes, Continue
        </button>
      </div>
    </div>
   </div>
   </>,document.getElementById("cancel-modal")
  )
}

export default CancellationModal
