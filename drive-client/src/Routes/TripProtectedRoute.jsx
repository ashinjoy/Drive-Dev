import { useEffect,  } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TripProtectedRoute({ children }) {
  const { tripStatus } = useSelector((state) => state.trip);
  const navigate = useNavigate(); 
  useEffect(() => {
    if (tripStatus) {
      navigate("/trip");
      return;
    }
  }, [tripStatus]);

  if (!tripStatus) {
    return children;
  }
}

export default TripProtectedRoute;
