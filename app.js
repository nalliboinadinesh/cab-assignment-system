const express = require("express");

const app = express();

app.use(express.json());

const driverRoutes = require("./routes/driverRoutes");
const rideRoutes = require("./routes/rideRoutes");

app.use("/api/drivers", driverRoutes);
app.use("/api/rides", rideRoutes);


module.exports = app;
