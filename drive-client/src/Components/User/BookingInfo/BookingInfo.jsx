import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdHealthAndSafety } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import Chat from "../../Chat/Chat";
import { SosAlert } from "../../../Features/User/userActions";
import { UserPrivate } from "../../../Utils/Axios/userInterceptor";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { cancelRide, payment } from "../../../Features/Trip/tripActions";
import CancellationModal from "../Modal/CancellationModal";
import CancelConfirmedModal from "../Modal/CancelConfirmedModal";
import { CgEditBlackPoint } from "react-icons/cg";
import { ImLocation } from "react-icons/im";
import { AiFillCreditCard } from "react-icons/ai";



function BookingInfo() {
  const { tripDetail, message ,tripStatus,paymentStatus} = useSelector((state) => state.trip);
  const [openChat, setOpenChat] = useState(false);
  const [cancelConfirmed, setCancelConfirmModal] = useState(false);

  const [payOption, setPayOption] = useState(false);
  const [openCancelModal, setCancelModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


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
    dispatch(payment(data))

  };

  const handleSos = () => {
    dispatch(SosAlert(user?.id));
  };
  const handleCancelRide = () => {
    if(tripStatus === "requested"){
      setCancelModal(true);
    }else if(tripStatus === "accepted"){
      setCancelConfirmModal(true)
    }
    dispatch(cancelRide({userId:user?.id,tripId:tripDetail?._id}))
  };

  useEffect(() => {
    if (message === "No Response from Drivers") {
      toast(
        "Drivers Not Available! Try again from differrnt Pickup Location or Retry after Sometime"
      );
      navigate("/search-ride");
    }
  });

  return (
<div className="w-[22rem] h-[80vh] border-2 border-gray-300 rounded-md shadow-md mt-[7rem] ml-[4rem] p-4 flex flex-col">
  {openChat && <Chat openChat={openChat} user={user} setOpenChat={setOpenChat}/>}
  <div className="flex flex-col items-center border-b-2 pb-4">
    <div className="flex items-center mb-2">
       <div className="flex items-center mb-2">
  {(tripStatus === "accepted" || tripStatus === "started") ? (
    <>
      <img
        src={tripDetail?.driverDetails?.profileImg}
        alt="Driver"
        className="w-[4rem] h-[4rem] rounded-full border-2 border-gray-300"
      />
      <div className="ml-4">
        <h2 className="text-lg font-bold">{tripDetail?.driverDetails?.name}</h2>
        <p className="text-gray-500">{tripDetail?.driverDetails?.vehicleDetails?.vehicleType}</p>
        <p className="text-gray-500">licec</p>
      </div>
    </>
  ) : <>
    <div className="flex flex-col">
    <h1 className="text-center text-xl font-bold tracking-wide">
        Looking For Nearby Drivers
      </h1>
      <img
        src="/assets/ai-generated-magnifying-glass-cartoon-png-transformed.webp"
        alt="img"
        className="h-[5rem] w-auto mx-auto mt-6 opacity-90 animate-pulse"
      />
    </div> 
    </>}
  
</div>

    </div>
    {tripStatus !== "requested" && <div className="mt-2 flex justify-center">
      {tripDetail?.otp && tripDetail?.otp.split('').map((el)=>{
     return <button className="px-3 py-1 bg-blue-500 text-white rounded-md mx-1">{el}</button>
      
      })}
      
    </div>}
  </div>
  <div className="flex items-center  mt-4">
  </div>
  <div className="flex justify-between items-center mt-4">
   {(tripStatus === "accepted" || tripStatus === "started") && <>
    <div className="flex flex-col items-center">
      <button  onClick={handleSos}>
      <MdHealthAndSafety size={'2rem'} style={{color:"blue"}}/>
      </button>
      <span className="text-sm">Safety</span>
    </div>
    <div className="flex flex-col items-center">
      <button onClick={()=>setOpenChat(true)}>
      <IoChatbubbleEllipsesSharp size={'2rem'} style={{color:"black"}}/>
      </button>
      <span className="text-sm">Chat with driver</span>
    </div>
   </> }
  </div>
  <div className="mt-4 flex flex-col">
    <div className="flex items-center gap-4">
    <CgEditBlackPoint size={'1rem'}/>
      <p className="text-lg font-medium ">{tripDetail?.pickUpLocation}</p>
    </div>
    <div className="flex items-center  mt-4 gap-4">
    <ImLocation size={'1rem'}/>
      <div className="flex flex-col gap-1">
      <p className="text-lg font-medium">{tripDetail?.dropOffLocation.split(',')[0]}</p>
      <p className="text-base text-gray-600">{tripDetail?.dropOffLocation.split(',').slice(1)}</p>
      </div>
    </div>
    <div className="flex items-center  mt-4 gap-4">
      <AiFillCreditCard size={'1rem'}/>
      <p className="text-lg ">₹ {tripDetail?.fare}</p>
    </div>
    <div className="flex items-center justify-between mt-2">
    {((tripStatus === "accepted" || tripStatus === "started") &&  (paymentStatus !== "paid")) && (
       <>
         <select
           className="bg-white border border-gray-300 p-2 rounded-md"
           value={payOption}
           name=""
           id=""
           onChange={selectPaymentOption}
         >
           <option value="Cash">Cash</option>
           <option value="Online-Payment">Pay Online</option>
           <option value="Wallet">Wallet</option>
         </select>
         <button
           className="bg-slate-500 w-1/2 p-2 rounded-md  text-white font-semibold shadow-md"
           onClick={handlePayment}
         >
           Pay Now
         </button>
       </>
   )} 
 {openCancelModal && (
     <CancellationModal setCancelModal={setCancelModal}setCancelConfirmModal={setCancelConfirmModal}/>
   )}
   {cancelConfirmed && <CancelConfirmedModal />}
    </div>
  </div>
 { (tripStatus === "requested" || tripStatus === "accepted") && <button className="mt-auto bg-red-500 text-white py-2 rounded-md" onClick={handleCancelRide}>
    Cancel
  </button>}
</div>

  );
}

export default BookingInfo;
