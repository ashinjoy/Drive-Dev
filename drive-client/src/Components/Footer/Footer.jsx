import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
function Footer() {
  return (
    <>
    <div className='flex flex-col md:flex-row justify-around h-auto p-6'>
      <div className='flex flex-col gap-3'>
        <h1 className='text-lg font-bold'>Basic Info</h1>
        <a href="/" className='hover:text-yellow-500'>Home</a>
        <a href="/" className='hover:text-yellow-500'>About Us</a>
        <a href="/" className='hover:text-yellow-500'>Contact Us</a>
      </div>

      <div className='flex flex-col gap-3'>
        <h1 className='font-bold text-lg'>Our Services</h1>
        <a href="/" className='hover:text-yellow-500'>Start Your Ride</a>
        <a href="/" className='hover:text-yellow-500'>Join as Driver</a>
        <a href="/" className='hover:text-yellow-500'>Book a Ride</a>


      </div>

      <div className='mt-4'>
        <h1 className='font-bold text-lg'>Follow Us</h1>
        <div className='flex gap-2'>
          <a href="/"><FaLinkedin/></a>
          <a href="/"><FaGithub/></a>
          <a href="/"><FaGithub/></a>
          <a href="/"><FaGithub/></a>
          <a href="/"><FaGithub/></a>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Footer
