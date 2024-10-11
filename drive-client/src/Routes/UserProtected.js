import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserProtected({ children }) {
  const {user,token} = useSelector((state) => state.user);
  const navigate = useNavigate();  
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return
    }
    if(user?.isBlocked){
      navigate('/login',{replace:true})
      return
    }
  }, [token,user]);

  if (token && user) {
    return children;
  } else {
    return null;
  }
}

export default UserProtected;
