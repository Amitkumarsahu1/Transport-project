import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    contactPerson: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model(
  "Client",
  clientSchema
);

export default Client;