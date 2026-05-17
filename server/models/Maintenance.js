import mongoose from "mongoose";

const maintenanceSchema =
  new mongoose.Schema(
    {
      truckNumber: {
        type: String,
        required: true,
      },

      maintenanceType: {
        type: String,
        required: true,
      },

      cost: {
        type: Number,
        required: true,
      },

      maintenanceDate: {
        type: Date,
        required: true,
      },

      status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending",
      },
    },
    { timestamps: true }
  );

const Maintenance = mongoose.model(
  "Maintenance",
  maintenanceSchema
);

export default Maintenance;