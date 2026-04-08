const app = require("./app");
const createDB = require("./config/db");

async function startServer() {
  try {
    await createDB(); 
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();