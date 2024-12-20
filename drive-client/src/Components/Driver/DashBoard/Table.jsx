import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getTopTripsService, latestTripService } from '../../../Features/Driver/driverService'

function Table({type}) {
    const [tableData,setTableData] = useState(null)
    const {driver} = useSelector(state=>state.driver)
    useEffect(()=>{
        const getData = async()=>{
            if(type == "topTrips"){
           const response = await getTopTripsService(driver?.id)
           setTableData(response?.data)
            return
            }
            if(type == "latestTrips"){
                const response = await latestTripService(driver?.id)
                setTableData(response.data)
            }
        }
        getData()

    },[])
  return (
    <table className="w-[70dvw] table-auto rounded-lg  shadow-md">
  <thead className="bg-gradient-to-r from-yellow-200 to-yellow-100 text-gray-800">
    <tr>
      <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
      <th className="px-6 py-3 text-left text-sm font-semibold">Pickup Location</th>
      <th className="px-6 py-3 text-left text-sm font-semibold">Drop Location</th>
      <th className="px-6 py-3 text-left text-sm font-semibold">Fare</th>
      <th className="px-6 py-3 text-left text-sm font-semibold">Distance (km)</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {tableData && tableData.length > 0 && tableData.map((data) => (
      <tr className="hover:bg-yellow-50 transition-colors duration-200" key={data._id}>
        <td className="px-6 py-4 text-sm text-gray-600">{data?.userId?.name}</td>
        <td className="px-6 py-4 text-sm text-gray-600">{data?.pickUpLocation}</td>
        <td className="px-6 py-4 text-sm text-gray-600">{data?.dropOffLocation}</td>
        <td className="px-6 py-4 text-sm text-gray-600">₹{data?.fare}</td>
        <td className="px-6 py-4 text-sm text-gray-600">{Math.ceil(data?.distance / 1000)} km</td>
      </tr>
    ))}
  </tbody>
</table>



  )
}

export default Table
