import { useEffect, useState } from "react";

import api from "../services/api";

const RecentShipments = () => {

  const [shipments, setShipments] = useState([]);




  // fetch recent shipments
  const fetchShipments = async () => {

    try {

      const res = await api.get(
        "/dashboard/recent-shipments"
      );

      setShipments(res.data);

    } catch (error) {

      console.log(error);

    }
  };



  useEffect(() => {
    fetchShipments();
  }, []);




  // status color
  const getStatusColor = (status) => {

    switch (status) {

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "In Transit":
        return "bg-blue-100 text-blue-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };




  return (
    <div className="bg-white mt-8 p-6 rounded-xl shadow-md overflow-x-auto">

      <h2 className="text-2xl font-bold text-primary mb-5">
        Recent Shipments
      </h2>



      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left p-3">
              Client
            </th>

            <th className="text-left p-3">
              Pickup
            </th>

            <th className="text-left p-3">
              Drop
            </th>

            <th className="text-left p-3">
              Truck
            </th>

            <th className="text-left p-3">
              Driver
            </th>

            <th className="text-left p-3">
              Status
            </th>

          </tr>

        </thead>



        <tbody>

          {shipments.map((shipment) => (

            <tr
              key={shipment._id}
              className="border-b"
            >

              <td className="p-3">
                {shipment.clientName}
              </td>

              <td className="p-3">
                {shipment.pickupLocation}
              </td>

              <td className="p-3">
                {shipment.dropLocation}
              </td>

              <td className="p-3">
                {shipment.assignedTruck}
              </td>

              <td className="p-3">
                {shipment.assignedDriver}
              </td>

              <td className="p-3">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}
                >
                  {shipment.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RecentShipments;