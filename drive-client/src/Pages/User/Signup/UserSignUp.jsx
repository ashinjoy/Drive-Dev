import React from "react";
import { useNavigate} from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleAuth, emailAuth } from "../../../Features/User/userActions";
import UserNavbar from "../../../Components/Navbar/UserNavbar";
import OtpModal from '../../../Components/User/Modal/OtpModal'


function SignupForm() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [err,setErr] = useState('')
  const dispatch = useDispatch();
  const {message,error} = useSelector((state) => state.user);
  const navigate = useNavigate()

  

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailLogin = (e) => {

    if(email == ''){
     setErr('please enter your mail')
      return
    }else if(!emailRegex.test(email)){
     setErr('please enter valid email')
      return
    }
    dispatch(emailAuth(email));
    setTimeout(() => {
      setShowModal(!showModal);
    }, 1000);
  };


  //code for handling google login
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const token = codeResponse.access_token;
      dispatch(googleAuth(token));
    },
    onError: (error) => console.error("Login has Failed", error),
  });

  useEffect(()=>{
    if(message == 'Google Authentication SuccessFull'){
      setTimeout(()=>{
        navigate('/',{replace:true})
      },1000)
      return
    }else if(error === 'You are Currently blocked by the Admin'){
      toast('Your Account has been temporarily Suspended ')
      return
    }else if(error === 'Your Google Account is not Verified'){
      toast('Your Google Account is not Verified')
      return
    }

  },[message,error])

  const handleEmailInput =(e)=>{
    setEmail(e.target.value)
    if(!emailRegex.test(e.target.value)){
      setErr('please enter valid email')
      return
    }
    setErr('')
  }
  return (
    <>
    <UserNavbar/>
    <div className=" flex justify-center items-center h-screen bg-gray-100">
  <div className="w-[90%] max-w-md border rounded-xl shadow-xl bg-white">
    
    <h1 className="text-center mt-8 font-bold text-3xl text-gray-800">
      Join Us Today
    </h1>
    <p className="text-center text-gray-500 mt-4">
      Start your journey with a quick signup.
    </p>

    {showModal && <OtpModal email={email} setShowModal = {setShowModal}/> }
   
    <div className="flex justify-center items-center mt-8">
      <div className="w-[85%] flex flex-col items-center">
       
        <div className=" w-full mt-6">
          <input
            type="text"
            className="border border-gray-300 w-full rounded-lg h-12 pl-4 pr-4 text-gray-700 outline-none transition-all focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmailInput}
          />
          <p className="text-red-600 text-sm font-normal">{err}</p>
        </div>

        
        <button
          className="mt-6 w-full h-12 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition-all"
          onClick={handleEmailLogin}
        >
          Continue
        </button>

        
        <div className="relative w-full flex items-center mt-6">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

       
        <button
          className="mt-4 w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="w-6 h-6" />
          <span className="text-gray-700 font-semibold">Sign Up with Google</span>
        </button>

        <p className="text-sm text-gray-500 mt-8 text-center">
          By continuing, you agree to our <a href="#" className="text-yellow-500 hover:underline">Terms of Service</a> and <a href="#" className="text-yellow-500 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
export default SignupForm;
