import React, { useEffect} from "react";
import { motion } from "framer-motion";
import { reset } from "../../../Features/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import HomeCards from "./HomeCards";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {token} = useSelector(state =>state.user)
  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <>
      <div className="bg-gray-50 flex flex-col min-h-screen">
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 text-white min-h-[80vh] flex justify-center items-center">
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="relative z-10 max-w-5xl text-center px-4 sm:px-0">
            <h1 className="text-5xl font-bold tracking-wide mb-4">
              Instant Rides for Busy Streets
            </h1>
            <p className="text-xl mb-8">
              Request a Ride Anytime, Anywhere – Skip the Traffic Hassle!
            </p>
            <button className="bg-[#FEB71B] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#FFA500] transition duration-300 ease-in-out" onClick={()=>navigate('/search-ride')}>
              Request Your Ride
            </button>
          </div>

          <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] border-b-[60vh] border-b-[#FEB71B] border-l-[50vw] border-l-transparent"></div>
          <motion.div
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative z-10 mr-[5rem] hidden lg:block"
          >
            <img
              src="/assets/Bike-Taxi-App-Bike-Taxi-Kolkata-Bike-Taxi-Number-Bike-Taxi-BroomBoom-1.webp"
              alt="Ride Service Illustration"
              className="w-[35vw] mt-[4rem]"
            />
          </motion.div>
        </section>

        <section className="bg-gradient-to-r from-slate-200 to-slate-50 min-h-[70vh] flex flex-col justify-center p-8 ">
          <h1 className="text-4xl font-bold text-slate-800 text-center mb-4">
            Our Services
          </h1>
          <div className="flex flex-col  md:flex-row min-w-full gap-10 justify-center mt-5">
            <HomeCards type={"user"} />
            <HomeCards type={"driver"} />
            <HomeCards type={"rates"} />
          </div>
        </section>

        <section className="bg-blue-600 text-white py-8">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Welcome to Drive ! Enjoy Your Ride
            </h2>
            <p className="text-lg mb-6">
              Sign up today and enjoy on your first ride. Fast, easy, and
              affordable rides are just a click away.
            </p>
           { !token && <button className="bg-[#FEB71B] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#FFA500] transition duration-300 ease-in-out">
              Sign Up Now
            </button>}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
