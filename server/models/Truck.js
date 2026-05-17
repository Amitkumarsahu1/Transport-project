import mongoose from "mongoose";

const truckSchema = new mongoose.Schema(
  {
    truckNumber: {
      type: String,
      required: true,
    },

    driverName: {
      type: String,
      required: true,
    },

    capacity: {
      type: String,
      required: true,
    },

    truckType: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    currentLocation: {
      type: String,
      default: "Unknown",
    },



    // REVENUE
    monthlyRevenue: {
      type: Number,
      default: 0,
    },

    yearlyRevenue: {
      type: Number,
      default: 0,
    },

    totalRevenue: {
      type: Number,
      default: 0,
    },



    // MAINTENANCE
    maintenanceCost: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);

const Truck = mongoose.model(
  "Truck",
  truckSchema
);

export default Truck;