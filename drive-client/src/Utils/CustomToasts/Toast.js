// import React from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

function Toast() {
  return (
    <Toaster position="bottom-right" reverseOrder={false}  />

    // <ToastContainer
    //   position="bottom-right"
    //   autoClose={3000}
    //   hideProgressBar={false}
    //   newestOnTop
    //   closeOnClick
    //   rtl={false}
    //   pauseOnFocusLoss
    //   draggable
    //   pauseOnHover
    //   theme="dark"
    // />
  );
}

export default Toast;
