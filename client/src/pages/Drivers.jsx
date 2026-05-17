import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import api from "../services/api";
import toast from "react-hot-toast";

const Drivers = () => {

  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    licenseNumber: "",
    assignedTruck: "",
    address: "",
  });



  // fetch drivers
  const fetchDrivers = async () => {

    try {

      const res = await api.get("/drivers");

      setDrivers(res.data);

    } catch (error) {

      console.log(error);

    }
  };



  useEffect(() => {
    fetchDrivers();
  }, []);



  // handle change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  // add driver
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/drivers", formData);

      toast.success("Driver Added Successfully");

      fetchDrivers();

      setFormData({
        name: "",
        phone: "",
        licenseNumber: "",
        assignedTruck: "",
        address: "",
      });

    } catch (error) {

      toast.error("Something went wrong");

    }
  };



  // delete driver
  const deleteDriver = async (id) => {

    try {

      await api.delete(`/drivers/${id}`);

      fetchDrivers();

    } catch (error) {

      console.log(error);

    }
  };



  return (
    <AdminLayout>

      <div>

        <h1 className="text-3xl font-bold text-primary mb-6">
          Driver Management
        </h1>



        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Driver Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="licenseNumber"
            placeholder="License Number"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="assignedTruck"
            placeholder="Assigned Truck"
            value={formData.assignedTruck}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <button className="bg-secondary text-white rounded-lg p-3">
            Add Driver
          </button>

        </form>

       {/* serach */}
       <div className="mb-5">

  <input
    type="text"
    placeholder="Search Driver..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border p-3 rounded-lg w-full md:w-[300px]"
  />

        </div>

        {/* Driver Table */}
        <div className="bg-white mt-8 p-6 rounded-xl shadow-md overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Name
                </th>

                <th className="text-left p-3">
                  Phone
                </th>

                <th className="text-left p-3">
                  License
                </th>

                <th className="text-left p-3">
                  Assigned Truck
                </th>

                <th className="text-left p-3">
                  Address
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

             {drivers.filter((driver) =>
               driver.name
               .toLowerCase()
               .includes(search.toLowerCase()))
               .map((driver) => (

                <tr
                  key={driver._id}
                  className="border-b"
                >

                  <td className="p-3">
                    {driver.name}
                  </td>

                  <td className="p-3">
                    {driver.phone}
                  </td>

                  <td className="p-3">
                    {driver.licenseNumber}
                  </td>

                  <td className="p-3">
                    {driver.assignedTruck}
                  </td>

                  <td className="p-3">
                    {driver.address}
                  </td>

                  <td className="p-3">
                    {driver.status}
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() => deleteDriver(driver._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
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

export default Drivers;