import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import api from "../services/api";



const Reports = () => {

  const [expenses, setExpenses] =
    useState([]);

  const [shipments, setShipments] =
    useState([]);

  const [invoices, setInvoices] =
    useState([]);




  // FETCH DATA
  const fetchData = async () => {

    try {

      const expenseRes =
        await api.get("/expenses");

      const shipmentRes =
        await api.get("/shipments");

      const invoiceRes =
        await api.get("/invoices");




      setExpenses(
        expenseRes.data
      );

      setShipments(
        shipmentRes.data
      );

      setInvoices(
        invoiceRes.data
      );

    } catch (error) {

      console.log(error);

    }
  };




  useEffect(() => {

    fetchData();

  }, []);




  // ======================
  // TOTAL EXPENSE
  // ======================

  const totalExpense =
    expenses.reduce(

      (acc, item) =>

        acc + item.amount,

      0
    );




  // ======================
  // DELIVERED SHIPMENTS
  // ======================

  const deliveredShipments =
    shipments.filter(

      (item) =>

        item.status ===
        "Delivered"

    ).length;




  // ======================
  // PENDING SHIPMENTS
  // ======================

  const pendingShipments =
    shipments.filter(

      (item) =>

        item.status ===
        "Pending"

    ).length;




  // ======================
  // REVENUE
  // ONLY PAID INVOICES
  // ======================

  const revenue =
    invoices

      .filter(

        (item) =>

          item.status ===
          "Paid"

      )

      .reduce(

        (acc, item) =>

          acc + item.amount,

        0
      );




  // ======================
  // PROFIT
  // ======================

  const profit =
    revenue -
    totalExpense;




  return (
    <AdminLayout>

      <div>

        {/* TITLE */}
        <h1 className="
          text-3xl font-bold
          text-primary mb-6
        ">
          Reports & Analytics
        </h1>






        {/* CARDS */}
        <div className="
          grid grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        ">

          {/* REVENUE */}
          <div className="
            bg-white p-6
            rounded-xl shadow-md
          ">

            <h2 className="text-gray-500">
              Total Revenue
            </h2>

            <p className="
              text-4xl font-bold
              text-green-500 mt-2
            ">
              ₹ {revenue}
            </p>

          </div>





          {/* EXPENSE */}
          <div className="
            bg-white p-6
            rounded-xl shadow-md
          ">

            <h2 className="text-gray-500">
              Total Expense
            </h2>

            <p className="
              text-4xl font-bold
              text-red-500 mt-2
            ">
              ₹ {totalExpense}
            </p>

          </div>





          {/* PROFIT */}
          <div className="
            bg-white p-6
            rounded-xl shadow-md
          ">

            <h2 className="text-gray-500">
              Estimated Profit
            </h2>

            <p className="
              text-4xl font-bold
              text-primary mt-2
            ">
              ₹ {profit}
            </p>

          </div>





          {/* DELIVERED */}
          <div className="
            bg-white p-6
            rounded-xl shadow-md
          ">

            <h2 className="text-gray-500">
              Delivered Shipments
            </h2>

            <p className="
              text-4xl font-bold
              text-secondary mt-2
            ">
              {deliveredShipments}
            </p>

          </div>

        </div>






        {/* SHIPMENT SUMMARY */}
        <div className="
          bg-white mt-8
          p-6 rounded-xl
          shadow-md
        ">

          <h2 className="
            text-2xl font-bold
            text-primary mb-5
          ">
            Shipment Summary
          </h2>





          <div className="
            grid grid-cols-1
            md:grid-cols-3
            gap-6
          ">

            {/* PENDING */}
            <div className="
              bg-yellow-100
              p-5 rounded-xl
            ">

              <h3 className="
                text-lg font-semibold
              ">
                Pending Shipments
              </h3>

              <p className="
                text-3xl font-bold
                mt-3 text-yellow-700
              ">
                {pendingShipments}
              </p>

            </div>





            {/* DELIVERED */}
            <div className="
              bg-green-100
              p-5 rounded-xl
            ">

              <h3 className="
                text-lg font-semibold
              ">
                Delivered Shipments
              </h3>

              <p className="
                text-3xl font-bold
                mt-3 text-green-700
              ">
                {deliveredShipments}
              </p>

            </div>





            {/* TOTAL */}
            <div className="
              bg-blue-100
              p-5 rounded-xl
            ">

              <h3 className="
                text-lg font-semibold
              ">
                Total Shipments
              </h3>

              <p className="
                text-3xl font-bold
                mt-3 text-blue-700
              ">
                {shipments.length}
              </p>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
};

export default Reports;