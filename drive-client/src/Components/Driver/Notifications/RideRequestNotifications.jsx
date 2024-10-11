import React, { useState } from 'react'
import { TfiLocationPin } from "react-icons/tfi";
import { ImLocation2 } from "react-icons/im";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { acceptTrip,rejectTrip } from '../../../Features/Trip/tripActions';


function RideRequestNotifications({trip,setOpenNotification}) {
    const [isExpand,setExpand] = useState(false)
    const {driver} = useSelector(state=>state.driver)
    const  dispatch = useDispatch()
    const acceptRide = ()=>{
      const data = {
        driverId:driver?.id,
        status:'accepted',
        tripId:trip?._id
      }
      dispatch(acceptTrip(data))
      setOpenNotification(false)
    }
    const rejectRide = ()=>{
      const data = {
        driverId:driver?.id,
        status:'rejected',
        tripId:trip?._id
      }
      dispatch(rejectTrip(data))
      setOpenNotification(false)
    }
  return (
    // <motion.div 
    // initial={{x:1000}}
    // animate={{x:0}}
    // exit={{x:1000}}
    // className='fixed p-2 top-11 right-6 flex flex-col gap-3  w-[29rem] min-h-[4rem] border-2  border-black bg-gray-100 shadow-xl z-50'>
    //     <div className='flex gap-2 px-5'>
    //     <TfiLocationPin size={20}  />
    //     <span className=''>{trip?.pickUpLocation}</span>
    //     </div>
    //     <div className='flex gap-2 px-5'>
    //     <ImLocation2 size={20} />
    //     <span>{trip?.dropOffLocation}</span>
    //     </div>
    //     <div className='flex justify-around'>
    //     <button className='py-1 bg-green-400 rounded-sm w-[40%]' onClick={()=>acceptRide()}>Accept</button>
    //     <button className='py-1 bg-red-400 rounded-sm w-[40%]' onClick={()=>rejectRide()}>Reject</button>
    //     </div>
    //     <div className='absolute right-7 text-xl font-bold'>{trip?.fare}</div>
    // </motion.div>
    <motion.div 
    initial={{x:1000, opacity: 0}}
    animate={{x:0, opacity: 1}}
    exit={{x:1000, opacity: 0}}
    className='fixed p-4 top-12 right-8 flex flex-col gap-4 w-[30rem] min-h-[6rem] border rounded-lg bg-white shadow-lg z-50' 
    style={{borderColor: '#D1D5DB'}}
>
    <div className='flex gap-3 items-center px-6'>
        <TfiLocationPin size={22} className='text-blue-600' />
        <span className='text-lg font-medium text-gray-700'>{trip?.pickUpLocation}</span>
    </div>
    <div className='flex gap-3 items-center px-6'>
        <ImLocation2 size={22} className='text-green-500' />
        <span className='text-lg font-medium text-gray-700'>{trip?.dropOffLocation}</span>
    </div>
    
    <div className='flex justify-between items-center mt-2 px-6'>
        <button 
            className='py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all shadow-md w-[45%]' 
            onClick={() => acceptRide()}>
            Accept
        </button>
        <button 
            className='py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all shadow-md w-[45%]' 
            onClick={() => rejectRide()}>
            Reject
        </button>
    </div>

    <div className='absolute top-[1rem] right-6 text-2xl font-semibold text-yellow-600'>
        ₹{trip?.fare}
    </div>
</motion.div>

  )
}

export default RideRequestNotifications
