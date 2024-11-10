import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { stripePaymentConfirmation } from "../../Features/Trip/tripActions";

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
    //     setTimeout(()=>{
    // navigate('/trip')
    //     },3000)
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-[#ffffe8]">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto">
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
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mt-2">
          Thank you for your payment. Your transaction has been completed.
        </p>
        <div className="mt-6">
          {/* <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200">
        Go to Homepage
      </button> */}
        </div>
      </div>
    </div>
  );
}

export default PaymentSucessFullPage;
