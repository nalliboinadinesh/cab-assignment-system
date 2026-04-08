const express = require("express");
const router = express.Router();
const rideController = require("../controllers/rideController");

router.post("/request-ride", rideController.requestRide);

module.exports = router;