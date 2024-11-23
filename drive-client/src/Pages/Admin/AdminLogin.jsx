import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { resetAdminState } from "../../Features/Admin/adminSlice";
import { adminLogin } from "../../Features/Admin/adminActions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AdminLogin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, message } = useSelector((state) => state.admin);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
    };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      formData.name === "" &&
      formData.email === "" &&
      formData.password === ""
    ) {
      toast.error("Fill all Fields");
    } else if (formData.name === "") {
      toast.error("Provide Name");
    } else if (formData.email === "") {
      toast.error("Provide Email");
    } else if (!emailRegex.test(formData.email)) {
      toast.error("Please Enter valid Email");
    } else if (formData.password === "") {
      toast.error("provide valid Password");
    } else {
      dispatch(adminLogin(formData));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAdminState());
      return;
    } else if (success) {
      toast.error(message);
      setTimeout(() => {
        navigate("/admin/home", { replace: true });
      }, 1000);
    }
  }, [error, success]);
  return (
    <>
  <section className="bg-gray-100 flex justify-center items-center min-h-screen px-4 sm:px-0">
  <div className="w-full max-w-sm sm:max-w-md bg-yellow-50 rounded-lg shadow-lg ">
    <div className="p-6 space-y-6 md:space-y-8 sm:p-8">
      <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-black sm:text-3xl">
        Admin Login
      </h1>
      <form
        className="space-y-6 md:space-y-5"
        action=""
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-600 focus:border-yellow-600 outline-none"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-600 focus:border-yellow-600 outline-none"
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
            className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-600 focus:border-yellow-600 outline-none"
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
</section>

    </>
  );
}

export default AdminLogin;
