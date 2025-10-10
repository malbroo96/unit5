const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

// Read tickets from db.json
function readTickets() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

// Write tickets to db.json
function writeTickets(tickets) {
  fs.writeFileSync(dbPath, JSON.stringify(tickets, null, 2));
}

module.exports = { readTickets, writeTickets };
