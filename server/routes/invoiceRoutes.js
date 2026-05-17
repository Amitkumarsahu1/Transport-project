import express from "express";

import {
  addInvoice,
  getInvoices,
  markAsPaid,
  deleteInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/", addInvoice);

router.get("/", getInvoices);

router.put("/:id/pay", markAsPaid);

router.delete("/:id", deleteInvoice);

export default router;