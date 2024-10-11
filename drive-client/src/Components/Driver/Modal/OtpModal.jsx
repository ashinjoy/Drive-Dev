import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { verifyDriverOtp ,resendDriverOtp} from "../../../Features/Driver/driverActions";
import { toast } from "react-toastify";

function OtpModal({ email, setShowModal }) {
  const [otpInp, setOtp] = useState(new Array(4).fill(""));
  const otpBoxReference = useRef([]);
  const [enableButton, setEnable] = useState(true);
  const [resendOtpEnable, setResendOtpEnable] = useState(true);
  const [timer, setTimer] = useState(60);
  const [restartTimer, setTimerRestart] = useState(false);
  const { user, error, message } = useSelector((state) => state.driver);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e, currIndex) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      const newInp = [...otpInp];
      newInp[currIndex] = inputValue;
      setOtp(newInp);
      if (e.target.value && currIndex < 3) {
        otpBoxReference.current[currIndex + 1].focus();
      }
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (message === "Otp Verification SucessFull") {
      navigate("/driver/complete-profile", { replace: true });
    }
  }, [message]);

  

  useEffect(() => {
    const allInp = otpInp.every((otp) => otp !== "");
    setEnable(!allInp);
  }, [otpInp]);

  useEffect(() => {
    let timer = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          setResendOtpEnable(false);
          return 0;
        }
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (!resendOtpEnable) {
      let interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            // setResendOtpEnable(true)
            return 0;
          }
        });
      }, 1000);
    }
  }, [restartTimer]);
  


  const handleOtpVerification = () => {
    const otp = otpInp.join("");
      dispatch(verifyDriverOtp(otp));
    setOtp(new Array(4).fill(""));
    console.log('message',message);
    if (message === "Otp Verification SucessFull") {
      navigate("/");
    }
  };

  // useEffect(()=>{
  //   if(!error){
  //     return
  //   }
  //   toast(error)
  // },[error])

  const handleResendOtp = () => {
    setTimer(60);
    setTimerRestart(!restartTimer);
    dispatch(resendDriverOtp(email));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return createPortal(
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-75 z-40">
        <div className="flex flex-col items-center justify-around bg-white border-4 border-yellow-400 w-1/3 h-1/2 p-6 rounded-lg shadow-xl relative">
          <FaWindowClose
            className="absolute top-4 right-4 text-gray-600 cursor-pointer"
            onClick={closeModal}
          />
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center border-4 border-black rounded-full w-20 h-20 mb-4">
              <h1 className="text-2xl font-bold text-red-700">
                {`0:${timer.toString().length === 2 ? timer : "0" + timer}`}
              </h1>
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Please Enter Your OTP
            </h1>
            <div className="flex gap-3 mb-4">
              {otpInp.map((inp, index) => (
                <input
                  type="tel"
                  key={index}
                  value={inp}
                  maxLength={1}
                  ref={(ref) => (otpBoxReference.current[index] = ref)}
                  className="w-12 h-12 text-center text-xl border-2 border-yellow-400 shadow-md outline-none rounded-md p-2"
                  onChange={(e) => handleInput(e, index)}
                />
              ))}
            </div>
            <div className="flex gap-4">
              <button
                className="text-lg bg-yellow-400 rounded-md px-4 py-2 shadow-md hover:bg-yellow-500 transition-colors disabled:opacity-50"
                onClick={handleResendOtp}
                disabled={resendOtpEnable}
              >
                Resend
              </button>
              <button
                className="text-lg bg-yellow-400 rounded-md px-4 py-2 shadow-md hover:bg-yellow-500 transition-colors disabled:opacity-50"
                onClick={handleOtpVerification}
                disabled={enableButton}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("otp-modal")
  );
}

export default OtpModal;
