import React from "react";
import { useNavigate } from "react-router-dom";

function HomeCards({ type }) {
  const navigate = useNavigate()
  return (
    <div className="w-full md:w-[25%] min-h-[20rem] shadow-md border border-gray-200 rounded-md bg-white p-6 flex flex-col justify-between transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
      <h1 className="text-2xl font-bold mb-4 ">
        {type === "driver"
          ? "Become a Driver"
          : type === "user"
          ? " Ride with Us"
          : "Affordable Rates"}
      </h1>
      <p className="font-normal text-gray-700 leading-relaxed mb-6">
        {type === "driver"
          ? "Join our growing community of drivers and earn extra income on your own schedule. Whether you have an auto or a bike, our platform connects you with riders in need of quick, reliable transportation. Start your journey today and make the city move!"
          : type === "user"
          ? "Need to get somewhere quickly? Request an auto or bike taxi with just a tap! Enjoy safe and comfortable rides through the city, perfect for navigating busy streets and beating the traffic. Your reliable ride is just a few minutes away."
          : "Traveling doesn’t have to be expensive. Our auto and bike taxi services offer the best rates in town, ensuring you reach your destination without breaking the bank. Enjoy the most affordable rides for your everyday needs, wherever you go."}
      </p>

      <button
        className="mt-auto px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition duration-200"
        aria-label="Join As a Driver"
        onClick={type === "driver" ? ()=> navigate(`/driver/signup`) : type === "user" ? ()=>navigate(`/search-ride`) : ()=> navigate(`/search-ride`) }
      >
        {type === "driver"
          ? "Join As a Driver"
          : type === "user"
          ? "Request a Ride"
          : "Start Ride"}
      </button>
    </div>
  );
}

export default HomeCards;
