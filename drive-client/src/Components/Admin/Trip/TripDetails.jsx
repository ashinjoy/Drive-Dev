import React from "react";

function TripDetails() {
  return (
    <table className="w-[100%]">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Driver</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Rider</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Pickup Location</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Drop Location</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Fare</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Duration</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Distance</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>          
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr className="hover:bg-gray-50 transition-colors duration-200">
          <td className="px-6 py-4 text-sm text-gray-600">Ashin</td>
          <td className="px-6 py-4 text-sm text-gray-600">Shephin</td>
          <td className="px-6 py-4 text-sm text-gray-600">Thamarchal</td>
          <td className="px-6 py-4 text-sm text-gray-600">Maradu</td>
          <td className="px-6 py-4 text-sm text-gray-600">1200</td>
          <td className="px-6 py-4 text-sm text-gray-600">39 min</td>
          <td className="px-6 py-4 text-sm text-gray-600">19km</td>
          <td className="px-6 py-4 text-sm text-gray-600">completed</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TripDetails;
