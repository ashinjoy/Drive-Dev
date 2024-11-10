import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../Components/Driver/Modal/OtpModal";
import UserNavbar from "../../../Components/Navbar/UserNavbar";
import { registerDriver } from "../../../Features/Driver/driverActions";
import { resestAll } from "../../../Features/Driver/driverSlice";
import { Link } from "react-router-dom";

function SignupPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showModal, setModal] = useState(false);
  const [errInfo, setErrorInfo] = useState({});
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.driver);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{10}$/;
  const passwordRegex = /^.{8,}$/;
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (
      formState.name.trim() === "" &&
      formState.email.trim() === "" &&
      formState.phone.trim() === "" &&
      formState.password.trim() === ""
    ) {
      toast("Please fill All fields");
    } else if (formState.name.trim() == "") {
      toast("Please Enter your Name");
    } else if (formState.email.trim() === "") {
      toast("Please Enter your Email");
    } else if (!emailRegex.test(formState.email)) {
      console.log("formstateEmaail", formState.email);
      toast("Please Enter a Valid Email");
    } else if (formState.phone.trim() === "") {
      toast("please Enter valid Phone");
    } else if (!phoneRegex.test(formState.phone)) {
      toast("Please Enter Valid Phone");
    } else if (formState.password.trim() === "") {
      toast("Please Enter valid paswword");
    } else if (!passwordRegex.test(formState.password)) {
      toast("Password must contain minimum of 8 characters");
    } 
    else {
      dispatch(registerDriver(formState));
    }

  };

  const validateInputs = (e) => {
    if (e.target.id === "name"){
      setFormState({ ...formState, name: e.target.value });
      if (e.target.value.trim() == "") {
        setErrorInfo({ ...errInfo, name: "Please Enter Your Name" });
      } else {
        setErrorInfo({ ...errInfo, name: "" });
      }
      return
    }
      if (e.target.id === "email") {
      setFormState({...formState,email:e.target.value});
      if(e.target.value.trim() == ""){
        setErrorInfo({ ...errInfo, email: "Please Enter Your Email" });
        
      }else if(!emailRegex.test(e.target.value)){
        setErrorInfo({...errInfo,email:'please Enter Valid Email'})
        
      }else{
        setErrorInfo({...errInfo,email:''})
      }
      return
    }
    if(e.target.id === "phone"){
      setFormState({...formState,phone:e.target.value})
      if(e.target.value.trim() === ""){
        setErrorInfo({...errInfo,phone:'Please Enter Your Phone Number'})
      }else if(!phoneRegex.test(e.target.value)){
        setErrorInfo({...errInfo,phone:'Please Enter Valid Phone Number'})
      }else{
        setErrorInfo({...errInfo,phone:''})
      }
      return
    }
    if(e.target.id === "password"){
      setFormState({...formState,password:e.target.value})
      if(e.target.value.trim() === ""){
        setErrorInfo({...errInfo,password:"Enter Password"})
      }else if(!passwordRegex.test(e.target.value)){
        setErrorInfo({...errInfo,password:'Password must consist of 8 Characters'})
      }else{
        setErrorInfo({...errInfo,password:''})
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast(error);
      dispatch(resestAll());
      return;
    } else if (success) {
      setModal(true);
      dispatch(resestAll());
    }
  }, [error, success]);

  return (
    <>
      {/* <UserNavbar /> */}
      {showModal && (
        <Modal email={formState.email} setShowModal={setModal} role="driver" />
      )}
      <section className="flex justify-center items-center bg-[#F5F5F5] min-h-screen">
        {/* <div className=" flex flex-col items-center justify-center px-6 py-8  mx-auto md:h-screen lg:py-0 w-1/2 bg-white"> */}
          <div className=" w-full  bg-[#FFF8DC] rounded-lg shadow-2xl md:mt-16 sm:max-w-md xl:p-0 border border-[#BDBDBD]">
            <div className="p-6 space-y-6 md:space-y-8 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
                Join As a Driver
              </h1>
              <form
                className="space-y-6 md:space-y-5"
                action=""
                onSubmit={(event) => {
                  handleRegisterSubmit(event);
                }}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="border-2 outline-none text-gray-900 text-sm rounded-lg w-full p-3  focus:border-yellow-500 "
                    placeholder="Enter your name"
                    onChange={validateInputs}
                  />
                  <p className="text-red-600 text-sm">{errInfo.name}</p>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="border-2 outline-none text-gray-900 text-sm rounded-lg w-full p-3  focus:border-yellow-500 "
                    placeholder="Enter your email"
                    onChange={validateInputs}
                  />
                  <p className="text-red-600 text-sm">{errInfo.email}</p>

                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="border-2 outline-none text-gray-900 text-sm rounded-lg w-full p-3  focus:border-yellow-500 "
                    placeholder="Enter your phone number"
                    onChange={validateInputs}
                  />
                  <p className="text-red-600 text-sm">{errInfo.phone}</p>

                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="border-2 outline-none text-gray-900 text-sm rounded-lg w-full p-3  focus:border-yellow-500 "
                    placeholder="Enter your password"
                    onChange={validateInputs}
                  />
                  <p className="text-red-600 text-sm">{errInfo.password}</p>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#FFC107] hover:bg-[#FFB300] focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition duration-200 ease-in-out shadow-lg hover:shadow-xl"
                >
                  Create an account
                </button>
              </form>
              <div className="w-full flex gap-1 items-center ">
                <span>Already have an account ?</span>
              <Link to='/driver/login' className="block  text-base font-medium text-blue-400">Login</Link>
              </div>   
            </div>
          </div>
        {/* </div> */}
      </section>
    </>
  );
}

export default SignupPage;
