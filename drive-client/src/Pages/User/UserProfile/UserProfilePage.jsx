import React, { useEffect, useRef, useState } from "react";
import UserNavbar from "../../../Components/Navbar/UserNavbar";
import { BiUpload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { userProfileUpdate } from "../../../Features/User/userActions";
import { MdCancel } from "react-icons/md";

import { reset } from "../../../Features/User/userSlice";
import toast from "react-hot-toast";

function UserProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [isChange, setChange] = useState(false);

  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state.user);
  const profileImgRef = useRef(null);

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setProfileImg(user?.profileUrl ? user?.profileUrl : '');
  }, [user]);

  const handleProfileName = (e) => {
    setName(e.target.value);
    setChange(true);
  };

  const handleProfileEmail = (e) => {
    setEmail(e.target.value);
    setChange(true);
  };

  const handleProfilePhone = (e) => {
    setPhone(e.target.value);
    setChange(true);
  };
  const handleProfileUpload = () => {
    profileImgRef.current.click();
  };
  const uploadImg = (e) => {
   
    setProfileImg(e.target.files[0]);
    setChange(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10,}$/
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("phone", phone);
    form.append("profileImg", profileImg);
    form.append("userId", user?.id);
    if(name == ''){
      toast.error('Fill your Name')
    }else if(email == ''){
      toast.error('Fill Email Field')
    }else if(phone == ''){
      toast.error('fill phone field')
    }else if(!emailRegex.test(email)){
      toast.error('provide valid Email')
    }else if(!phoneRegex.test(phone)){
      toast.error('provide valid phone')
    }
      else{
      dispatch(userProfileUpdate(form));
    }
  };
  useEffect(() => {
    if (profileImg instanceof File) {
      const url = URL.createObjectURL(profileImg);
      setProfileUrl(url);
      return;
    } else {
      setProfileUrl(profileImg);
    }
  }, [profileImg]);
  

  useEffect(()=>{
    if(message === 'User Profile updated SuccessFully'){
      toast.success(message)
      dispatch(reset())
      return
    }

  },[message])

  return (
    <>
      <UserNavbar />
      <div className="flex flex-col items-center justify-center px-6 py-8 mt-20 mx-auto  lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-lg sm:max-w-xl xl:p-0 border border-yellow-300 bg-gradient-to-bl from-white to-yellow-50 mt-6">
          <div className="p-6 space-y-6 md:space-y-9 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              User Profile
            </h1>
            <form
              className="space-y-6"
              action=""
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="w-1/3">
                <label
                  htmlFor="licenseFrontImage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  profile Image
                </label>

                {profileImg  ? (
                  <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer hover:border-yellow-500 transition duration-200">
                    <img
                      src={profileUrl}
                      className="object-contain w-full h-full"
                      alt=""
                      onClick={handleProfileUpload}
                    />
                  </div>
                ) : (
                  <>
                    <div className="relative border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer hover:border-yellow-500 transition duration-200">
                      {profileImg === "" ? (
                        <>
                          <BiUpload
                            size={"44"}
                            className="text-gray-400 hover:text-yellow-500"
                            onClick={handleProfileUpload}
                          />
                          <span className="text-gray-400">Click to upload</span>
                        </>
                      ) : (
                        <>
                          <MdCancel
                            size={"30"}
                            onClick={() => {
                              setProfileImg("");
                            }}
                            className="absolute top-2 left-2 cursor-pointer"
                          />
                          <img
                            src={URL.createObjectURL(profileUrl)}
                            className="object-contain w-full h-full"
                            alt=""
                          />
                        </>
                      )}
                    </div>
                  </>
                )}
                <input
                  type="file"
                  ref={profileImgRef}
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={(e) => uploadImg(e)}
                />
              </div>
              <div>
                <label
                  htmlFor="license"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  UserName
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500"
                  value={name}
                  onChange={(e) => handleProfileName(e)}
                />
              </div>
              <div>
                <label
                  htmlFor="license"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Email
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500"
                  value={email}
                  onChange={(e) => handleProfileEmail(e)}
                />
              </div>
              <div>
                <label
                  htmlFor="license"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500"
                  value={phone}
                  onChange={(e) => handleProfilePhone(e)}
                />
              </div>

              {isChange && (
                <button
                  type="submit"
                  className="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;
