import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import api from "../services/api";

import toast from "react-hot-toast";



const Trucks = () => {

  const [trucks, setTrucks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);




  const [formData, setFormData] =
    useState({

      truckNumber: "",

      ownerName: "",

      driverName: "",

      capacity: "",

      truckType: "",

      currentLocation: "",

    });




  // FETCH TRUCKS
  const fetchTrucks =
    async () => {

      try {

        const res =
          await api.get("/trucks");




        setTrucks(res.data);

      } catch (error) {

        toast.error(
          "Failed to fetch trucks"
        );

      }
    };




  useEffect(() => {

    fetchTrucks();

  }, []);




  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };




  // EDIT TRUCK
  const editTruck = (truck) => {

    setFormData({

      truckNumber:
        truck.truckNumber,

      ownerName:
        truck.ownerName,

      driverName:
        truck.driverName,

      capacity:
        truck.capacity,

      truckType:
        truck.truckType,

      currentLocation:
        truck.currentLocation,

    });




    setEditingId(
      truck._id
    );

  };




  // SUBMIT FORM
  const handleSubmit =
    async (e) => {

      e.preventDefault();




      try {

        // UPDATE
        if (editingId) {

          await api.put(

            `/trucks/${editingId}`,

            formData

          );




          toast.success(
            "Truck Updated Successfully"
          );

        }

        // ADD
        else {

          await api.post(

            "/trucks",

            formData

          );




          toast.success(
            "Truck Added Successfully"
          );

        }




        fetchTrucks();




        setEditingId(null);




        // RESET FORM
        setFormData({

          truckNumber: "",

          ownerName: "",

          driverName: "",

          capacity: "",

          truckType: "",

          currentLocation: "",

        });

      } catch (error) {

        toast.error(
          "Something went wrong"
        );

      }
    };




  // DELETE TRUCK
  const deleteTruck =
    async (id) => {

      try {

        await api.delete(
          `/trucks/${id}`
        );




        toast.success(
          "Truck Deleted"
        );




        fetchTrucks();

      } catch (error) {

        toast.error(
          "Failed to delete truck"
        );

      }
    };




  return (
    <AdminLayout>

      <div>

        {/* TITLE */}
        <h1 className="
          text-3xl font-bold
          text-primary mb-6
        ">
          Truck Management
        </h1>






        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            p-6
            rounded-xl
            shadow-md
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-5
          "
        >

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





          {/* OWNER NAME */}
          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            value={formData.ownerName}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />





          {/* DRIVER NAME */}
          <input
            type="text"
            name="driverName"
            placeholder="Driver Name"
            value={formData.driverName}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />





          {/* CAPACITY */}
          <input
            type="text"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />





          {/* TRUCK TYPE */}
          <input
            type="text"
            name="truckType"
            placeholder="Truck Type"
            value={formData.truckType}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />

          {/* OWNER NAME */}
              <input
                type="text"
                name="ownerName"
                placeholder="Owner Name"
                value={formData.ownerName}
                onChange={handleChange}
                className="
                  border p-3 rounded-lg
                "
              />



          {/* LOCATION */}
          <input
            type="text"
            name="currentLocation"
            placeholder="Current Location"
            value={formData.currentLocation}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />





          {/* BUTTON */}
          <button
            className="
              bg-secondary
              text-white
              rounded-lg
              p-3
            "
          >

            {editingId

              ? "Update Truck"

              : "Add Truck"}

          </button>

        </form>






        {/* SEARCH */}
        <div className="
          mb-5 mt-8
        ">

          <input
            type="text"
            placeholder="
              Search Truck Number...
            "
            value={search}
            onChange={(e) =>

              setSearch(
                e.target.value
              )

            }
            className="
              border
              p-3
              rounded-lg
              w-full
              md:w-[300px]
            "
          />

        </div>






        {/* TABLE */}
        <div className="
          bg-white
          p-6
          rounded-xl
          shadow-md
          overflow-x-auto
        ">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="
                  text-left p-3
                ">
                  Truck No
                </th>

                <th className="
                  text-left p-3
                ">
                  Owner
                </th>

                <th className="
                  text-left p-3
                ">
                  Driver
                </th>

                <th className="
                  text-left p-3
                ">
                  Capacity
                </th>

                <th className="
                  text-left p-3
                ">
                  Type
                </th>

                <th className="
                  text-left p-3
                ">
                  Location
                </th>

                <th className="
                  text-left p-3
                ">
                  Action
                </th>

              </tr>

            </thead>






            <tbody>

              {trucks

                .filter((truck) =>

                  truck.truckNumber
                    .toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )

                )

                .map((truck) => (

                  <tr
                    key={truck._id}
                    className="border-b"
                  >

                    {/* TRUCK */}
                    <td className="p-3">

                      {truck.truckNumber}

                    </td>





                    {/* OWNER */}
                    <td className="p-3">

                      {truck.ownerName}

                    </td>





                    {/* DRIVER */}
                    <td className="p-3">

                      {truck.driverName}

                    </td>





                    {/* CAPACITY */}
                    <td className="p-3">

                      {truck.capacity}

                    </td>





                    {/* TYPE */}
                    <td className="p-3">

                      {truck.truckType}

                    </td>





                    {/* LOCATION */}
                    <td className="p-3">

                      {truck.currentLocation}

                    </td>





                    {/* ACTION */}
                    <td className="p-3">

                      {/* EDIT */}
                      <button
                        onClick={() =>
                          editTruck(truck)
                        }
                        className="
                          bg-blue-500
                          text-white
                          px-4 py-2
                          rounded
                          mr-2
                        "
                      >
                        Edit
                      </button>





                      {/* DELETE */}
                      <button
                        onClick={() =>
                          deleteTruck(
                            truck._id
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

export default Trucks;