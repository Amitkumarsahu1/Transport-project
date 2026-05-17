import Truck from "../models/Truck.js";



// ADD TRUCK
export const addTruck = async (req, res) => {

  try {

    const truck = await Truck.create(req.body);

    res.status(201).json({
      success: true,
      message: "Truck Added",
      truck,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// GET ALL TRUCKS
export const getAllTrucks = async (req, res) => {

  try {

    const trucks = await Truck.find();

    res.status(200).json(trucks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// UPDATE TRUCK
export const updateTruck = async (req, res) => {

  try {

    const truck =
      await Truck.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json({
      success: true,
      message: "Truck Updated",
      truck,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// DELETE TRUCK
export const deleteTruck = async (req, res) => {

  try {

    await Truck.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Truck Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};