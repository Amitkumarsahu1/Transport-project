import express from "express";

import {
  getDashboardStats,
  getRecentShipments,
} from "../controllers/dashboardController.js";

// import {
//   getDashboardStats,
// } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/recent-shipments", getRecentShipments);

export default router;