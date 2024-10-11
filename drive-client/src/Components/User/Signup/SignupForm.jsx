import React from "react";
import { useNavigate} from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { googleAuth, emailAuth } from "../../../Features/User/userActions";
import Modal from "../Modal/OtpModal";
import UserNavbar from '../../../Components/Navbar/UserNavbar'
import { toast } from "react-toastify";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [error,setError] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate()

  const handleEmailLogin = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)){
      setError(true)
      return
    }
    dispatch(emailAuth(email));
    setTimeout(() => {
      setShowModal(!showModal);
    }, 1000);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const token = codeResponse.access_token;
      dispatch(googleAuth(token));
    },
    onError: (error) => console.error("Login has Failed", error),
  });

  useEffect(()=>{
    if(userData?.message == 'Google Authentication SuccessFull'){
      toast('Logged In SuccessFully')
      navigate('/',{replace:true})
      return
    }else if(userData?.message === 'Otp Verification SucessFull'){
      toast('Loggedd In SucessFully')
    }
  },[userData?.message])

  return (
    <>
    <UserNavbar/>
  <div className="flex justify-center items-center mt-[3rem] bg-gradient-to-r from-white to-yellow-50 h-screen">
        <div className="w-[40vw] h-[70vh]  border-2 fl rounded-lg mt-6 shadow-xl border-[#] bg-gradient-to-t from-white to-yellow-50">
          <h1 className="text-center mt-8 font-medium text-lg text-[#4a4949]">
            Start Your Journey With Us
          </h1>
          <div className="flex justify-center items-center gap-6">
            <div className="">
              <div className="flex  border-[#4a4949] border-2 rounded-xl w-[20rem] h-12 mt-10 hover:border-black">
                <input
                  type="text"
                  className="border-none outline-none flex-grow rounded-xl pl-4"
                  placeholder="           Enter Your Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              {error && <p className="text-red-600 text-center">Enter Valid Email Address</p>}
              <button
                className="border-2  border-black rounded-xl w-[20rem] h-12 mt-9 hover:bg-[#F1D216] hover:text-black font-medium text-lg bg-white "
                onClick={(e) => handleEmailLogin(e)}
              >
                Continue
              </button>
              <button
                className="flex  border-black items-center justify-center border-2 rounded-xl w-[20rem] h-12 mt-9 gap-2 bg-white hover:bg-[#F1D216]"
                onClick={() => handleGoogleLogin()}
              >
                <FcGoogle className="w-6 h-6" />
                <span className="font-medium text-lg ">
                  Sign Up with Google
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignupForm;
