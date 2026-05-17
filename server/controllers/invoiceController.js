import Invoice from "../models/Invoice.js";
import Truck from "../models/Truck.js";


// ADD INVOICE
export const addInvoice = async (req, res) => {

  try {

    const invoice = await Invoice.create(req.body);

    res.status(201).json({
      success: true,
      message: "Invoice Created",
      invoice,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// GET INVOICES
export const getInvoices = async (req, res) => {

  try {

    const invoices = await Invoice.find()
      .sort({ createdAt: -1 });

    res.status(200).json(invoices);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// MARK AS PAID
export const markAsPaid =
  async (req, res) => {

    try {

      // invoice find
      const invoice =
        await Invoice.findById(
          req.params.id
        );




      // invoice not found
      if (!invoice) {

        return res.status(404).json({
          message:
            "Invoice not found",
        });
      }




      // truck number check
      if (!invoice.truckNumber) {

        return res.status(400).json({
          message:
            "Truck number missing in invoice",
        });
      }




      // already paid
      if (
        invoice.status === "Paid"
      ) {

        return res.status(400).json({
          message:
            "Already Paid",
        });
      }




      // update invoice
      invoice.status = "Paid";

      await invoice.save();




      // AUTO REVENUE UPDATE
      await Truck.findOneAndUpdate(

        {
          truckNumber:
            invoice.truckNumber,
        },

        {
          $inc: {
            totalRevenue:
              invoice.amount,

            monthlyRevenue:
              invoice.amount,

            yearlyRevenue:
              invoice.amount,
          },
        }

      );




      res.status(200).json({
        success: true,
        message:
          "Invoice Paid",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }
  };




// DELETE INVOICE
export const deleteInvoice = async (req, res) => {

  try {

    await Invoice.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Invoice Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};