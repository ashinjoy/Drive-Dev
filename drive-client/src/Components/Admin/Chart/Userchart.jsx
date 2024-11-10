import React from 'react'
import {Pie} from 'react-chartjs-2'

const options={}

function Userchart({data}) {
  return (
   <>
  
   
   {data && <Pie data={data} options={{
        ...options,
        responsive:true,
        maintainAspectRatio:false
      }} 
      style={{width:"100%", height:"100%"}} />
      }

  
      
    </>
  )
}

export default Userchart
