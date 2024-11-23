import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { reviewRatings } from "../../../Features/User/userActions";
import { resetTripDetails } from "../../../Features/Trip/tripSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { reset } from "../../../Features/User/userSlice";


function ReviewRating({setReviewModal}) {
  const [stars,setStars] = useState(new Array(5).fill(0))
  const [selectedStar, setSelectedStar] = useState(0);
  const [review,seteReview] = useState('')
const {tripDetail}  =  useSelector(state=>state.trip)
const {message} = useSelector(state=>state.user)
const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleRating = (evt) => {
    const index = parseInt(evt.target.id);
    setSelectedStar(index);
    const filledStars = stars.map((el,i)=>(i<=index ? 1 : 0 ))
   
    setStars(filledStars)
 
  };
useEffect(()=>{
console.log('messagfe',message);

},[message])
  const handleReviews = (e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('rating',selectedStar)
    formData.append('review',review)
    formData.append('userId',tripDetail?.userId)
    formData.append('driverId',tripDetail?.driverId)
    formData.append('tripId',tripDetail?._id)
    if(selectedStar === 0  || review.trim() === ''){
      toast.error('Rate Your Trip ')
      return
    }
    dispatch(reviewRatings(formData))
  }

  useEffect(()=>{
    console.log("meee",message);
    
    if(message  === "review sucess"){
      dispatch(resetTripDetails())
      dispatch(reset())
      setTimeout(()=>{
        navigate('/search-ride')
      },2000)
      setReviewModal(false)
      return
    }
  },[message])


  return createPortal(
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="flex flex-col items-center justify-between bg-white border-2 border-yellow-400 w-full max-w-lg h-auto p-8 rounded-xl shadow-lg transform transition-transform duration-300 ease-in-out scale-100">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Rate Your Trip
          </h1>
          <form className="w-full flex flex-col justify-around items-center space-y-6" onSubmit={handleReviews}>
            <div className="flex w-full justify-center gap-2">
              {stars && stars.length > 0 && stars.map((el, idx) => {
                if (el === 1) {
                  return (
                    <GoStarFill
                      key={idx}
                      size="2rem"
                      id={idx}
                      onClick={handleRating}
                      className="text-yellow-400 cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"
                    />
                  );
                } else {
                  return (
                    <GoStar
                      key={idx}
                      size="2rem"
                      id={idx}
                      onClick={handleRating}
                      className="text-yellow-400 cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"
                    />
                  );
                }
              })}
            </div>

            <textarea
              placeholder="Tell us about your experience..."
              className="border-2 border-gray-300 rounded-lg w-full h-28 p-3 text-gray-700 focus:outline-none focus:border-yellow-400 transition-colors duration-200"
              onChange={(e)=>seteReview(e.target.value)}
            />

            <div className="flex w-full justify-center gap-6 mt-4">
              <button
                type="button"
                className="bg-gray-300 text-gray-800 p-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200 ease-in-out"
              >
                Skip
              </button>
              <button
                type="submit"
                className="bg-yellow-400 text-black p-2 px-4 rounded-md hover:bg-yellow-500 transition-colors duration-200 ease-in-out"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("review-modal")
  );
}

export default ReviewRating;
