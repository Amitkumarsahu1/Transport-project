import Shipment from "../models/Shipment.js";

import Invoice from "../models/Invoice.js";




// ADD SHIPMENT
export const addShipment =
  async (req, res) => {

    try {

      const shipment =
        await Shipment.create(
          req.body
        );




      res.status(201).json({

        success: true,

        message:
          "Shipment Added",

        shipment,

      });

    } catch (error) {

      res.status(500).json({

        message: error.message,

      });

    }
  };




// GET SHIPMENTS
export const getShipments =
  async (req, res) => {

    try {

      const shipments =
        await Shipment.find().sort({

          createdAt: -1,

        });




      res.status(200).json(
        shipments
      );

    } catch (error) {

      res.status(500).json({

        message: error.message,

      });

    }
  };




// UPDATE SHIPMENT
export const updateShipment =
  async (req, res) => {

    try {

      const shipment =
        await Shipment.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );




      res.status(200).json({

        success: true,

        message:
          "Shipment Updated",

        shipment,

      });

    } catch (error) {

      res.status(500).json({

        message: error.message,

      });

    }
  };




// MARK COMPLETE
export const markShipmentComplete =
  async (req, res) => {

    try {

      // FIND SHIPMENT
      const shipment =
        await Shipment.findById(
          req.params.id
        );




      // NOT FOUND
      if (!shipment) {

        return res.status(404).json({

          message:
            "Shipment not found",

        });
      }




      // CANCELLED CHECK
      if (
        shipment.status ===
        "Cancelled"
      ) {

        return res.status(400).json({

          message:
            "Cancelled shipment cannot be completed",

        });
      }




      // ALREADY DELIVERED
      if (
        shipment.status ===
        "Delivered"
      ) {

        return res.status(400).json({

          message:
            "Already Delivered",

        });
      }




      // UPDATE STATUS
      shipment.status =
        "Delivered";

      await shipment.save();




      // AUTO CREATE INVOICE
      const invoice =
        await Invoice.create({

          invoiceNumber:
            `INV-${Date.now()}`,

          clientName:
            shipment.clientName,

          truckNumber:
            shipment.assignedTruck,

          amount:
            shipment.revenue,

          dueDate:
            new Date(),

          status:
            "Pending",

        });




      res.status(200).json({

        success: true,

        message:
          "Shipment Completed & Invoice Created",

        invoice,

      });

    } catch (error) {

      res.status(500).json({

        message: error.message,

      });

    }
  };




// DELETE SHIPMENT
export const deleteShipment =
  async (req, res) => {

    try {

      await Shipment.findByIdAndDelete(
        req.params.id
      );




      res.status(200).json({

        success: true,

        message:
          "Shipment Deleted",

      });

    } catch (error) {

      res.status(500).json({

        message: error.message,

      });

    }
  };