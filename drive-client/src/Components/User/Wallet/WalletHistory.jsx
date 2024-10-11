import React, { useEffect, useState } from "react";
import { getWalletHistoryService } from "../../../Features/User/userService";
import { useSelector } from "react-redux";
import Pagination from '@mui/material/Pagination';

function WalletHistory({userType, walletHistory, setWalletHistory }) {
  const { user } = useSelector((state) => state.user);
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPages,setTotalPage] = useState(null)

  const handleChange = (evt,value)=>{  
  setCurrentPage(value)
  }
  useEffect(()=>{
    if(userType === 'user'){
      const getWalletHistory = async () => {
        const response = await getWalletHistoryService({userId:user?.id,page:currentPage});
        setWalletHistory(response?.getHistory);
        const TotalPages = Math.ceil(response?.totalDocs/10)
        setTotalPage(TotalPages)
      };
      getWalletHistory();
      return
    }

  },[currentPage])
  return (
    <>
<div className="fixed top-[8rem] right-12 w-[60rem] h-[75dvh] bg-white p-6 shadow-xl rounded-lg  overflow-auto border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Wallet History</h1>
      
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
          {walletHistory && walletHistory.map((transaction) => (
            <tr key={transaction._id} className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 text-sm text-gray-600">{new Date(transaction.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{transaction.description}</td>
              <td
                className={`px-6 py-4 text-sm ${
                  transaction.amount > 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {transaction.amount}
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
      <Pagination count={totalPages || 1}           
        page={currentPage}
        onChange={handleChange}
        color="primary"/>
      </table>
    </div>
    </>
  );
}

export default WalletHistory;
