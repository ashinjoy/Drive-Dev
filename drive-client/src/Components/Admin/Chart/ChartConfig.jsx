import React from "react";

function ChartConfig(input) {
  
  const data = structuredClone(input);
  const userData = data.slice(0,data.length/2).reverse()
  const driverData = data.slice(data.length/2).reverse()
  const userKeys = userData.map((el)=>Object.keys(el))
  // console.log(userValues);
  
  const labels = userKeys.flat()
  // console.log(userValuesFlat);

  const userValues = userData.map((el)=>Object.values(el))
  const userValuesFlat =  userValues.flat()
  console.log(userValuesFlat);
  
  const driverValues = driverData.map((el)=>Object.values(el))
  const driverValuesFlat = driverValues.flat()
  console.log(driverValuesFlat);
  
  


  


  

  // const labels = Object.keys(data[0]).reverse();
  // console.log('datatoplot',dataToPlot);

  
  

  return {
    labels: labels,
    datasets: [
      {
        label: "Newly Registerd Users",
        data: userValuesFlat,
      },
      {
        label: "Newly Registerd Drivers",
        data: driverValuesFlat,
      },
    ],
  };
}

export default ChartConfig;
