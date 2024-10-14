import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Geocoder } from "@mapbox/search-js-react";
import { searchLocationContext } from "../../../Context/UserSearchContext";
import { UserPrivate } from "../../../Utils/Axios/userInterceptor";
import { seacrhNearByDriver } from "../../../Features/Trip/tripActions";
import { FaLocationArrow } from "react-icons/fa6";
import SuggesstionBox from "../SuggestionBox/SuggesstionBox";
import { toast } from "react-toastify";
import { searchAutoCompleteService } from "../../../Features/Trip/tripService";



function   SearchLocation({setSearch}) {
  const {
    selectPickupLocation,
    selectDropOffLocation,
    pickUpCoords,
    dropCoords,
    pickupLocation,
    dropLocation,
    setPickupLocation,
    setDropLocation
  } = useContext(searchLocationContext);

  const [isPickUpSuggestion, setPickupSuggestion] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { additionalSearchMetaData } = useSelector((state) => state.trip);
  const dispatch = useDispatch();
  const geoCoderTheme = {
    variables:{
      focus:'#F59E0B',
      outline:'none'
    }
  }
  const handlePickUpLocation = async (e) => {
    const { value } = e.target;
    setPickupLocation(value);
    setPickupSuggestion(true)
    try {
      const response = await searchAutoCompleteService(value)
      console.log(response.data);
      
      const data = response.data;
      setSuggestions(data?.searchResults);
    } catch (error) {
      console.error("Error fetching pickup location suggestions:", error);
    }
  };



  const handleResult = (result) => { 
    selectDropOffLocation(result?.geometry?.coordinates);
    setDropLocation(result?.properties?.full_address)
  };

  const handleSearchRide = (event) => {
    event.preventDefault();
    const formData = {
      userId: user?.id,
      pickupLocation: pickUpCoords,
      dropoffLocation: dropCoords,
    };

    dispatch(seacrhNearByDriver(formData));
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const response = await UserPrivate.get(
        `trip/users/pickup-location-autocomplete?search=${[
          pos?.coords?.longitude,
          pos?.coords?.latitude,
        ]}`
      );
      setPickupLocation(response.data?.searchResult?.properties?.full_address);
      selectPickupLocation([pos?.coords?.longitude, pos?.coords?.latitude]);
    },(err)=>{
      toast('Something Went Wrong! Unable to Fecth Location')
    });
  };

  useEffect(() => {
    if (additionalSearchMetaData) {
      setSearch(true);
      return
    } 
  }, [additionalSearchMetaData]);
  return (
    <>
      <div className="flex w-[35%]">
        <div className="mt-[7rem] ml-[2rem]  ">
          <div className="w-[100%] h-auto p-3  shadow-xl border-2 border-yellow-500 rounded-lg bg-white flex flex-col gap-3">
            <h1 className="font-bold text-2xl   text-gray-700">Start Ride</h1>
            <form action="" onSubmit={handleSearchRide}>
              <div className="flex flex-col w-full max-w-md mx-auto relative">
                <label
                  htmlFor="pickup"
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Pickup Location
                </label>
                <div className="flex h-10 items-center border-2 border-gray-300 rounded-md  overflow-hidden shadow-sm focus-within:border-yellow-500 transition duration-200">
                  <input
                    type="text"
                    id="pickup"
                    placeholder="Enter pickup location"
                    className="w-full h-10 px-4  text-black font-normal outline-none  flex-1 placeholder-black"
                    value={pickupLocation}
                    onChange={handlePickUpLocation}
                  />
                  <button
                    type="button"
                    className="h-9 w-9 text-black flex items-center justify-center focus:text-blue-600 transition duration-200"
                    onClick={handleCurrentLocation}
                  >
                    <FaLocationArrow />
                  </button>
                </div>

                {isPickUpSuggestion && (
                  <SuggesstionBox
                    suggestions={suggestions}
                    setPickupLocation={setPickupLocation}
                    setSuggestions={setSuggestions}
                    setPickupSuggestion={setPickupSuggestion}
                  />
                )}
              </div>
              <div className="flex flex-col relative mt-3">
                <label
                  htmlFor="dropoff"
                  className="text-sm font-medium text-gray-600 mb-2"
                >
                  Dropoff Location
                </label>
                <Geocoder
                  value={dropLocation}
                  placeholder="Dropoff Location"
                  onRetrieve={handleResult}
                  theme={geoCoderTheme}
                  options={{
                    proximity:pickUpCoords,
                    country:'in'
                  }}
                  accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-yellow-400 mt-4 text-white font-semibold rounded-md hover:bg-yellow-500 focus:bg-yellow-600 transition duration-200"
              >
                Search Ride
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchLocation;
