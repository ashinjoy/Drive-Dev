import React, { useEffect, useState } from "react";
import UserNavbar from "../../../Components/Navbar/UserNavbar";
import { useDispatch, useSelector } from "react-redux";
import { driverLogin } from "../../../Features/Driver/driverActions";
import { useNavigate } from "react-router-dom";

import { useSocket } from "../../../Hooks/socket";
import { reset } from "../../../Features/Driver/driverSlice";
import toast from "react-hot-toast";

function DriverLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {socket} = useSocket()
  const dispatch = useDispatch();
  const { driver, message, error } = useSelector((state) => state.driver);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginDetails = {
      email,
      password,
    };

    if (email.trim() === "" && password.trim() === "") {
      toast.error("Please fill All fields");
    } else if (email.trim() == "") {
      toast.error("Please Enter your Email");
    } else if (password.trim() === "") {
      toast.error("Please Enter your password");
    } else if (!emailRegex.test(email)) {
      toast.error("Please Enter a Valid Email");
    } else {
      console.log('entry');
      dispatch(driverLogin(loginDetails));
      
    }
  };
  useEffect(() => {
    console.log('in use');
    
    if (message === "Logged In Successfully") {  
      socket?.emit('driver-connected',driver.id)
      dispatch(reset())
      navigate("/driver/home");
    } else if (error) {
      console.log('skskk');
      toast.error(error);
      dispatch(reset())
    }
  }, [message, error]);

  return (
    <>
      <UserNavbar driver={'driver'} />
      <section className="bg-gray-50  h-screen">
        <div className="flex flex-col items-center justify-center  mx-auto md:h-screen lg:py-0">
          <div className="w-full  rounded-lg shadow-lg md:mt-16 sm:max-w-md xl:p-0 border bg-[#FFF8DC]">
            <div className="p-6 space-y-6 md:space-y-8 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-black md:text-3xl">
              Driver Login
              </h1>
              <form
                className="space-y-6 md:space-y-5"
                action=""
                onSubmit={(e) => handleSubmit(e)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="border-2  text-gray-900 text-sm rounded-lg w-full p-2.5 outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="border-2 outline-none text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DriverLoginPage;
