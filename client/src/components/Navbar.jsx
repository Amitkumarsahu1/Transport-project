const Navbar = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white shadow-md p-5 flex items-center justify-between rounded-xl">

      <h2 className="text-2xl font-bold text-primary">
        Dashboard
      </h2>

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
          {user?.name?.charAt(0)}
        </div>

        <div>
          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-gray-500">
            {user?.role}
          </p>
        </div>

      </div>

    </div>
  );
};

export default Navbar;