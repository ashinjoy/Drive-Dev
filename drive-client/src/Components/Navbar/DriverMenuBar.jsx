import React, { useEffect } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function DriverMenuBar() {
    const {token} = useSelector(state=>state.driver)
  return (
    <nav className='fixed top-0 flex flex-row justify-between  h-[6rem] drop-shadow-lg w-[100vw] 9 bg-white z-40 border'>
    <div className='ml-10 w-44'>
      <img src="/assets/logo-cl.png" alt="drive logo" className='w-full h-full object-contain'/>
    </div>
    <div className='hidden md:flex  text-sm lg:text-lg items-center gap-x-16 tracking-wider'>
     
    </div>
    <div className='hidden md:flex text-sm lg:text-lg items-center mr-16'>
    {token ?
     <NavLink to={`/driver/profile`}><BiUserCircle size={'28px'}/></NavLink>: 
   <NavLink to='/login'className={'text-lg font-medium leading-tight'}>Login</NavLink>
   } 
    </div> 
  </nav>
  )
}

export default DriverMenuBar
