import express from "express";

import {
  addDriver,
  getDrivers,
  deleteDriver,
} from "../controllers/driverController.js";

const router = express.Router();

router.post("/", addDriver);

router.get("/", getDrivers);

router.delete("/:id", deleteDriver);

export default router;