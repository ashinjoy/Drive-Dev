import React from 'react';
// import { XIcon } from '@heroicons/react/solid'; // You can use any icon library or SVG

const RideRequestToast = () => {
  return (
    <div className="flex items-start bg-white p-4 rounded-lg shadow-lg w-full">
      <div className="flex-grow">
        <p className="text-lg font-semibold text-gray-800">Confirm Action</p>
        <p className="text-sm text-gray-600 mt-1">
          Are you sure you want to proceed with this action?
        </p>
        <div className="flex justify-end space-x-3 mt-3">
          <button 
            // onClick={onReject} 
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded"
          >
            Reject
          </button>
          <button 
            // onClick={onAccept} 
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded"
          >
            Accept
          </button>
        </div>
      </div>
      <button  className="ml-4 mt-1 text-gray-400 hover:text-gray-500 focus:outline-none">
        {/* <XIcon className="w-5 h-5" /> */}
      </button>
    </div>
  );
};

export default RideRequestToast;
