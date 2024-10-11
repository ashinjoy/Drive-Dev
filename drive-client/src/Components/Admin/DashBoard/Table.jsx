import React, { useEffect, useState } from 'react'
import { latestRidesService, mostActiveDriversService } from '../../../Features/Admin/adminService'

function Table({type}) {
  const [tableData,setTableData] = useState(null)
  useEffect(()=>{
    const getData = async()=>{
      if(type == "latestRide"){
        const response = await latestRidesService()
        console.log('response in latest',response.data);
        setTableData(response?.data)
        return
      }
      if(type == "mostActiveDrivers"){
        const response = await mostActiveDriversService()
        console.log('active',response.data)
        setTableData(response?.data)
        return
      }
    }
    getData()
  },[])
  return (
    <table className= "w-[100%]">
        <thead className="bg-gray-100">
          <tr>
            {/* <th className="px-6 py-3  text-left text-sm font-medium text-gray-700">Date</th> */}
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
           {type == "latestRide" && <>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">{type == "latestRide" ? "Pickup Location" : "email"}</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">{type == "latestRide" ? "Drop Location" : "phone"}</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">{type == "latestRide" ? "Fare" : "License Number"}</th>
            </>
            }
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">{type == "latestRide" ? "Distance" : "completedTrips"}</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
         
       {tableData && tableData.length > 0 && tableData.map((data)=>{
        return(
          <tr className="hover:bg-gray-50 transition-colors duration-200" key={data._id} > 
            
          <td className="px-6 py-4 text-sm text-gray-600">{type == "latestRide" ? data?.userId.name  : data?.name}</td>
        {type == "latestRide" &&  <>
        <td className="px-6 py-4 text-sm text-gray-600">{type == "latestRide" ? data?.pickUpLocation : data?.email}</td>
          <td className="px-6 py-4 text-sm text-gray-600">{type == "latestRide" ? data?.dropOffLocation : data?.phone}</td>
          <td className="px-6 py-4 text-sm text-gray-600">{type == "latestRide" ? data?.fare : data?.licenseNumber}</td>
          </>
          }
          <td className="px-6 py-4 text-sm text-gray-600">{type == "latestRide" ? data?.distance : data?.completedTrips}</td>
       </tr>
        )
       })}
           

           
        </tbody>
      </table>

  )
}

export default Table
