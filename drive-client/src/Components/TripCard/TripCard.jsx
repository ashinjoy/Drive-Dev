import React from 'react';
import { Link } from 'react-router-dom';

const TripCard = ({ title, date, time, price, status,id }) => {
  return (
    <div className="flex w-[50%] items-center  bg-white p-4 rounded-lg border-2 shadow-md mb-4 hover:bg-slate-100 hover:cursor-pointer">
      <div className="flex-shrink-0">
        <img
          src="/assets/TukTuk_Green_v1.png"
          alt="Car Icon"
          className="w-24 h-20"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">
          {date}  {time}
        </p>
        <p className="text-sm text-gray-600">
          ₹{price}  {status}
        </p>
      </div>
      <div className="flex space-x-2">
        {/* <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Help</button> */}
        <Link className="px-4 py-2 bg-gray-200 rounded-lg text-sm" to={`/trip-Detail/${id}`}>Details</Link>
        <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Rebook</button>
      </div>
    </div>
  );
};

export default TripCard;
