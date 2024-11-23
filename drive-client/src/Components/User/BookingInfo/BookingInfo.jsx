import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoChatboxOutline } from "react-icons/io5";
import Chat from "../../Chat/Chat";
import { UserPrivate } from "../../../Utils/Axios/userInterceptor";

import {  payment } from "../../../Features/Trip/tripActions";
import CancellationModal from "../Modal/CancellationModal";
import CancelConfirmedModal from "../Modal/CancelConfirmedModal";
import { CgEditBlackPoint } from "react-icons/cg";
import { ImLocation } from "react-icons/im";
import { AiFillCreditCard } from "react-icons/ai";
import PaymentConfirmModal from "../Modal/PaymentConfirmModal";



function BookingInfo() {
  const { tripDetail, tripStatus,paymentStatus} = useSelector((state) => state.trip);
  const [openChat, setOpenChat] = useState(false);
  const [cancelConfirmed, setCancelConfirmModal] = useState(false);
  const [paymentModal,setPaymentModal] = useState(false)
  const [paymentData,setPaymentData] = useState(null)
  const [payOption, setPayOption] = useState(false);
  const [openCancelModal, setCancelModal] = useState(false);
  // const dispatch = useDispatch();
  const [senderId, setSenderId] = useState(null);
  const [recieverId, setRecieverId] = useState(null);
  const { user } = useSelector((state) => state.user);
  

  const selectPaymentOption = async (e) => {
    setPayOption(e.target.value);
     await UserPrivate.put("trip/users/change-paymentmode", {
      tripId: tripDetail?._id,
      paymentMethod: e.target.value,
    });
  };
  useEffect(() => {
    if (tripDetail && tripStatus === "accepted") {
      setRecieverId(tripDetail?.driverId);
      setSenderId(tripDetail?.userId);
      setPayOption(tripDetail?.paymentMethod);
    }

  }, [tripDetail,tripStatus]);

  const handlePayment = async () => {
    const data = {
      userId: user?.id,
      tripId: tripDetail?._id,
      driverId: tripDetail?.driverId,
      paymentMethod: payOption,
      fare: tripDetail?.fare,
    };
    setPaymentData(data)
    setPaymentModal(true)
    // dispatch(payment(data))

  };

  const handleCancelRide = () => {
      setCancelModal(true);
  };



  return (
    <div className="w-full lg:w-[22rem] h-auto lg:h-[85dvh] border-2 border-gray-300 rounded-lg shadow-xl mt-4 lg:mt-[5rem] p-6 flex flex-col bg-white">
  {openChat && <Chat user={'user'} setOpenChat={setOpenChat} />}
  <div className="flex flex-col items-center border-b pb-4">
    <div className="flex w-full items-center mb-4">
      {tripStatus === "accepted" || tripStatus === "started" ? (
        <div className="w-full flex justify-between items-center">
          <img
            src={tripDetail?.driverDetails?.profileImg}
            alt="Driver"
            className="w-[6rem] h-auto rounded-sm border-2 border-gray-300 shadow-sm"
          />
          <div className="ml-4 flex flex-col">
            <h2 className="text-lg font-bold">{tripDetail?.driverDetails?.name?.toUpperCase()}</h2>
            <p className="text-gray-500">{tripDetail?.driverDetails?.vehicleDetails?.vehicleType}</p>
            <p className="text-gray-500">{tripDetail?.driverDetails?.vehicleDetails?.rc_No}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-xl font-semibold tracking-wide text-center">Looking for Nearby Drivers</h1>
          <img
            src="/assets/ai-generated-magnifying-glass-cartoon-png-transformed.webp"
            alt="Searching"
            className="h-[4.5rem] w-auto mx-auto mt-4 opacity-80 animate-pulse"
          />
        </div>
      )}
    </div>

    {(tripStatus === "accepted" || tripStatus === "started") && tripDetail?.otp && (
      <div className="mt-3 flex justify-center space-x-2">
        {tripDetail.otp.split('').map((el, index) => (
          <button
            key={index}
            className="px-3 py-1 bg-blue-600 text-white text-lg rounded-lg shadow-md font-semibold transition transform hover:scale-105"
          >
            {el}
          </button>
        ))}
      </div>
    )}
  </div>

  <div className="flex flex-col items-center mt-6 space-y-6">
  
    {(tripStatus === "accepted" || tripStatus === "started") && (
      <div className="flex flex-col items-center">
        <button onClick={() => setOpenChat(true)} className="focus:outline-none">
          <IoChatboxOutline size={'2rem'} className="text-gray-800" />
        </button>
        <span className="text-sm mt-2">Chat with Driver</span>
      </div>
    )}

   
    <div className="w-full mt-4 flex flex-col space-y-6">
   { (!cancelConfirmed && tripDetail ) &&  <div className="flex  items-center gap-3">
        <CgEditBlackPoint size={'1.5rem'} />
        <div className="flex flex-col">
        <p className="text-lg font-medium">{tripDetail?.pickUpLocation.split(',')[0]}</p>
        <p className="text-base text-gray-600">{tripDetail?.pickUpLocation.split(',').slice(1)}</p>
        </div>
      </div>}

     {(!cancelConfirmed && tripDetail ) && <div className="flex items-center gap-3">
        <ImLocation size={'1rem'} />
        <div className="flex flex-col">
          <p className="text-lg font-medium">{tripDetail?.dropOffLocation.split(',')[0]}</p>
          <p className="text-base text-gray-600">{tripDetail?.dropOffLocation.split(',').slice(1)}</p>
        </div>
      </div>}
    </div>
  </div>

  <div className="mt-6 flex flex-col space-y-4">
   {(!cancelConfirmed && tripDetail ) && <div className="flex items-center gap-3">
      <AiFillCreditCard size={'1rem'} />
      <p className="text-lg font-semibold">₹ {tripDetail?.fare}</p>
    </div>}

    {((tripStatus === "accepted" || tripStatus === "started") && paymentStatus !== "paid") && (
      <div className="flex p-1 items-center justify-between mt-2 gap-4">
        {tripDetail.paymentMethod !== "Cash" ? (
          <>
            <select
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm w-1/2 focus:outline-none"
              value={payOption}
              onChange={selectPaymentOption}
            >
              <option value="Online-Payment">Pay Online</option>
              <option value="Wallet">Wallet</option>
            </select>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md w-1/2 transition hover:bg-blue-700"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </>
        ) : (
          <div className="flex gap-2 items-center">
            <h3 className="text-md font-semibold">Payment Method:</h3>
            <p className="text-lg font-semibold">Cash</p>
          </div>
        )}
      </div>
    )}
  </div>
  {paymentModal && <PaymentConfirmModal paymentData={paymentData} setPaymentModal={setPaymentModal}/>}
  {openCancelModal && <CancellationModal setCancelModal={setCancelModal} setCancelConfirmModal={setCancelConfirmModal} />}
  {cancelConfirmed && <CancelConfirmedModal setCancelConfirmModal={setCancelConfirmModal} />}

  {((tripStatus === "requested" || tripStatus === "accepted") && (paymentStatus !== "paid")) && (
    <button
      className="mt-auto bg-red-500 text-white py-2 rounded-lg shadow-md transition hover:bg-red-600 focus:outline-none"
      onClick={handleCancelRide}
    >
      Cancel Ride
    </button>
  )}
</div>
  )
  
}

export default BookingInfo;
