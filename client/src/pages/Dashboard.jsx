import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import api from "../services/api";

import DashboardCharts from "../components/DashboardCharts";

import RecentShipments from "../components/RecentShipments";

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalTrucks: 0,
    totalDrivers: 0,
    totalShipments: 0,
    deliveredShipments: 0,
  });



  // fetch stats
  const fetchStats = async () => {

    try {

      const res = await api.get("/dashboard/stats");

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }
  };



  useEffect(() => {
    fetchStats();
  }, []);




  return (
    <AdminLayout>

      <div>

        <h1 className="text-3xl font-bold text-primary mb-6">
          Admin Dashboard
        </h1>



        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Trucks */}
          <div className="bg-white p-6 rounded-xl shadow-md">

            <h2 className="text-gray-500">
              Total Trucks
            </h2>

            <p className="text-4xl font-bold text-primary mt-2">
              {stats.totalTrucks}
            </p>

          </div>



          {/* Drivers */}
          <div className="bg-white p-6 rounded-xl shadow-md">

            <h2 className="text-gray-500">
              Total Drivers
            </h2>

            <p className="text-4xl font-bold text-primary mt-2">
              {stats.totalDrivers}
            </p>

          </div>



          {/* Shipments */}
          <div className="bg-white p-6 rounded-xl shadow-md">

            <h2 className="text-gray-500">
              Total Shipments
            </h2>

            <p className="text-4xl font-bold text-primary mt-2">
              {stats.totalShipments}
            </p>

          </div>



          {/* Delivered */}
          <div className="bg-white p-6 rounded-xl shadow-md">

            <h2 className="text-gray-500">
              Delivered Shipments
            </h2>

            <p className="text-4xl font-bold text-primary mt-2">
              {stats.deliveredShipments}
            </p>

          </div>

        </div>

      </div>
      <RecentShipments />
      <DashboardCharts />

    </AdminLayout>
  );
};

export default Dashboard;