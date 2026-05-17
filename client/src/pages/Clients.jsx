import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import api from "../services/api";
import toast from "react-hot-toast";

const Clients = () => {

  const [clients, setClients] = useState([]);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
  });




  // fetch clients
  const fetchClients = async () => {

    try {

      const res = await api.get("/clients");

      setClients(res.data);

    } catch (error) {

      console.log(error);

    }
  };




  useEffect(() => {
    fetchClients();
  }, []);




  // handle change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };




  // add client
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/clients", formData);

      toast.success("client Added Successfully");

      fetchClients();

      setFormData({
        companyName: "",
        contactPerson: "",
        phone: "",
        email: "",
        address: "",
      });

    } catch (error) {

      toast.error("Something went wrong");

    }
  };




  // delete client
  const deleteClient = async (id) => {

    try {

      await api.delete(`/clients/${id}`);

      fetchClients();

    } catch (error) {

      console.log(error);

    }
  };




  return (
    <AdminLayout>

      <div>

        <h1 className="text-3xl font-bold text-primary mb-6">
          Client Management
        </h1>



        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />



          <input
            type="text"
            name="contactPerson"
            placeholder="Contact Person"
            value={formData.contactPerson}
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
            Add Client
          </button>

        </form>



        {/* Table */}
        <div className="bg-white mt-8 p-6 rounded-xl shadow-md overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Company
                </th>

                <th className="text-left p-3">
                  Contact Person
                </th>

                <th className="text-left p-3">
                  Phone
                </th>

                <th className="text-left p-3">
                  Email
                </th>

                <th className="text-left p-3">
                  Address
                </th>

                <th className="text-left p-3">
                  Action
                </th>

              </tr>

            </thead>



            <tbody>

              {clients.map((client) => (

                <tr
                  key={client._id}
                  className="border-b"
                >

                  <td className="p-3">
                    {client.companyName}
                  </td>

                  <td className="p-3">
                    {client.contactPerson}
                  </td>

                  <td className="p-3">
                    {client.phone}
                  </td>

                  <td className="p-3">
                    {client.email}
                  </td>

                  <td className="p-3">
                    {client.address}
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() => deleteClient(client._id)}
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

export default Clients;