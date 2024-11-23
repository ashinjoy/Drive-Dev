import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import { TbRoad } from "react-icons/tb";
import { MdAccessTimeFilled, MdDateRange } from "react-icons/md";
import { IoPricetagSharp } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";
import UserNavbar from "../../../Components/Navbar/UserNavbar";
import { getTripDetailService } from "../../../Features/Trip/tripService";
import "mapbox-gl/dist/mapbox-gl.css";

function TripDetailPage() {
  const { tripId } = useParams();
  const [tripDetail, setTripDetail] = useState(null);
  useEffect(() => {
    const getTripDetail = async () => {
      try {
        const { getTripDetail } = await getTripDetailService(tripId);
        setTripDetail(getTripDetail);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    getTripDetail();
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="min-w-screen flex justify-center bg-gray-50">
        <div className="lg:w-1/2 md:w-3/4 sm:w-full mt-[7rem] flex flex-col gap-6 p-4">
          <h1 className="text-center text-3xl font-bold text-gray-800">
            Your Trip
          </h1>
          <p className="text-center text-lg text-gray-600">
            <MdDateRange size={"1.5rem"} className="inline-block" />{" "}
            {new Date(tripDetail?.createdAt).toLocaleString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}{" "}
            with{" "}
            <span className="font-semibold">
              {tripDetail?.driverId?.name.toUpperCase()}
            </span>
          </p>
          <div className="bg-white shadow-md border rounded-lg w-full h-[19rem] flex items-center justify-center">
            <Map
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              attributionControl={false}
            >
              {tripDetail?.startLocation?.coordinates.length > 0 && (
                <Marker
                  longitude={tripDetail?.startLocation?.coordinates[0]}
                  latitude={tripDetail?.startLocation?.coordinates[1]}
                ></Marker>
              )}
              {tripDetail?.endLocation?.coordinates.length > 0 && (
                <Marker
                  longitude={tripDetail?.endLocation?.coordinates[0]}
                  latitude={tripDetail?.endLocation?.coordinates[1]}
                ></Marker>
              )}
            </Map>
          </div>
          <div className="bg-white shadow-md border rounded-lg p-4">
            <h2 className="text-lg font-bold text-gray-800">Trip Details</h2>
            <div className="flex gap-3 mt-2">
              <TbRoad size={"1.5rem"} className="text-gray-600" />
              <span className="text-gray-700">{`${(
                parseFloat(tripDetail?.distance) / 1000
              ).toFixed(2)} kilometers`}</span>
            </div>
            <div className="flex gap-3 mt-2">
              <MdAccessTimeFilled size={"1.5rem"} className="text-gray-600" />
              <span className="text-gray-700">
                {(parseFloat(tripDetail?.duration) / 60).toFixed(2)} min
              </span>
            </div>
            <div className="flex gap-3 mt-2">
              <IoPricetagSharp size={"1.5rem"} className="text-gray-600" />
              <span className="text-gray-700 font-bold">
                ₹{tripDetail?.fare}
              </span>
            </div>
            {/* <button className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
              View Receipt
            </button> */}
          </div>
          <div className="bg-white shadow-md border rounded-lg p-4">
            <h2 className="text-lg font-bold text-gray-800">Routes</h2>
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex justify-between">
                <TbPointFilled size={"1.5rem"} className="text-gray-600" />
                <p className="text-gray-700 flex-1">
                  {tripDetail?.pickUpLocation}
                </p>
                <span className="text-gray-500">
                  {new Date(tripDetail?.startTime).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <TbPointFilled size={"1.5rem"} className="text-gray-600" />
                <p className="text-gray-700 flex-1">
                  {tripDetail?.dropOffLocation}
                </p>
                <span className="text-gray-500">
                  {new Date(tripDetail?.endTime).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md border rounded-lg p-4">
            <h2 className="text-lg font-bold text-gray-800">Driver Data</h2>
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex justify-between">
                <TbPointFilled size={"1.5rem"} className="text-gray-600" />
               {tripDetail && <p className="text-gray-700 flex-1">
                  {tripDetail?.driverId?.name.toUpperCase()}
                </p>}
                <span className="text-gray-500">Rating: ★★★★☆</span>
              </div>
              <div className="flex justify-between">
                <TbPointFilled size={"1.5rem"} className="text-gray-600" />
                <p className="text-gray-700 flex-1">License</p>
                <span className="text-gray-500">
                  {tripDetail?.driverId?.vehicleDetails?.rc_Number}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TripDetailPage;
