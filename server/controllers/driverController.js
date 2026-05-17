import Driver from "../models/Driver.js";


// ADD DRIVER
export const addDriver = async (req, res) => {
  try {

    const driver = await Driver.create(req.body);

    res.status(201).json({
      success: true,
      message: "Driver Added",
      driver,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET ALL DRIVERS
export const getDrivers = async (req, res) => {
  try {

    const drivers = await Driver.find();

    res.status(200).json(drivers);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// DELETE DRIVER
export const deleteDriver = async (req, res) => {
  try {

    await Driver.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Driver Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};