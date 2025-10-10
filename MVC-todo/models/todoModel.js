// models/todoModel.js
const fs = require("fs");
const path = require("path");

// Path to db.json file
const dbPath = path.join(__dirname, "../db.json");

// Read all todos
function readTodos() {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data).todos;
}

// Write todos to file
function writeTodos(todos) {
  const data = { todos };
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = { readTodos, writeTodos };
