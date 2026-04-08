const driverModel = require("../models/driverModel");

exports.addDriver = async (req, res) => {
  try {
    const { name, x, y } = req.body;

    
    if (!name || x === undefined || y === undefined) {
      return res.status(400).json({
        message: "Missing required fields: name, x, y"
      });
    }

    
    if (typeof name !== "string" || typeof x !== "number" || typeof y !== "number") {
      return res.status(400).json({
        message: "Invalid data types: name (string), x (number), y (number)"
      });
    }

    const id = await driverModel.addDriver(name, x, y);

    res.json({
      message: "Driver added",
      driverId: id
    });

  } catch (err) {
    res.status(500).json(err);
  }
};