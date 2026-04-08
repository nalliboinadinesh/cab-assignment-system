const driverModel = require("../models/driverModel");
const rideModel = require("../models/rideModel");
const calculateDistance = require("../utils/distance");

exports.requestRide = async (req, res) => {
  try {
    const { x, y } = req.body;

   
    if (x === undefined || y === undefined) {
      return res.status(400).json({
        message: "Missing required fields: x, y"
      });
    }

    
    if (typeof x !== "number" || typeof y !== "number") {
      return res.status(400).json({
        message: "Invalid data types: x (number), y (number)"
      });
    }

    const drivers = await driverModel.getAvailableDrivers();

    if (drivers.length === 0) {
      return res.status(404).json({ message: "No drivers available" });
    }

    let nearestDriver = null;
    let minDistance = Infinity;

    drivers.forEach((driver) => {
      const distance = calculateDistance(
        x,
        y,
        driver.x_coordinate,
        driver.y_coordinate
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestDriver = driver;
      }
    });

    await driverModel.updateDriverAvailability(nearestDriver.id, false);
    await rideModel.createRide(x, y, nearestDriver.id);

    res.json({
      message: "Driver assigned",
      driver: nearestDriver,
      distance: minDistance
    });

  } catch (err) {
    res.status(500).json(err);
  }
};