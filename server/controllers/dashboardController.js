import Truck from "../models/Truck.js";
import Driver from "../models/Driver.js";
import Shipment from "../models/Shipment.js";

export const getDashboardStats = async (req, res) => {

  try {

    // counts
    const totalTrucks = await Truck.countDocuments();

    const totalDrivers = await Driver.countDocuments();

    const totalShipments = await Shipment.countDocuments();

    const deliveredShipments =
      await Shipment.countDocuments({
        status: "Delivered",
      });

    res.status(200).json({
      totalTrucks,
      totalDrivers,
      totalShipments,
      deliveredShipments,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// RECENT SHIPMENTS
export const getRecentShipments = async (req, res) => {

  try {

    const shipments = await Shipment.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(shipments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};