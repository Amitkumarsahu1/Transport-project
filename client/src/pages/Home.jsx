import {

  FaTruck,

  FaChartLine,

  FaFileInvoiceDollar,

  FaTools,

  FaUsers,

  FaShippingFast,

} from "react-icons/fa";

import { Link } from "react-router-dom";



const Home = () => {

  return (

    <div className="
      bg-gray-950
      text-white
      min-h-screen
    ">





      {/* NAVBAR */}
      <nav
        className="
          flex
          justify-between
          items-center

          px-6
          md:px-16

          py-5

          border-b
          border-gray-800
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            text-blue-500
          "
        >
          TranspoTrack
        </h1>





        <Link
          to="/login"
          className="
            bg-blue-600
            hover:bg-blue-700
            px-6 py-3
            rounded-xl
            font-semibold
            transition-all
          "
        >
          Login
        </Link>

      </nav>






      {/* HERO */}
     {/* HERO */}
<section
  className="
    relative

    px-6
    md:px-16

    py-24

    grid
    grid-cols-1
    lg:grid-cols-2

    gap-10
    items-center

    overflow-hidden
  "
>





  {/* BACKGROUND GLOW */}
  <div
    className="
      absolute

      top-[-150px]
      left-[-100px]

      w-[400px]
      h-[400px]

      bg-blue-500/20

      blur-[120px]
      rounded-full

      animate-pulse
    "
  />





  <div
    className="
      absolute

      bottom-[-150px]
      right-[-100px]

      w-[350px]
      h-[350px]

      bg-blue-700/20

      blur-[120px]
      rounded-full

      animate-pulse
    "
  />






  {/* MOVING ROAD */}
  <div
    className="
      absolute
      bottom-10
      left-0

      w-full
      h-2

      bg-gray-700
    "
  >

    {/* ROAD LINE */}
    <div
      className="
        absolute
        top-1/2
        left-0

        w-full
        h-[3px]

        bg-yellow-400

        road-line
      "
    />

  </div>




{/* TRUCK + HEADLIGHT */}
<div
  className="
    truck-wrapper
  "
>

  {/* HEADLIGHT */}
  <div
    className="
      truck-headlight
    "
  />



  {/* TRUCK */}
  <div
    className="
      text-7xl
      md:text-8xl

      relative
      z-20 truck-face-right
    "
  >
    🚚
  </div>

</div>







{/* TRUCK 2 */}
{/* <div
  className="
    absolute

    bottom-20

    truck-animation-2

    text-6xl
    md:text-7xl

    z-10
  "
>
  🚛
</div> */}




  {/* LEFT */}
  <div className="relative z-10">

    <h1
      className="
        text-5xl
        md:text-7xl

        font-extrabold

        leading-tight
      "
    >

      Smart
      {" "}

      <span className="
        text-blue-500
      ">
        Transport
      </span>

      <br />

      <span className="typing-text">
          ERP Solution
        </span>

    </h1>





    <p
      className="
        text-gray-400

        mt-6

        text-lg

        leading-8

        max-w-xl
      "
    >

      Manage trucks,
      shipments,
      invoices,
      maintenance,
      analytics,
      and business operations
      from one powerful dashboard.

    </p>





    {/* BUTTONS */}
    <div
      className="
        flex flex-wrap
        gap-5 mt-8
      "
    >

      <Link
        to="/login"
        className="
          bg-blue-600
          hover:bg-blue-700

          px-8 py-4
          rounded-xl

          font-semibold

          transition-all
          hover:scale-105
        "
      >
        Get Started
      </Link>





      <button
        className="
          border border-gray-700
          hover:border-blue-500

          px-8 py-4
          rounded-xl

          transition-all
          hover:scale-105
        "
      >
        Watch Demo
      </button>

    </div>






    {/* STATS */}
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-4

        gap-5
        mt-14
      "
    >

      <div className="floating-card">

        <h2 className="
          text-4xl
          font-bold
          text-blue-500
        ">
          500+
        </h2>

        <p className="text-gray-400">
          Trucks
        </p>

      </div>





      <div className="floating-card">

        <h2 className="
          text-4xl
          font-bold
          text-blue-500
        ">
          10K+
        </h2>

        <p className="text-gray-400">
          Deliveries
        </p>

      </div>





      <div className="floating-card">

        <h2 className="
          text-4xl
          font-bold
          text-blue-500
        ">
          99%
        </h2>

        <p className="text-gray-400">
          Success
        </p>

      </div>





      <div className="floating-card">

        <h2 className="
          text-4xl
          font-bold
          text-blue-500
        ">
          24/7
        </h2>

        <p className="text-gray-400">
          Support
        </p>

      </div>

    </div>

  </div>






  {/* RIGHT */}
  <div
    className="
      relative z-10

      bg-gradient-to-br
      from-blue-600
      to-blue-900

      p-8
      rounded-3xl

      shadow-2xl

      floating-dashboard
    "
  >

    <div
      className="
        bg-white/10
        backdrop-blur-lg

        rounded-2xl
        p-6
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Live Dashboard
      </h2>





      <div className="
        space-y-5
      ">

        <div
          className="
            bg-white/10

            p-5
            rounded-xl

            flex
            justify-between
          "
        >

          <span>
            Revenue
          </span>

          <span className="
            font-bold
          ">
            ₹ 12,50,000
          </span>

        </div>





        <div
          className="
            bg-white/10

            p-5
            rounded-xl

            flex
            justify-between
          "
        >

          <span>
            Deliveries
          </span>

          <span className="
            font-bold
          ">
            1,240
          </span>

        </div>





        <div
          className="
            bg-white/10

            p-5
            rounded-xl

            flex
            justify-between
          "
        >

          <span>
            Profit
          </span>

          <span className="
            font-bold
          ">
            ₹ 4,75,000
          </span>

        </div>





        <div
          className="
            bg-white/10

            p-5
            rounded-xl

            flex
            justify-between
          "
        >

          <span>
            Active Trucks
          </span>

          <span className="
            font-bold
          ">
            320
          </span>

        </div>

      </div>

    </div>

  </div>

</section>






      {/* FEATURES */}
      <section
        className="
          px-6
          md:px-16

          py-20
        "
      >

        <h2
          className="
            text-5xl
            font-bold
            text-center
            mb-16
          "
        >
          Powerful Features
        </h2>





        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3

            gap-8
          "
        >

          {/* CARD */}
          <div className="
            bg-gray-900
            p-8
            rounded-2xl

            hover:-translate-y-2
            transition-all
          ">

            <FaTruck
              className="
                text-5xl
                text-blue-500
                mb-5
              "
            />

            <h3 className="
              text-2xl
              font-bold
              mb-4
            ">
              Truck Management
            </h3>

            <p className="text-gray-400">
              Manage all trucks,
              owners,
              drivers,
              and live operations.
            </p>

          </div>





          <div className="
            bg-gray-900
            p-8
            rounded-2xl

            hover:-translate-y-2
            transition-all
          ">

            <FaShippingFast
              className="
                text-5xl
                text-blue-500
                mb-5
              "
            />

            <h3 className="
              text-2xl
              font-bold
              mb-4
            ">
              Shipment Tracking
            </h3>

            <p className="text-gray-400">
              Track shipments,
              delivery status,
              and transport workflow.
            </p>

          </div>





          <div className="
            bg-gray-900
            p-8
            rounded-2xl

            hover:-translate-y-2
            transition-all
          ">

            <FaFileInvoiceDollar
              className="
                text-5xl
                text-blue-500
                mb-5
              "
            />

            <h3 className="
              text-2xl
              font-bold
              mb-4
            ">
              Invoice System
            </h3>

            <p className="text-gray-400">
              Smart invoice management
              with payment tracking.
            </p>

          </div>





          <div className="
            bg-gray-900
            p-8
            rounded-2xl

            hover:-translate-y-2
            transition-all
          ">

            <FaChartLine
              className="
                text-5xl
                text-blue-500
                mb-5
              "
            />

            <h3 className="
              text-2xl
              font-bold
              mb-4
            ">
              Analytics
            </h3>

            <p className="text-gray-400">
              Real-time revenue,
              profit,
              and business insights.
            </p>

          </div>





          <div className="
            bg-gray-900
            p-8
            rounded-2xl

            hover:-translate-y-2
            transition-all
          ">

            <FaTools
              className="
                text-5xl
                text-blue-500
                mb-5
              "
            />

            <h3 className="
              text-2xl
              font-bold
              mb-4
            ">
              Maintenance
            </h3>

            <p className="text-gray-400">
              Track truck maintenance,
              repairs,
              and service history.
            </p>

          </div>





          <div className="
            bg-gray-900
            p-8
            rounded-2xl

            hover:-translate-y-2
            transition-all
          ">

            <FaUsers
              className="
                text-5xl
                text-blue-500
                mb-5
              "
            />

            <h3 className="
              text-2xl
              font-bold
              mb-4
            ">
              Driver Management
            </h3>

            <p className="text-gray-400">
              Manage drivers,
              salaries,
              and assignments easily.
            </p>

          </div>

        </div>

      </section>






      {/* CTA */}
      <section
        className="
          px-6
          md:px-16

          py-24
          text-center
        "
      >

        <div
          className="
            bg-gradient-to-r
            from-blue-600
            to-blue-900

            rounded-3xl
            p-16
          "
        >

          <h2
            className="
              text-5xl
              font-bold
              mb-6
            "
          >
            Ready To Grow
            Your Transport Business?
          </h2>





          <p
            className="
              text-lg
              text-gray-200
              max-w-3xl
              mx-auto
            "
          >
            Start managing your
            logistics,
            shipments,
            invoices,
            and profits
            with a modern ERP solution.

          </p>





          <Link
            to="/login"
            className="
              inline-block

              bg-white
              text-blue-700

              px-10 py-4
              rounded-xl

              font-bold

              mt-10

              hover:scale-105
              transition-all
            "
          >
            Start Now
          </Link>

        </div>

      </section>






      {/* FOOTER */}
      <footer
        className="
          border-t
          border-gray-800

          py-8

          text-center
          text-gray-500
        "
      >

        © 2026 TranspoTrack ERP.
        All rights reserved.

      </footer>

    </div>
  );
};

export default Home;