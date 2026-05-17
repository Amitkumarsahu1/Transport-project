import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaTruck } from "react-icons/fa";

import api from "../services/api";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post("/auth/login", formData);

      // save token
      localStorage.setItem("token", res.data.token);

      // save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login Successfully");

      navigate("/admin/dashboard");

    } catch (error) {

      toast.error(
      error.response?.data?.message || "Login Failed"
    );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left */}
      <div className="hidden lg:flex w-1/2 bg-primary text-white items-center justify-center flex-col p-10">

        <FaTruck className="text-7xl text-accent mb-6" />

        <h1 className="text-5xl font-bold mb-4">
          Transport Management
        </h1>

        <p className="text-gray-300 text-center max-w-lg">
          Manage your logistics and transport operations efficiently.
        </p>

      </div>

      {/* Right */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-background">

        <div className="bg-white shadow-2xl rounded-2xl p-10 w-[90%] max-w-md">

          <h2 className="text-4xl font-bold text-primary mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-8">
            Login to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-secondary"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-secondary"
              />

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary hover:opacity-90 transition-all text-white py-3 rounded-lg font-semibold"
            >

              {loading ? "Loading..." : "Login"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;