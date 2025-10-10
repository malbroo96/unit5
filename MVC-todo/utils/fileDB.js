// Handles reading and writing to db.json safely
const fs = require("fs").promises;
const path = require("path");

// Define the path to the db.json file
const DB_PATH = path.join(__dirname, "..", "db.json");

// Function to read data from db.json
async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    // If file not found, create an empty one
    if (err.code === "ENOENT") {
      const initialData = { todos: [] };
      await writeDB(initialData);
      return initialData;
    } else {
      throw err;
    }
  }
}

// Function to write updated data back to db.json
async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = { readDB, writeDB };
