import express from "express";

import {
  addMaintenance,
  getMaintenance,
  updateMaintenanceStatus,
  deleteMaintenance,
} from "../controllers/maintenanceController.js";

const router = express.Router();



// ADD
router.post(
  "/",
  addMaintenance
);



// GET
router.get(
  "/",
  getMaintenance
);



// UPDATE STATUS
router.put(
  "/:id",
  updateMaintenanceStatus
);



// DELETE
router.delete(
  "/:id",
  deleteMaintenance
);



export default router;