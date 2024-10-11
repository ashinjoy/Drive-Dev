import React, { useContext } from 'react'
import { searchLocationContext } from '../../../Context/UserSearchContext';
import { IoLocationSharp } from "react-icons/io5";


function SuggesstionBox({suggestions,setSuggestions,setPickupSuggestion,setPickupLocation,setPickUpCoords}) {
     const {selectPickupLocation}= useContext(searchLocationContext)
    const selectLocation = (location)=>{
        setPickupLocation(location?.properties?.name);

        console.log('peopertirs',location?.properties);
        selectPickupLocation(location?.geometry?.coordinates)
        setSuggestions([]);
         setPickupSuggestion(null)
    }
  return (
<div className='absolute top-20 left-0  w-full border-2 border-gray-300 shadow-lg bg-white rounded-md z-20 overflow-y-auto max-[20rem] max-h-[20rem]'>
            <ul>
            {
              suggestions && suggestions.length > 0 && suggestions.map((location)=>{
             return <li className='flex items-center p-3 gap-4 border-b cursor-pointer hover:bg-gray-100 ' key={location.id} onClick={() => { selectLocation(location); }}>
              <IoLocationSharp size={24}  />
        <div className='flex flex-col'>
        <div className='text-md font-semibold text-gray-900'>
        {location?.properties?.name_preferred || 'Unnamed Location'}
        </div>
        <div className='text-sm text-gray-600'>
      {location?.properties?.place_formatted || 'Address not available'}
        </div>
    </div>
    </li>

              })
            }
              
            </ul>
</div>
  )
}

export default SuggesstionBox