import React from 'react'
import {Bar} from 'react-chartjs-2'

function TripReportChart({data}){
  const options={
    plugins: {
      title: {
        display: true,
        text: "Users Gained between 2016-2020"
      }
    }
  }
  return (
    <div className='relative'>
      {data && <Bar data={data} options={{
        ...options,
        responsive:true,
        maintainAspectRatio:true
      }}  />}
    </div>
  )
}

export default TripReportChart
