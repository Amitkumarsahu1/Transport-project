import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import api from "../services/api";

import toast from "react-hot-toast";

const Invoices = () => {

  const [invoices, setInvoices] =
    useState([]);




  const [formData, setFormData] =
    useState({
      invoiceNumber: "",
      clientName: "",
      truckNumber: "",
      amount: "",
      dueDate: "",
    });




  // FETCH INVOICES
  const fetchInvoices = async () => {

    try {

      const res =
        await api.get("/invoices");

      setInvoices(res.data);

    } catch (error) {

      toast.error(
        "Failed to fetch invoices"
      );

    }
  };




  useEffect(() => {
    fetchInvoices();
  }, []);




  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };




  // ADD INVOICE
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/invoices",
          formData
        );




        toast.success(
          "Invoice Created"
        );




        fetchInvoices();




        // RESET FORM
        setFormData({
          invoiceNumber: "",
          clientName: "",
          truckNumber: "",
          amount: "",
          dueDate: "",
        });

      } catch (error) {

        toast.error(
          "Something went wrong"
        );

      }
    };




  // MARK PAID
  const markPaid = async (id) => {

    try {

      await api.put(
        `/invoices/${id}/pay`
      );




      toast.success(
        "Marked as Paid"
      );




      fetchInvoices();

    } catch (error) {

      toast.error("Failed");

    }
  };




  // DELETE
  const deleteInvoice =
    async (id) => {

      try {

        await api.delete(
          `/invoices/${id}`
        );




        toast.success(
          "Invoice Deleted"
        );




        fetchInvoices();

      } catch (error) {

        toast.error("Failed");

      }
    };




  return (
    <AdminLayout>

      <div>

        <h1 className="
          text-3xl font-bold
          text-primary mb-6
        ">
          Invoice Management
        </h1>




        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-white p-6
            rounded-xl shadow-md
            grid grid-cols-1
            md:grid-cols-2
            lg:grid-cols-5
            gap-5
          "
        >

          <input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            value={formData.invoiceNumber}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />



          <input
            type="text"
            name="clientName"
            placeholder="Client Name"
            value={formData.clientName}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />



          {/* TRUCK NUMBER */}
          <input
            type="text"
            name="truckNumber"
            placeholder="Truck Number"
            value={formData.truckNumber}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />



          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />



          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />



          <button
            className="
              bg-secondary
              text-white
              rounded-lg
              p-3
            "
          >
            Create Invoice
          </button>

        </form>




        {/* TABLE */}
        <div className="
          bg-white mt-8 p-6
          rounded-xl shadow-md
          overflow-x-auto
        ">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Invoice
                </th>

                <th className="text-left p-3">
                  Client
                </th>

                <th className="text-left p-3">
                  Truck
                </th>

                <th className="text-left p-3">
                  Amount
                </th>

                <th className="text-left p-3">
                  Due Date
                </th>

                <th className="text-left p-3">
                  Status
                </th>

                <th className="text-left p-3">
                  Action
                </th>

              </tr>

            </thead>




            <tbody>

              {invoices.map((invoice) => (

                <tr
                  key={invoice._id}
                  className="border-b"
                >

                  <td className="p-3">
                    {invoice.invoiceNumber}
                  </td>

                  <td className="p-3">
                    {invoice.clientName}
                  </td>

                  <td className="p-3 font-semibold">
                    {invoice.truckNumber}
                  </td>

                  <td className="
                    p-3 text-green-600
                    font-semibold
                  ">
                    ₹ {invoice.amount}
                  </td>

                  <td className="p-3">

                    {new Date(
                      invoice.dueDate
                    ).toLocaleDateString()}

                  </td>

                  <td className="p-3">

                    <span
                      className={`
                        px-3 py-1
                        rounded-full
                        text-sm
                        font-medium
                        ${
                          invoice.status ===
                          "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {invoice.status}
                    </span>

                  </td>

                  <td className="p-3">

                    {invoice.status ===
                    "Pending" ? (

                      <button
                        onClick={() =>
                          markPaid(
                            invoice._id
                          )
                        }
                        className="
                          bg-green-500
                          text-white
                          px-4 py-2
                          rounded mr-2
                        "
                      >
                        Mark Paid
                      </button>

                    ) : null}




                    <button
                      onClick={() =>
                        deleteInvoice(
                          invoice._id
                        )
                      }
                      className="
                        bg-red-500
                        text-white
                        px-4 py-2
                        rounded
                      "
                    >
                      Delete
                    </button>

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

export default Invoices;