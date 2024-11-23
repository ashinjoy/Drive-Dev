import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelRide } from "../../../Features/Trip/tripActions";
import { resetTripDetails } from "../../../Features/Trip/tripSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CancellationModal({ setCancelModal, setCancelConfirmModal }) {
  // console.log(setCancelConfirmModal,setCancelModal);
  
  const [selectReason, setSelectReason] = useState("");
  const { user } = useSelector((state) => state.user);
  const { tripDetail, tripStatus, cancelData, error } = useSelector(
    (state) => state.trip
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (tripStatus === "cancelled") {
      setCancelConfirmModal(true);
      setCancelModal(false);
      dispatch(resetTripDetails());
    }
  }, [cancelData, tripStatus]);

  useEffect(() => {
    if (error === "The Ride Has Been Cancelled Already") {
      dispatch(resetTripDetails());
      navigate("/search-ride");
      return;
    }
    return;
  }, [error]);

  const handleCancellation = () => {
    if(selectReason.trim() === ""){
toast.error('Select a reason to cancel Ride')
return
    }
    dispatch(
      cancelRide({
        userId: user?.id,
        tripId: tripDetail?._id,
        cancelReason: selectReason,
      })
    );
  };
  return createPortal(
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-slate-900 bg-opacity-75 z-40 transition-opacity duration-300 ease-in-out">
        <div className="flex flex-col w-full max-w-lg md:w-[45%] h-auto p-6 rounded-lg bg-white shadow-xl border-2 border-yellow-500">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Cancellation Reasons
          </h1>
          <div className="w-full flex flex-col justify-center items-center space-y-4">
            {[
              "Selected Wrong Pickup Location",
              "Selected Wrong Drop Location",
              "Booked by Mistake",
              "Selected different vehicle type",
              "Taking too long to confirm ride",
            ].map((reason, index) => (
              <label
                key={index}
                className="w-[90%] flex items-center gap-3 p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <input
                  type="radio"
                  value={reason}
                  checked={selectReason === reason}
                  className="text-blue-600 focus:ring-blue-500"
                  onChange={(e) => setSelectReason(e.target.value)}
                />
                <span className="text-gray-700">{reason}</span>
              </label>
            ))}
          </div>
          <div className="w-full flex justify-between mt-6 space-x-4">
            <button
              className="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out focus:outline-none"
              onClick={() => setCancelModal(false)}
            >
              Don’t Cancel
            </button>
            <button
              className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              onClick={handleCancellation}
            >
              Yes, Continue
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("cancel-modal")
  );
}

export default CancellationModal;
