import Maintenance from "../models/Maintenance.js";

import Truck from "../models/Truck.js";



// ADD MAINTENANCE
export const addMaintenance =
  async (req, res) => {

    try {

      const maintenance =
        await Maintenance.create(
          req.body
        );




      // AUTO UPDATE TRUCK COST
      await Truck.findOneAndUpdate(

        {
          truckNumber:
            req.body.truckNumber,
        },

        {
          $inc: {
            maintenanceCost:
              req.body.cost,
          },
        }

      );




      res.status(201).json({
        success: true,
        message:
          "Maintenance Added",
        maintenance,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };




// GET MAINTENANCE
export const getMaintenance =
  async (req, res) => {

    try {

      const maintenance =
        await Maintenance.find().sort({
          createdAt: -1,
        });




      res.status(200).json(
        maintenance
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };




// UPDATE STATUS
export const updateMaintenanceStatus =
  async (req, res) => {

    try {

      const maintenance =
        await Maintenance.findByIdAndUpdate(

          req.params.id,

          {
            status:
              req.body.status,
          },

          { new: true }

        );




      res.status(200).json({
        success: true,
        message:
          "Status Updated",
        maintenance,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };




// DELETE MAINTENANCE
export const deleteMaintenance =
  async (req, res) => {

    try {

      const maintenance =
        await Maintenance.findById(
          req.params.id
        );




      // DECREASE COST
      await Truck.findOneAndUpdate(

        {
          truckNumber:
            maintenance.truckNumber,
        },

        {
          $inc: {
            maintenanceCost:
              -maintenance.cost,
          },
        }

      );




      await Maintenance.findByIdAndDelete(
        req.params.id
      );




      res.status(200).json({
        success: true,
        message:
          "Maintenance Deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };