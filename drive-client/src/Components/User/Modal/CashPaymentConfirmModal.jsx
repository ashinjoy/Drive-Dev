import React from 'react'
import { createPortal } from 'react-dom'
import { IoWarning } from "react-icons/io5";

function CashPaymentConfirmModal({setPaymentMethod,setCashPaymentModal}) {
    const handleCashPayment =()=>{
        setPaymentMethod('Cash')
        setCashPaymentModal(false)
    }
    const handleCancel =()=>{
        setPaymentMethod('Online-Payment')
        setCashPaymentModal(false)
    }
    return createPortal(
        <>
   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div className="flex flex-col items-center justify-between bg-white border-2 border-yellow-400 w-full max-w-lg h-auto p-8 rounded-xl shadow-lg transform transition-transform duration-300 ease-in-out scale-95">
    <IoWarning className="text-yellow-400" size="6rem" />
    <h1 className="text-2xl font-semibold mt-4 mb-2 text-gray-800">
      Cash Payment Confirmation
    </h1>
    <p className="text-center text-gray-600 leading-relaxed mb-6">
      You’ve selected Cash. Once the ride is accepted or started, this payment method cannot be changed. Please ensure you have the required amount ready.
    </p>
    
    <div className="flex space-x-4">
      <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-200" onClick={handleCashPayment}>
        Confirm
      </button>
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded-full transition-all duration-200" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  </div>
</div>
</>,document.getElementById('cash-modal')
    )
  
}

export default CashPaymentConfirmModal
