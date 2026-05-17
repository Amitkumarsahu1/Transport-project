import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import api from "../services/api";

import toast from "react-hot-toast";



const Expenses = () => {

  const [expenses, setExpenses] =
    useState([]);

  const [filteredExpenses,
    setFilteredExpenses] =
    useState([]);




  const [totalExpense,
    setTotalExpense] =
    useState(0);

  const [fuelExpense,
    setFuelExpense] =
    useState(0);

  const [officeExpense,
    setOfficeExpense] =
    useState(0);




  const [showPrevious,
    setShowPrevious] =
    useState(false);




  const [formData, setFormData] =
    useState({
      expenseTitle: "",
      expenseType: "Fuel",
      amount: "",
      note: "",
    });




  // FETCH EXPENSES
  const fetchExpenses = async () => {

    try {

      const res =
        await api.get("/expenses");

      setExpenses(res.data);

    } catch (error) {

      toast.error(
        "Failed to fetch expenses"
      );

    }
  };




  useEffect(() => {
    fetchExpenses();
  }, []);




  // FILTER MONTHLY DATA
  useEffect(() => {

    const currentDate = new Date();

    const currentMonth =
      currentDate.getMonth();

    const currentYear =
      currentDate.getFullYear();




    let filtered = [];




    if (showPrevious) {

      filtered = expenses.filter(
        (item) => {

          const expenseDate =
            new Date(item.date);




          return (
            expenseDate.getMonth() !==
              currentMonth ||

            expenseDate.getFullYear() !==
              currentYear
          );
        }
      );

    } else {

      filtered = expenses.filter(
        (item) => {

          const expenseDate =
            new Date(item.date);




          return (
            expenseDate.getMonth() ===
              currentMonth &&

            expenseDate.getFullYear() ===
              currentYear
          );
        }
      );

    }




    setFilteredExpenses(filtered);




    // TOTAL
    const total =
      filtered.reduce(
        (acc, item) =>
          acc + item.amount,
        0
      );

    setTotalExpense(total);




    // FUEL
    const fuel =
      filtered
        .filter(
          (item) =>
            item.expenseType ===
            "Fuel"
        )
        .reduce(
          (acc, item) =>
            acc + item.amount,
          0
        );

    setFuelExpense(fuel);




    // OFFICE
    const office =
      filtered
        .filter(
          (item) =>
            item.expenseType ===
            "Office Rent"
        )
        .reduce(
          (acc, item) =>
            acc + item.amount,
          0
        );

    setOfficeExpense(office);

  }, [expenses, showPrevious]);




  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };




  // ADD EXPENSE
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/expenses",
          {
            ...formData,

            amount: Number(
              formData.amount
            ),
          }
        );




        toast.success(
          "Expense Added"
        );




        fetchExpenses();




        setFormData({
          expenseTitle: "",
          expenseType: "Fuel",
          amount: "",
          note: "",
        });

      } catch (error) {

        toast.error(
          "Something went wrong"
        );

      }
    };




  // DELETE
  const deleteExpense =
    async (id) => {

      try {

        await api.delete(
          `/expenses/${id}`
        );




        toast.success(
          "Expense Deleted"
        );




        fetchExpenses();

      } catch (error) {

        toast.error(
          "Delete Failed"
        );

      }
    };




  return (
    <AdminLayout>

      <div>

        <div className="
          flex justify-between
          items-center mb-6
          flex-wrap gap-4
        ">

          <h1 className="
            text-3xl font-bold
            text-primary
          ">
            Expense Management
          </h1>




          {/* BUTTON */}
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




        {/* ANALYTICS */}
        <div className="
          grid grid-cols-1
          md:grid-cols-3
          gap-5 mb-8
        ">

          {/* TOTAL */}
          <div className="
            bg-white p-6
            rounded-xl shadow-md
          ">

            <h2 className="text-gray-500">

              {showPrevious
                ? "Previous Expenses"
                : "Current Month Expense"}

            </h2>

            <p className="
              text-4xl font-bold
              text-red-500 mt-2
            ">
              ₹ {totalExpense}
            </p>

          </div>




          {/* FUEL */}
          <div className="
            bg-white p-6
            rounded-xl shadow-md
          ">

            <h2 className="text-gray-500">
              Fuel Expense
            </h2>

            <p className="
              text-4xl font-bold
              text-yellow-500 mt-2
            ">
              ₹ {fuelExpense}
            </p>

          </div>




          {/* OFFICE */}
          <div className="
            bg-white p-6
            rounded-xl shadow-md
          ">

            <h2 className="text-gray-500">
              Office Expense
            </h2>

            <p className="
              text-4xl font-bold
              text-blue-500 mt-2
            ">
              ₹ {officeExpense}
            </p>

          </div>

        </div>




        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-white p-6
            rounded-xl shadow-md
            grid grid-cols-1
            md:grid-cols-2
            lg:grid-cols-5
            gap-5
          "
        >

          {/* TITLE */}
          <input
            type="text"
            name="expenseTitle"
            placeholder="Expense Title"
            value={formData.expenseTitle}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />




          {/* TYPE */}
          <select
            name="expenseType"
            value={formData.expenseType}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          >

            <option>Fuel</option>

            <option>
              Office Rent
            </option>

            <option>Salary</option>

            <option>Internet</option>

            <option>Toll</option>

            <option>Repair</option>

            <option>
              Electricity
            </option>

            <option>
              Maintenance
            </option>

            <option>Other</option>

          </select>




          {/* AMOUNT */}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="
              border p-3 rounded-lg
            "
          />




          {/* NOTE */}
          <input
            type="text"
            name="note"
            placeholder="Note"
            value={formData.note}
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
            Add Expense
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
                  Title
                </th>

                <th className="text-left p-3">
                  Type
                </th>

                <th className="text-left p-3">
                  Amount
                </th>

                <th className="text-left p-3">
                  Note
                </th>

                <th className="text-left p-3">
                  Date
                </th>

                <th className="text-left p-3">
                  Action
                </th>

              </tr>

            </thead>




            <tbody>

              {filteredExpenses.map(
                (expense) => (

                <tr
                  key={expense._id}
                  className="border-b"
                >

                  <td className="p-3">
                    {expense.expenseTitle}
                  </td>

                  <td className="p-3">
                    {expense.expenseType}
                  </td>

                  <td className="
                    p-3 text-red-500
                    font-semibold
                  ">
                    ₹ {expense.amount}
                  </td>

                  <td className="p-3">
                    {expense.note}
                  </td>

                  <td className="p-3">

                    {new Date(
                      expense.date
                    ).toLocaleDateString()}

                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        deleteExpense(
                          expense._id
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

export default Expenses;