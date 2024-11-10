import  { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function DriverProtected({children}) {
 const {driver,token} =  useSelector((state)=>state.driver)

 const navigate = useNavigate()
 useEffect(()=>{
  if(!driver?.isProfileCompleted){
    navigate('/driver/complete-profile',{replace:true})
    return
  }
  if(!driver?.isAccepted){
    navigate('/driver/approval')
  }
  if(!token || driver?.isBlocked  || !driver.isVerified){
    navigate('/driver/login',{replace:true})
    return
  }
  // if(!token && !driver?.isProfileCompleted && !driver?.isAccepted){
    
  //   navigate('/driver/login',{replace:true}) 
  // }
  // else if(!token && driver?.isProfileCompleted && !driver?.isAccepted){
    

  //   navigate('/driver/approval',{replace:true})
  // }
  // else if(!token && driver?.isProfileCompleted && driver?.isAccepted){
    

  //   navigate('/driver/login',{replace:true})
  // }
  // else if(driver?.editRequest && !driver?.isVerified){
   

  //   navigate('/driver/approval',{replace:true})
  // }else if(driver?.isBlocked){
   

  //   navigate('/driver/login',{replace:true})
  // }else if(!driver?.isAccepted){
    
  //   navigate('/driver/approval')
  // }
 },[token,driver])
if(token){
  return children
}else{
  return null
}
}

export default DriverProtected
