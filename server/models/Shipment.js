import mongoose from "mongoose";

const shipmentSchema =
  new mongoose.Schema(

    {
      clientName: {
        type: String,
        required: true,
      },

      pickupLocation: {
        type: String,
        required: true,
      },

      dropLocation: {
        type: String,
        required: true,
      },

      materialType: {
        type: String,
        required: true,
      },

      weight: {
        type: String,
        required: true,
      },

      assignedTruck: {
        type: String,
        required: true,
      },

      assignedDriver: {
        type: String,
        required: true,
      },




      // REVENUE
      revenue: {
        type: Number,
        required: true,
        default: 0,
      },




      // STATUS
      status: {
        type: String,

        enum: [
          "Pending",
          "Delivered",
          "Cancelled",
        ],

        default: "Pending",
      },

    },

    { timestamps: true }

  );



const Shipment =
  mongoose.model(
    "Shipment",
    shipmentSchema
  );



export default Shipment;