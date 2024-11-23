import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { stripePaymentConfirmation } from "../../Features/Trip/tripActions";
import UserNavbar from "../Navbar/UserNavbar";

function PaymentSucessFullPage() {
  const [searchParams] = useSearchParams()
  const sessionId =  searchParams.get('session_id')
  const dispatch = useDispatch();
  const { tripDetail } = useSelector((state) => state.trip);
  const navigate = useNavigate();
  // userId, tripId, driverId, paymentMethod, fare
  useEffect(() => {
    const paymentInfo = {
      userId: tripDetail?.userId,
      driverId: tripDetail?.driverId,
      tripId: tripDetail?._id,
      paymentMethod: tripDetail?.paymentMethod,
      fare: tripDetail?.fare,
      sessionId:sessionId
    };

    dispatch(stripePaymentConfirmation(paymentInfo));
        setTimeout(()=>{
    navigate('/trip')
        },3000)
  }, []);
  return (
    <>
<UserNavbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
  <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg w-full text-center">
    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto animate-pulse">
      <svg
        className="w-12 h-12 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
    <h1 className="text-3xl font-bold text-gray-800 mt-6">
      Payment Successful!
    </h1>
    <p className="text-gray-500 mt-3">
      Your payment has been processed successfully. Thank you for your trust in
      our services.
    </p>
    <div className="mt-6">
      <button
        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
        onClick={() => console.log("Navigating to Homepage")}
      >
        Go to Homepage
      </button>
    </div>
   
  </div>
</div>
</>
    
  );
}

export default PaymentSucessFullPage;
