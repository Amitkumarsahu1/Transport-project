import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import api from "../services/api";

import toast from "react-hot-toast";



const Shipments = () => {

  const [shipments, setShipments] =
    useState([]);

  const [filteredShipments,
    setFilteredShipments] =
    useState([]);

  const [editingId,
    setEditingId] =
    useState(null);




  const [statusFilter,
    setStatusFilter] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [showPrevious,
    setShowPrevious] =
    useState(false);




  const [formData, setFormData] =
    useState({

      clientName: "",

      pickupLocation: "",

      dropLocation: "",

      materialType: "",

      weight: "",

      assignedTruck: "",

      assignedDriver: "",

      revenue: "",

    });




  // FETCH
  const fetchShipments =
    async () => {

      try {

        const res =
          await api.get(
            "/shipments"
          );




        setShipments(
          res.data
        );

      } catch (error) {

        toast.error(
          "Failed to fetch"
        );

      }
    };




  useEffect(() => {

    fetchShipments();

  }, []);




  // FILTER MONTH
  useEffect(() => {

    const currentDate =
      new Date();

    const currentMonth =
      currentDate.getMonth();

    const currentYear =
      currentDate.getFullYear();




    let filtered = [];




    if (showPrevious) {

      filtered = shipments.filter(
        (shipment) => {

          const shipmentDate =
            new Date(
              shipment.createdAt
            );




          return (

            shipmentDate.getMonth() !==
              currentMonth ||

            shipmentDate.getFullYear() !==
              currentYear

          );
        }
      );

    } else {

      filtered = shipments.filter(
        (shipment) => {

          const shipmentDate =
            new Date(
              shipment.createdAt
            );




          return (

            shipmentDate.getMonth() ===
              currentMonth &&

            shipmentDate.getFullYear() ===
              currentYear

          );
        }
      );
    }




    setFilteredShipments(
      filtered
    );

  }, [shipments, showPrevious]);




  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });
  };




  // EDIT SHIPMENT
  const editShipment =
    (shipment) => {

      setFormData({

        clientName:
          shipment.clientName,

        pickupLocation:
          shipment.pickupLocation,

        dropLocation:
          shipment.dropLocation,

        materialType:
          shipment.materialType,

        weight:
          shipment.weight,

        assignedTruck:
          shipment.assignedTruck,

        assignedDriver:
          shipment.assignedDriver,

        revenue:
          shipment.revenue,

      });




      setEditingId(
        shipment._id
      );
    };




  // ADD / UPDATE
  const handleSubmit =
    async (e) => {

      e.preventDefault();




      try {

        // UPDATE
        if (editingId) {

          await api.put(

            `/shipments/${editingId}`,

            {
              ...formData,

              revenue: Number(
                formData.revenue
              ),
            }

          );




          toast.success(
            "Shipment Updated"
          );

        }

        // ADD
        else {

          await api.post(

            "/shipments",

            {
              ...formData,

              revenue: Number(
                formData.revenue
              ),
            }

          );




          toast.success(
            "Shipment Added"
          );
        }




        fetchShipments();




        setEditingId(null);




        setFormData({

          clientName: "",

          pickupLocation: "",

          dropLocation: "",

          materialType: "",

          weight: "",

          assignedTruck: "",

          assignedDriver: "",

          revenue: "",

        });

      } catch (error) {

        toast.error(
          "Something went wrong"
        );
      }
    };




  // MARK COMPLETE
  const markComplete =
    async (id) => {

      try {

        await api.put(
          `/shipments/${id}/complete`
        );




        toast.success(
          "Shipment Delivered"
        );




        fetchShipments();

      } catch (error) {

        toast.error(
          "Failed"
        );
      }
    };




  // DELETE
  const deleteShipment =
    async (id) => {

      try {

        await api.delete(
          `/shipments/${id}`
        );




        toast.success(
          "Shipment Deleted"
        );




        fetchShipments();

      } catch (error) {

        toast.error(
          "Delete Failed"
        );
      }
    };




  // STATUS COLOR
  const getStatusColor =
    (status) => {

      switch (status) {

        case "Pending":

          return `
            bg-yellow-100
            text-yellow-700
          `;




        case "Delivered":

          return `
            bg-green-100
            text-green-700
          `;




        case "Cancelled":

          return `
            bg-red-100
            text-red-700
          `;




        default:

          return `
            bg-gray-100
            text-gray-700
          `;
      }
    };




  return (
    <AdminLayout>

      <div>

        {/* HEADER */}
        <div className="
          flex justify-between
          items-center mb-6
          flex-wrap gap-4
        ">

          <h1 className="
            text-3xl font-bold
            text-primary
          ">
            Shipment Management
          </h1>




          {/* MONTH BUTTON */}
          <button
            onClick={() =>
              setShowPrevious(
                !showPrevious
              )
            }
            className="
              bg-primary
              text-white
              px-5 py-3
              rounded-lg
            "
          >

            {showPrevious
              ? "Current Month"
              : "Previous Months"}

          </button>

        </div>






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
            name="clientName"
            placeholder="Client Name"
            value={formData.clientName}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />




          <input
            type="text"
            name="pickupLocation"
            placeholder="Pickup Location"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />




          <input
            type="text"
            name="dropLocation"
            placeholder="Drop Location"
            value={formData.dropLocation}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />




          <input
            type="text"
            name="materialType"
            placeholder="Material Type"
            value={formData.materialType}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />




          <input
            type="text"
            name="weight"
            placeholder="Weight"
            value={formData.weight}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />




          <input
            type="text"
            name="assignedTruck"
            placeholder="Assigned Truck"
            value={formData.assignedTruck}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />




          <input
            type="text"
            name="assignedDriver"
            placeholder="Assigned Driver"
            value={formData.assignedDriver}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />




          <input
            type="number"
            name="revenue"
            placeholder="Shipment Revenue"
            value={formData.revenue}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />




          <button
            className="
              bg-secondary
              text-white
              rounded-lg p-3
            "
          >

            {editingId
              ? "Update Shipment"
              : "Add Shipment"}

          </button>

        </form>






        {/* SEARCH */}
        <div className="
          flex flex-col md:flex-row
          gap-4 mb-5 mt-8
        ">

          <input
            type="text"
            placeholder="
              Search Client or Truck...
            "
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              border p-3 rounded-lg
              w-full md:w-[300px]
            "
          />




          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="
              border p-3 rounded-lg
            "
          >

            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </select>

        </div>






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
                  Client
                </th>

                <th className="text-left p-3">
                  Pickup
                </th>

                <th className="text-left p-3">
                  Drop
                </th>

                <th className="text-left p-3">
                  Material
                </th>

                <th className="text-left p-3">
                  Weight
                </th>

                <th className="text-left p-3">
                  Truck
                </th>

                <th className="text-left p-3">
                  Driver
                </th>

                <th className="text-left p-3">
                  Revenue
                </th>

                <th className="text-left p-3">
                  Shipment Date
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

              {filteredShipments

                .filter((shipment) => {

                  const statusMatch =

                    statusFilter ===
                      "All" ||

                    shipment.status ===
                      statusFilter;




                  const searchMatch =

                    shipment.clientName
                      .toLowerCase()
                      .includes(
                        search.toLowerCase()
                      ) ||

                    shipment.assignedTruck
                      .toLowerCase()
                      .includes(
                        search.toLowerCase()
                      );




                  return (
                    statusMatch &&
                    searchMatch
                  );
                })

                .map((shipment) => (

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
                      {shipment.materialType}
                    </td>

                    <td className="p-3">
                      {shipment.weight}
                    </td>

                    <td className="p-3">
                      {shipment.assignedTruck}
                    </td>

                    <td className="p-3">
                      {shipment.assignedDriver}
                    </td>

                    <td className="
                      p-3 text-green-600
                      font-bold
                    ">
                      ₹ {shipment.revenue}
                    </td>

                    <td className="p-3">

                      {new Date(
                        shipment.createdAt
                      ).toLocaleDateString()}

                    </td>





                    {/* STATUS */}
                    <td className="p-3">

                      <select

                        value={shipment.status}

                        onChange={async (e) => {

                          try {

                            await api.put(

                              `/shipments/${shipment._id}`,

                              {
                                status:
                                  e.target.value,
                              }

                            );




                            toast.success(
                              "Status Updated"
                            );




                            fetchShipments();

                          } catch (error) {

                            toast.error(
                              "Failed"
                            );
                          }
                        }}

                        className={`
                          px-3 py-2
                          rounded-lg
                          text-sm
                          font-medium
                          ${getStatusColor(
                            shipment.status
                          )}
                        `}
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>






                    {/* ACTION */}
                    <td className="p-3">

                      {/* EDIT */}
                      <button
                        onClick={() =>
                          editShipment(
                            shipment
                          )
                        }
                        className="
                          bg-blue-500
                          text-white
                          px-4 py-2
                          rounded mr-2
                        "
                      >
                        Edit
                      </button>





                      {/* COMPLETE */}
                      {shipment.status ===
                      "Pending" ? (

                        <button
                          onClick={() =>
                            markComplete(
                              shipment._id
                            )
                          }
                          className="
                            bg-green-500
                            text-white
                            px-4 py-2
                            rounded mr-2
                          "
                        >
                          Mark Complete
                        </button>

                      ) : null}






                      {/* DELETE */}
                      <button
                        onClick={() =>
                          deleteShipment(
                            shipment._id
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

export default Shipments;