import express from "express";

import {
  addTruck,
  getAllTrucks,
  updateTruck,
  deleteTruck,
} from "../controllers/truckController.js";

const router = express.Router();



// ADD TRUCK
router.post("/", addTruck);



// GET ALL TRUCKS
router.get("/", getAllTrucks);



// UPDATE TRUCK
router.put("/:id", updateTruck);



// DELETE TRUCK
router.delete("/:id", deleteTruck);



export default router;