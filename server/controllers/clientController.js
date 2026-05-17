import Client from "../models/Client.js";


// ADD CLIENT
export const addClient = async (req, res) => {

  try {

    const client = await Client.create(req.body);

    res.status(201).json({
      success: true,
      message: "Client Added",
      client,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET CLIENTS
export const getClients = async (req, res) => {

  try {

    const clients = await Client.find();

    res.status(200).json(clients);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// DELETE CLIENT
export const deleteClient = async (req, res) => {

  try {

    await Client.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Client Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};