import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    expenseTitle: {
      type: String,
      required: true,
    },



    expenseType: {
      type: String,

      enum: [
        "Fuel",
        "Office Rent",
        "Salary",
        "Internet",
        "Toll",
        "Repair",
        "Electricity",
        "Maintenance",
        "Other",
      ],

      required: true,
    },



    amount: {
      type: Number,
      required: true,
    },



    note: {
      type: String,
      default: "",
    },



    date: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

const Expense = mongoose.model(
  "Expense",
  expenseSchema
);

export default Expense;