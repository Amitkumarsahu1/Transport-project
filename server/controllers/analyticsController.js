import Truck from "../models/Truck.js";

import Invoice from "../models/Invoice.js";

import Maintenance from "../models/Maintenance.js";



// GET TRUCK ANALYTICS
export const getTruckAnalytics =
  async (req, res) => {

    try {

      // GET ALL TRUCKS
      const trucks =
        await Truck.find();




      // ANALYTICS
      const analytics =
        await Promise.all(

          trucks.map(
            async (truck) => {

              // ======================
              // PAID INVOICE REVENUE
              // ======================

              const invoices =
                await Invoice.find({

                  truckNumber:
                    truck.truckNumber,

                  status: "Paid",

                });




              const totalRevenue =
                invoices.reduce(

                  (acc, item) =>

                    acc + item.amount,

                  0
                );




              // ======================
              // MAINTENANCE COST
              // ======================

              const maintenance =
                await Maintenance.find({

                  truckNumber:
                    truck.truckNumber,

                });




              const maintenanceCost =
                maintenance.reduce(

                  (acc, item) =>

                    acc + item.cost,

                  0
                );




              // ======================
              // PROFIT
              // ======================

              const profit =
                totalRevenue -
                maintenanceCost;




              return {

                truckNumber:
                  truck.truckNumber,

                totalRevenue,

                maintenanceCost,

                profit,

              };
            }
          )
        );




      // ======================
      // TOP PROFITABLE TRUCK
      // ======================

      const topTruck =
        analytics.reduce(

          (prev, current) =>

            prev.profit >
            current.profit

              ? prev
              : current

        );




      // RESPONSE
      res.status(200).json({

        success: true,

        analytics,

        topTruck,

      });

    } catch (error) {

      res.status(500).json({

        message: error.message,

      });

    }
  };