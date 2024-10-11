import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {getWalletBalance, addMoneyToWalletService } from '../../../Features/User/userService';


function WalletCard({component,setWalletHistory}) {
  const [balance,setBalance] = useState(0)
  const [amount,setAmount] = useState('')
  const {user} = useSelector(state=>state.user)
  useEffect(()=>{
    if(component === 'userBalance'){
      const getBalance = async()=>{
          const response =  await getWalletBalance(user?.id)
          console.log(response?.balance);
          setBalance(response?.balance)
      }
      getBalance()
      return
    }
  },[])
  const handleAddMoney = async()=>{
    const data = {
      userId :user?.id,
      amount:amount
    }
  const response  =  await addMoneyToWalletService(data)
  console.log(response);  
  if(response.stripeSession.url){
    window.location.href = response.stripeSession.url
  }
  setWalletHistory((prev)=>[...prev,response.walletHistory])
  setAmount('')
  }


  return (
    <div className="w-[25dvw] h-[30dvh] border-2 border-gray-300 bg-white shadow-lg  rounded-lg p-6">
    <h1 className="font-semibold text-2xl text-gray-800">
      {component === 'addMoney' ? 'Add Money' : balance}
    </h1>
    
    {component === 'addMoney' && (
      <div className="mt-4">
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount"
        />
        <button
          onClick={handleAddMoney}
          className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Money
        </button>
      </div>
    )}
    
    {component !== 'addMoney' && (
      <p className="font-normal text-lg text-gray-600 mt-3">
        Your Current Balance
      </p>
    )}
  </div>

  )
}

export default WalletCard