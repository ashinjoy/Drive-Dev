import { useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rideOngoing } from "../Features/Trip/tripActions";

function TripProtectedRoute({ children }) {
  const { tripDetail } = useSelector((state) => state.trip);
  const {user} = useSelector(state =>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate(); 
  useEffect(() => {
    if (tripDetail) {
      console.log('inside triop');
      
      navigate("/trip");
      return;
    }
    dispatch(rideOngoing(user?.id))
  }, [tripDetail]);

  if (!tripDetail) {
    return children;
  }
}

export default TripProtectedRoute;
