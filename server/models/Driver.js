import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    licenseNumber: {
      type: String,
      required: true,
    },

    assignedTruck: {
      type: String,
      default: "Not Assigned",
    },

    address: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;