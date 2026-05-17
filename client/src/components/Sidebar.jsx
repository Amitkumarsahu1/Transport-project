import {
  FaTachometerAlt,
  FaTruck,
  FaUsers,
  FaBox,
  FaMoneyBill,
  FaChartBar,
  FaSignOutAlt, 
  FaBuilding,
  FaFileInvoiceDollar,
  FaChartLine,
  FaTools,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  const logoutHandler = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="bg-primary text-white h-screen w-[250px] p-5 fixed top-0 left-0 overflow-y-auto scrollbar-hide">

      {/* Logo */}
      <h1 className="text-3xl font-bold mb-10 text-accent">
        TranspoTrack
      </h1>

      {/* Menu */}
      <div className="space-y-3">

        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all"
        >
          <FaTachometerAlt />
          Dashboard
        </Link>

        <Link
          to="/admin/trucks"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all"
        >
          <FaTruck />
          Trucks
        </Link>

        <Link
          to="/admin/drivers"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all"
        >
          <FaUsers />
          Drivers
        </Link>

        <Link
          to="/admin/shipments"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all"
        >
          <FaBox />
          Shipments
        </Link>

        <Link
          to="/admin/expenses"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all"
        >
          <FaMoneyBill />
          Expenses
        </Link>

        <Link
          to="/admin/reports"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all"
        >
          <FaChartBar />
          Reports
        </Link>

        <Link
         to="/admin/clients"
         className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all"
       >
          <FaBuilding />
             Clients
         </Link>


         <Link
          to="/admin/invoices"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all"
        >
          <FaFileInvoiceDollar />
          Invoices
        </Link>

        <Link
            to="/admin/truck-analytics"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all"
          >
            <FaChartLine />
            Truck Analytics
          </Link>

          <Link to="/admin/maintenance" 
          className="flex items-center gap-3 p-3 rounded-lghover:bg-secondary transition-all"
          >
              <FaTools />
              Maintenance
            </Link>

      </div>

      {/* Logout */}
      <button
        onClick={logoutHandler}
        className="flex items-center gap-3 mt-10 bg-red-500 px-4 py-3 rounded-lg w-full hover:opacity-90"
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
};

export default Sidebar;