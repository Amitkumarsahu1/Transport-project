import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import api from "../services/api";

import toast from "react-hot-toast";



const Maintenance = () => {

  const [maintenance, setMaintenance] =
    useState([]);




  const [formData, setFormData] =
    useState({
      truckNumber: "",
      maintenanceType: "",
      cost: "",
      maintenanceDate: "",
    });




  // FETCH
  const fetchMaintenance =
    async () => {

      try {

        const res =
          await api.get(
            "/maintenance"
          );

        setMaintenance(
          res.data
        );

      } catch (error) {

        toast.error(
          "Failed to fetch"
        );

      }
    };




  useEffect(() => {
    fetchMaintenance();
  }, []);




  // INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };




  // ADD
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/maintenance",
          formData
        );




        toast.success(
          "Maintenance Added"
        );




        fetchMaintenance();




        setFormData({
          truckNumber: "",
          maintenanceType: "",
          cost: "",
          maintenanceDate: "",
        });

      } catch (error) {

        toast.error(
          "Something went wrong"
        );

      }
    };




  // STATUS
  const updateStatus =
    async (id, status) => {

      try {

        await api.put(
          `/maintenance/${id}`,
          { status }
        );




        toast.success(
          "Status Updated"
        );




        fetchMaintenance();

      } catch (error) {

        toast.error(
          "Update Failed"
        );

      }
    };




  // DELETE
  const deleteMaintenance =
    async (id) => {

      try {

        await api.delete(
          `/maintenance/${id}`
        );




        toast.success(
          "Deleted"
        );




        fetchMaintenance();

      } catch (error) {

        toast.error(
          "Delete Failed"
        );

      }
    };




  return (
    <AdminLayout>

      <div>

        <h1 className="
          text-3xl font-bold
          text-primary mb-6
        ">
          Maintenance Management
        </h1>




        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-white p-6
            rounded-xl shadow-md
            grid grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-5
          "
        >

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
            type="text"
            name="maintenanceType"
            placeholder="Maintenance Type"
            value={formData.maintenanceType}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />



          <input
            type="number"
            name="cost"
            placeholder="Cost"
            value={formData.cost}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />



          <input
            type="date"
            name="maintenanceDate"
            value={formData.maintenanceDate}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />



          <button
            className="
              bg-secondary text-white
              rounded-lg p-3
            "
          >
            Add Maintenance
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
                  Truck
                </th>

                <th className="text-left p-3">
                  Type
                </th>

                <th className="text-left p-3">
                  Cost
                </th>

                <th className="text-left p-3">
                  Date
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

              {maintenance.map((item) => (

                <tr
                  key={item._id}
                  className="border-b"
                >

                  <td className="p-3">
                    {item.truckNumber}
                  </td>

                  <td className="p-3">
                    {item.maintenanceType}
                  </td>

                  <td className="
                    p-3 text-red-500
                    font-semibold
                  ">
                    ₹ {item.cost}
                  </td>

                  <td className="p-3">

                    {new Date(
                      item.maintenanceDate
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
                          item.status ===
                          "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="p-3">

                    {item.status ===
                    "Pending" ? (

                      <button
                        onClick={() =>
                          updateStatus(
                            item._id,
                            "Completed"
                          )
                        }
                        className="
                          bg-green-500
                          text-white
                          px-4 py-2
                          rounded mr-2
                        "
                      >
                        Complete
                      </button>

                    ) : null}




                    <button
                      onClick={() =>
                        deleteMaintenance(
                          item._id
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

export default Maintenance;