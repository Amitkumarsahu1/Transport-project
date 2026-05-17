import { useState } from "react";

import Sidebar from "../components/Sidebar";

import { FaBars } from "react-icons/fa";

const AdminLayout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);




  return (

    <div className="
      flex
      min-h-screen
      bg-gray-100
    ">





      {/* SIDEBAR */}
      <div

        className={`

          fixed
          top-0
          left-0
          z-50

          h-screen

          transition-all
          duration-300

          ${sidebarOpen

            ? "translate-x-0"

            : "-translate-x-full md:translate-x-0"

          }

        `}
      >

        <Sidebar />

      </div>






      {/* OVERLAY */}
      {sidebarOpen && (

        <div

          onClick={() =>
            setSidebarOpen(false)
          }

          className="
            fixed inset-0
            bg-black/50
            z-40 md:hidden
          "
        />

      )}






      {/* MAIN CONTENT */}
      <div
        className="
          flex-1
          w-full

          md:ml-[250px]
        "
      >




        {/* MOBILE NAVBAR */}
        <div
          className="
            bg-white
            shadow-md
            p-4

            flex
            items-center
            justify-between

            md:hidden

            sticky
            top-0
            z-30
          "
        >

          <button

            onClick={() =>
              setSidebarOpen(true)
            }

            className="
              text-2xl
              text-primary
            "
          >

            <FaBars />

          </button>





          <h1
            className="
              text-xl
              font-bold
              text-primary
            "
          >
            Transport ERP
          </h1>

        </div>






        {/* PAGE CONTENT */}
        <div
          className="
            p-4
            md:p-6
          "
        >

          {children}

        </div>

      </div>

    </div>
  );
};

export default AdminLayout;