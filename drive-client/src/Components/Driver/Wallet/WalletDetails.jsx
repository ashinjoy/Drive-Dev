import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDriverWalletDetailService } from '../../../Features/Driver/driverService';
import { Pagination } from '@mui/material';
function WalletDetails() {
  const [totalPages,setTotalPages] = useState(null)
  const [currentPage,setCurrentPage] = useState(1)
  const [walletDetails,setWalletDetails] = useState({
    walletBalance:0,
    walletHistory:[]
  })
  const {driver} = useSelector(state=>state.driver)

  const handleChange =(evt,value)=>{
setCurrentPage(value)
  }
   useEffect(()=>{
    const getDriverWalletDetails = async ()=>{
    const response =   await getDriverWalletDetailService({driverId:driver?.id,page:currentPage})
    console.log("response from api call",response);
    
    setWalletDetails((prev)=>({
      ...prev,
      walletBalance:response.data?.driverBalance,
      walletHistory:response.data?.driverWalletHistory
    }))
setTotalPages(Math.ceil(response?.data?.totalDocs/10))
    }
    getDriverWalletDetails()

  },[currentPage])

  useEffect(()=>{
    console.log(totalPages);
    
  })



  return (
<div className="fixed top-[1rem] left-[20%] w-[70rem] h-[95dvh] bg-white p-6 shadow-xl rounded-lg overflow-auto  border border-gray-200">
      <div className='flex justify-between'>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Wallet History</h1>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Balance:{walletDetails ? Math.ceil(walletDetails?.walletBalance) : 0}</h1>

      </div> 
      <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {walletDetails && walletDetails?.walletHistory && walletDetails?.walletHistory.map((transaction) => (
            <tr key={transaction._id} className="hover:bg-gray-50 transition-colors duration-200"> 
               <td className="px-6 py-4 text-sm text-gray-600">{new Date(transaction.createdAt).toLocaleDateString()}</td> 
               <td className="px-6 py-4 text-sm text-gray-600">{transaction.description}</td> 
               <td
                className={`px-6 py-4 text-sm ${
                  transaction.amount > 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {Math.ceil(transaction.amount)}
              </td>
              <td
                className={`px-6 py-4 text-sm ${
                  transaction.type === "credit" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {transaction.type}
              </td>
            </tr>
          ))} 
        </tbody>
      </table>
      <Pagination count={totalPages || 1}           
        page={currentPage}
        onChange={handleChange}
        color="primary"/>
    </div>

  )
}

export default WalletDetails