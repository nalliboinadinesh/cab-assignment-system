const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");

router.post("/add-driver", driverController.addDriver);

module.exports = router;