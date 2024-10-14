import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [viewState, setViewState] = useState({
    latitude: 76.2673,
    longitude: 9.9312,
    zoom: 12,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setViewState((prev) => ({
            ...prev,
            latitude: pos?.coords?.latitude,
            longitude: pos?.coords?.longitude,
            zoom: 12,
          }));
        },
        (err) => console.error(err),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
    }
  }, []);
  return [viewState, setViewState];
};

export default useGeolocation;
