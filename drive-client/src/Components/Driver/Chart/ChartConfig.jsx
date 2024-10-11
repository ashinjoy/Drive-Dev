import React from 'react'

function ChartConfig(input) {
  console.log('entry');
  const data = structuredClone(input);
  console.log('data oi',data);
  const driverData = data.reverse()
  
  
  
  
  const userKeys = driverData.map((el)=>Object.keys(el))
  console.log('userkeys',userKeys);
  
  // console.log(userValues);
  
  const labels = userKeys.flat()
  console.log('labesl',labels);
  
  // console.log(userValuesFlat);


  const driverValues = driverData.map((el)=>Object.values(el))
  const driverValuesFlat = driverValues.flat()
  console.log(driverValuesFlat);

  

  
    return {
        labels: labels,
        datasets: [
          {
            label: "Trips Completed",
            data: driverValuesFlat,
          },
        ],
      };
  
}

export default ChartConfig
