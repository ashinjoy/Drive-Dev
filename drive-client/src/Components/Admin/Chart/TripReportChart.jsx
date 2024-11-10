import React from "react";
import { Bar } from "react-chartjs-2";

function TripReportChart({ data }) {
  const options = {

  };
  return (
    <>
      {data && (
        <Bar
          data={data}
          options={{ ...options, responsive: true, maintainAspectRatio: false }}
          style={{width:"100%", height:"95%"}}
        />
      )}
    </>
  );
}

export default TripReportChart;
