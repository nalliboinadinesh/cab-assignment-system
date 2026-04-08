const createDB = require("../config/db");

exports.addDriver = async (name, x, y) => {
  const db = await createDB();

  const result = await db.run(
    `INSERT INTO drivers (name, x_coordinate, y_coordinate, is_available)
     VALUES (?, ?, ?, 1)`,
    [name, x, y]
  );

  return result.lastID;
};

exports.getAvailableDrivers = async () => {
  const db = await createDB();

  return await db.all(
    `SELECT * FROM drivers WHERE is_available = 1`
  );
};

exports.updateDriverAvailability = async (driverId, status) => {
  const db = await createDB();

  await db.run(
    `UPDATE drivers SET is_available = ? WHERE id = ?`,
    [status ? 1 : 0, driverId]
  );
};