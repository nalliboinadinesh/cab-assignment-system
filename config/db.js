const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require('path');

let db = null;

async function createDB() {
  if (db) return db;

  db = await open({
    filename: "./ride_system.db",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS drivers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      x_coordinate REAL,
      y_coordinate REAL,
      is_available INTEGER
    );

    CREATE TABLE IF NOT EXISTS rides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_x REAL,
      user_y REAL,
      driver_id INTEGER,
      status TEXT
    );
  `);

  return db;
}

module.exports = createDB;