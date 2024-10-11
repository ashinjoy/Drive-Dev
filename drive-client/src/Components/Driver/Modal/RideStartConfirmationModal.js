
import React,{useState,useRef, useEffect} from 'react'
import { createPortal } from 'react-dom'
import { FaWindowClose } from "react-icons/fa";
import { startTrip } from '../../../Features/Trip/tripActions';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../../Hooks/socket';
import { distance } from 'framer-motion';





function RideStartConfirmationModal({setShowOtp,setStartRide}) {
  const [otpInp, setOtp] = useState(new Array(4).fill(""));
  // const {socket} = useSocket()
  const {message} = useSelector(state=>state.trip)
  const otpBoxReference = useRef([]);
  const dispatch = useDispatch()
  // const {driver} = useSelector((state)=>state.driver)
  const {tripDetail} = useSelector((state)=>state.trip)
  const handleInput = (e, currIndex) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      const newInp = [...otpInp];
      newInp[currIndex] = inputValue;
      setOtp(newInp);
      if (e.target.value && currIndex < 3) {
        otpBoxReference.current[currIndex + 1].focus();
      }
    } else {
      return "";
    }
  };

  const startJourney = () => {
    const convertOtpToNumber = otpInp.join('')
    const verificationData = {tripOtp:convertOtpToNumber,tripId: tripDetail?._id }
    dispatch(startTrip(verificationData));
    // setShowOtp(false);
    // setStartRide(false)
  };

  useEffect(()=>{
    if( message === 'Ride started SucessFully'){
      setStartRide(false)
      setShowOtp(false)
      return
        // const data = {
        //     userId:tripDetail?.userId,
        //     duration:tripDetail?.duration,
        //     distance:tripDetail?.distance,
        //     tripStatus:'started'
        // }
        // socket?.emit('start-ride',data)
    }
  },[message])


  return createPortal(
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-75 z-40">
        <div className="flex flex-col items-center justify-around bg-white border-4 border-yellow-400 w-1/3 h-1/2 p-6 rounded-lg shadow-xl relative">
          <FaWindowClose
            className="absolute top-4 right-4 text-gray-600 cursor-pointer"
            onClick={()=>setShowOtp(false)}
          />
          <div className="flex flex-col items-center">
           
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
               Enter OTP - Start Your Journey
            </h1>
            <div className="flex gap-3 mb-4">
              {otpInp.map((inp, index) => (
                <input
                  type="tel"
                  key={index}
                  value={inp}
                  maxLength={1}
                  ref={(ref) => (otpBoxReference.current[index] = ref)}
                  className="w-12 h-12 text-center text-xl border-2 border-yellow-400 shadow-md outline-none rounded-md p-2"
                  onChange={(e) => handleInput(e, index)}
                />
              ))}
            </div>
            <div className="flex gap-4">
              <button
                className="text-lg bg-yellow-400 rounded-md px-4 py-2 shadow-md hover:bg-yellow-500 transition-colors disabled:opacity-50"
                onClick={startJourney}
                >
                Verify Ride
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,document.getElementById('otp-modal')
  )
}

export default RideStartConfirmationModal
