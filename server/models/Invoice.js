import mongoose from "mongoose";

const invoiceSchema =
  new mongoose.Schema(
    {
      invoiceNumber: {
        type: String,
        required: true,
      },

      clientName: {
        type: String,
        required: true,
      },



      // TRUCK
      truckNumber: {
        type: String,
        required: true,
      },



      amount: {
        type: Number,
        required: true,
      },

      dueDate: {
        type: Date,
        required: true,
      },

      status: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending",
      },
    },
    { timestamps: true }
  );

const Invoice = mongoose.model(
  "Invoice",
  invoiceSchema
);

export default Invoice;