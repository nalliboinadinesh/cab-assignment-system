const createDB = require("../config/db");

exports.createRide = async (userX, userY, driverId) => {
  const db = await createDB();

  const result = await db.run(
    `INSERT INTO rides (user_x, user_y, driver_id, status)
     VALUES (?, ?, ?, 'assigned')`,
    [userX, userY, driverId]
  );

  return result.lastID;
};