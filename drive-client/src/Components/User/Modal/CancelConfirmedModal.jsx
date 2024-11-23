
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

function CancelConfirmedModal({setCancelConfirmModal}) {
  const navigate = useNavigate()
  const handleNavigate = ()=>{
    navigate('/')
  }
  

  return createPortal(
    <>
  <div className='fixed inset-0 flex justify-center items-center bg-slate-900 bg-opacity-75 z-40 transition-opacity duration-300 ease-in-out'>
  <div className="flex flex-col w-[90%] max-w-md h-auto rounded-lg bg-white shadow-lg p-8 items-center gap-6 relative transition-transform transform scale-100 ease-out duration-300 border-2 border-red-500">

    <div className="w-16 h-16 bg-red-100 rounded-full flex justify-center items-center mb-4">
      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </div>

    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Ride Cancelled</h2>
      <p className="text-gray-600 text-base leading-relaxed">
        We're sorry for the inconvenience. Your ride has been successfully cancelled. Let us know how we can improve your experience.
      </p>
    </div>

    <div className="flex w-full justify-center gap-4 mt-4">
      <button
        className='text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200 ease-in-out focus:outline-none'
        onClick={() => handleNavigate()}
      >
        Return to Home
      </button>

    </div>

    <button
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
      onClick={() => setCancelConfirmModal(false)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

  </div>
</div>

    </>,document.getElementById('cancel-modal')
  )
}

export default CancelConfirmedModal
