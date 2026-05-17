import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import api from "../services/api";



const TruckAnalytics = () => {

  const [analytics, setAnalytics] =
    useState([]);

  const [topTruck, setTopTruck] =
    useState(null);




  // FETCH ANALYTICS
  const fetchAnalytics =
    async () => {

      try {

        const res =
          await api.get(
            "/analytics/truck-profit"
          );




        setAnalytics(
          res.data.analytics
        );




        setTopTruck(
          res.data.topTruck
        );

      } catch (error) {

        console.log(error);

      }
    };




  useEffect(() => {

    fetchAnalytics();

  }, []);




  return (
    <AdminLayout>

      <div>

        {/* TITLE */}
        <h1 className="
          text-3xl font-bold
          text-primary mb-6
        ">
          Truck Profit Analytics
        </h1>




        {/* TOP TRUCK */}
        {topTruck && (

          <div className="
            bg-green-100
            p-6 rounded-xl
            mb-8
          ">

            <h2 className="
              text-2xl font-bold
              text-green-700
            ">
              Top Profitable Truck
            </h2>

            <p className="
              mt-3 text-lg
            ">
              Truck:
              {" "}
              {topTruck.truckNumber}
            </p>

            <p className="text-lg">

              Profit:
              {" "}

              ₹ {topTruck.profit}

            </p>

          </div>

        )}






        {/* TABLE */}
        <div className="
          bg-white p-6
          rounded-xl shadow-md
          overflow-x-auto
        ">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="
                  text-left p-3
                ">
                  Truck
                </th>

                <th className="
                  text-left p-3
                ">
                  Revenue
                </th>

                <th className="
                  text-left p-3
                ">
                  Maintenance
                </th>

                <th className="
                  text-left p-3
                ">
                  Profit
                </th>

              </tr>

            </thead>






            <tbody>

              {analytics.map((truck) => (

                <tr
                  key={truck.truckNumber}
                  className="border-b"
                >

                  {/* TRUCK */}
                  <td className="p-3">

                    {truck.truckNumber}

                  </td>





                  {/* REVENUE */}
                  <td className="
                    p-3
                    text-green-600
                    font-semibold
                  ">

                    ₹ {
                      truck.totalRevenue || 0
                    }

                  </td>





                  {/* MAINTENANCE */}
                  <td className="
                    p-3
                    text-red-500
                    font-semibold
                  ">

                    ₹ {
                      truck.maintenanceCost || 0
                    }

                  </td>





                  {/* PROFIT */}
                  <td className="
                    p-3
                    text-blue-600
                    font-bold
                  ">

                    ₹ {
                      truck.profit || 0
                    }

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
};

export default TruckAnalytics;