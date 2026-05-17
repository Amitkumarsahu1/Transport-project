import express from "express";

import {

  addShipment,

  getShipments,

  updateShipment,

  deleteShipment,

  markShipmentComplete,

} from "../controllers/shipmentController.js";



const router =
  express.Router();




// ADD
router.post(
  "/",
  addShipment
);




// GET
router.get(
  "/",
  getShipments
);




// UPDATE
router.put(
  "/:id",
  updateShipment
);




// COMPLETE
router.put(
  "/:id/complete",
  markShipmentComplete
);




// DELETE
router.delete(
  "/:id",
  deleteShipment
);




export default router;