import { Pie, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { useEffect, useState } from "react";

import api from "../services/api";

ChartJS.register(
  ArcElement,

  Tooltip,

  Legend,

  CategoryScale,

  LinearScale,

  BarElement,
);

const DashboardCharts = () => {
  const [shipments, setShipments] = useState([]);

  const [invoices, setInvoices] = useState([]);

  // FETCH DATA
  const fetchData = async () => {
    try {
      const shipmentRes = await api.get("/shipments");

      const invoiceRes = await api.get("/invoices");

      setShipments(shipmentRes.data);

      setInvoices(invoiceRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ======================
  // SHIPMENT STATUS
  // ======================

  const pendingCount = shipments.filter(
    (item) => item.status === "Pending",
  ).length;

  const deliveredCount = shipments.filter(
    (item) => item.status === "Delivered",
  ).length;

  const cancelledCount = shipments.filter(
    (item) => item.status === "Cancelled",
  ).length;

  // ======================
  // PIE CHART
  // ======================

  const pieData = {
    labels: ["Pending", "Delivered", "Cancelled"],

    datasets: [
      {
        data: [pendingCount, deliveredCount, cancelledCount],

        backgroundColor: ["#FACC15", "#22C55E", "#EF4444"],
      },
    ],
  };

  // ======================
  // MONTHLY REVENUE
  // PAID INVOICES ONLY
  // ======================

  const months = [
    "Jan",

    "Feb",

    "Mar",

    "Apr",

    "May",

    "Jun",

    "Jul",

    "Aug",

    "Sep",

    "Oct",

    "Nov",

    "Dec",
  ];

  const monthlyRevenue = Array(12).fill(0);

  invoices

    .filter((invoice) => invoice.status === "Paid")

    .forEach((invoice) => {
      const month = new Date(invoice.createdAt).getMonth();

      monthlyRevenue[month] += invoice.amount;
    });

  // ======================
  // BAR CHART
  // ======================

  const barData = {
    labels: months,

    datasets: [
      {
        label: "Revenue",

        data: monthlyRevenue,

        backgroundColor: "#2563EB",
      },
    ],
  };

  return (
    <div
      className="
      grid grid-cols-1
      lg:grid-cols-2
      gap-6 mt-8
    "
    >
      {/* PIE CHART */}
      <div
        className="
        bg-white p-6
        rounded-xl shadow-md
      "
      >
        <h2
          className="
          text-2xl font-bold
          text-primary mb-5
        "
        >
          Shipment Status
        </h2>

        <Pie data={pieData} />
      </div>

      {/* BAR CHART */}
      <div
        className="
        bg-white p-6
        rounded-xl shadow-md
      "
      >
        <h2
          className="
          text-2xl font-bold
          text-primary mb-5
        "
        >
          Monthly Revenue
        </h2>

        <Bar data={barData} />
      </div>
    </div>
  );
};

export default DashboardCharts;
