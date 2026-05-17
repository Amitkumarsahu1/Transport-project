import express from "express";

import {
  getTruckAnalytics,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get(
  "/truck-profit",
  getTruckAnalytics
);

export default router;