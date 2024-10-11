import { useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { MdMyLocation } from 'react-icons/md';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';
import { createPortal } from 'react-dom';

const LocationModal = ({ isOpen, setModal }) => {

  const handleAllow = () => {
    console.log('entry');
    navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position.coords);
    })
    
  };

  const handleReject = () => {
   
  };

  return createPortal (
    <>
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal"
      unmountOnExit
    >
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-75 z-40">
        <div className="flex flex-col items-center justify-around bg-white border-4 border-yellow-400 w-1/3 h-1/2 p-6 rounded-lg shadow-xl relative transform transition-transform">
          <FaWindowClose
            className="absolute top-4 right-4 text-gray-600 cursor-pointer"
            onClick={()=>setModal(false)}
          />
          <MdMyLocation size={'6rem'} className="text-yellow-400 mb-4"/>
          <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">Allow Drive To Access Your Application</h3>
       
            <>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors mb-2"
                onClick={handleAllow}
              >
                Allow
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition-colors"
                onClick={handleReject}
              >
                Reject
              </button>
            </>
          
        </div>
      </div>
    </CSSTransition>
    </>, document.getElementById("modal")
  );
};

export default LocationModal;
