import  { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function DriverProtected({children}) {
 const {driver,token} =  useSelector((state)=>state.driver)

 const navigate = useNavigate()
 useEffect(()=>{
  if(!token && !driver?.isProfileCompleted && !driver?.isAccepted){
    console.log('level 1');
    navigate('/driver/login',{replace:true}) 
  }
  else if(!token && driver?.isProfileCompleted && !driver?.isAccepted){
    console.log('level 2');

    navigate('/driver/approval',{replace:true})
  }
  else if(!token && driver?.isProfileCompleted && driver?.isAccepted){
    console.log('level 3');

    navigate('/driver/login',{replace:true})
  }
  else if(driver?.editRequest && !driver?.isVerified){
    console.log('level 4');

    navigate('/driver/approval',{replace:true})
  }else if(driver?.isBlocked){
    console.log('level 5');

    navigate('/driver/login',{replace:true})
  }else if(!driver?.isAccepted){
    console.log(driver?.isAccepted);
    console.log('level 6');
    navigate('/driver/approval')
  }
 },[token,driver])
if(token){
  return children
}else{
  return null
}
}

export default DriverProtected
