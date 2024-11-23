import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestRideAction } from "../../../Features/Trip/tripActions";
import { useNavigate } from "react-router-dom";
import CashPaymentConfirmModal from "../Modal/CashPaymentConfirmModal";
import toast from "react-hot-toast";


function ListVehiclePriceDetails({
  pickUpCoords,
  dropCoords,
  pickupLocation,
  dropLocation,
}) {
  const [selectCategory, setSelectCategory] = useState("");
  const { user } = useSelector((state) => state.user);
  const [bikeFare, setBikeFare] = useState(null);
  const [autoFare, setAutoFare] = useState(null);
  const [eta, setEta] = useState(null);
  const bikeContainerRef = useRef(null);
  const autoContainerRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState("Online-Payment");
  const [cashPaymentModal, setCashPaymentModal] = useState(false);
  const { message } = useSelector((state) => state.trip);
  const navigate = useNavigate();
  const { additionalSearchMetaData } = useSelector((state) => state.trip);
  const dispatch = useDispatch();

  const handleSelectVehicle = (vehicleType) => {
    setSelectCategory(vehicleType);
  };

  const handlePaymentMethod = (e) => {
    if (e.target.value === "Cash") {
      setCashPaymentModal(true);
    }
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    if (message === "Ride Requested") {
      navigate("/trip");
      return;
    }
  }, [message]);
  const handleRequestRide = (e) => {
    if (selectCategory === "") {
      e.preventDefault();
      toast.error("please select a vehicle to prooceed");
      return;
    }
    let data = {
      userId: user?.id,
      vehicleType: selectCategory,
      eta: eta,
      pickUpCoords,
      dropCoords,
      pickupLocation,
      dropLocation,
      distance: additionalSearchMetaData?.distance,
      duration: additionalSearchMetaData?.duration,
      paymentMethod,
    };
    if (selectCategory === "Bike") {
      data = { ...data, fare: bikeFare };
    } else {
      data = { ...data, fare: autoFare };
    }
    dispatch(requestRideAction(data));
    // navigate("/trip");
  };

  useEffect(() => {
    const vehicleDetails = calculateFare(additionalSearchMetaData);
    setAutoFare(vehicleDetails?.AUTO_FARE);
    setBikeFare(vehicleDetails?.BIKE_FARE);
    setEta(vehicleDetails?.eta);
  }, [additionalSearchMetaData]);

  return (
    <>
      {cashPaymentModal && (
        <CashPaymentConfirmModal
          setPaymentMethod={setPaymentMethod}
          setCashPaymentModal={setCashPaymentModal}
        />
      )}
      <div className="flex flex-col md:w-full ">
        <h2 className="text-xl font-bold mb-4">Choose a ride</h2>
        <div
          className="h-[10rem]"
          onClick={() => handleSelectVehicle("Bike")}
          ref={bikeContainerRef}
          id="bikeContainer"
        >
          <div
            className={`border-2  rounded-lg p-4 flex items-center justify-between cursor-pointer h-[9rem] hover:shadow-lg transition-shadow duration-200 ${
              selectCategory === "Bike" && "border-2 border-yellow-500"
            } `}
          >
            <div className="flex items-center ">
              <img
                src="/assets/scooter-illustration-vintage-vehicle-sign-and-symbol-vector.jpg"
                alt="bike"
                className="w-20 h-20 mr-4"
              />
              <div>
                <p className="font-semibold">Bike Ride</p>
                <p className="text-sm text-gray-500">
                {eta && eta} mins •{" "}
                {new Date(new Date().getTime() + eta * 60000).toLocaleTimeString('en-US',{hour:'numeric',minute:'numeric'})}
                </p>
                <p className="text-sm text-gray-500">
                  Pay directly to driver, cash/UPI only
                </p>
              </div>
            </div>
            <p className="font-bold text-lg">{bikeFare && "₹" + bikeFare}</p>
          </div>
        </div>
        <div
          className="h-[10rem]"
          onClick={() => handleSelectVehicle("Auto")}
          ref={autoContainerRef}
          id="autoContainer"
        >
          <div
            className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer h-[9rem] hover:shadow-lg transition-shadow duration-200 ${
              selectCategory === "Auto" && "border-2 border-yellow-500"
            }`}
          >
            <div className="flex items-center">
              <img
                src="/assets/TukTuk_Green_v1.png"
                alt="Auto"
                className="w-20 h-20 mr-4"
              />
              <div>
                <p className="font-semibold">Auto Ride</p>
                <p className="text-sm text-gray-500">
                  {eta && eta} mins •{" "}
                  {new Date(new Date().getTime() + eta * 60000).toLocaleTimeString('en-US',{hour:'numeric',minute:'numeric'})}
                </p>
                <p className="text-sm text-gray-500">
                  Pay directly to driver, cash/UPI only
                </p>
              </div>
            </div>
            <p className="font-bold text-lg">{autoFare && "₹" + autoFare}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <select
            className="border p-2 rounded-md"
            value={paymentMethod}
            onChange={handlePaymentMethod}
          >
            <option value="Cash">Cash</option>
            <option value="Online-Payment">Pay Online</option>
            <option value="Wallet">Wallet</option>
          </select>
          <button
            className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            onClick={handleRequestRide}
          >
            Request Ride
          </button>
        </div>
      </div>
    </>
  );
}

export default ListVehiclePriceDetails;

function calculateFare(additionalSearchMetaData) {
  const BIKE_MIN_RATE = 40;
  const AUTO_MIN_RATE = 60;

  const BIKE_CHARGE_PER_KM = 5;
  const AUTO_CHARGE_PER_KM = 12;

  const TotalDistance_Kilometres = additionalSearchMetaData?.distance / 1000;

  const BIKE_FARE = Math.ceil(
    TotalDistance_Kilometres * BIKE_CHARGE_PER_KM + BIKE_MIN_RATE
  );

  const AUTO_FARE = Math.ceil(
    TotalDistance_Kilometres * AUTO_MIN_RATE + AUTO_CHARGE_PER_KM
  );

  const eta = Math.floor(additionalSearchMetaData?.duration / 60);

  return {
    BIKE_FARE,
    AUTO_FARE,
    eta,
    TotalDistance_Kilometres,
  };
}
