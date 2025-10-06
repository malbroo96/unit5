// eventLogger.js
const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");

// create emitter instance
const eventEmitter = new EventEmitter();

// define log file
const logFilePath = path.join(__dirname, "eventLogs.txt");

// when "log" event is emitted, handle it
eventEmitter.on("log", (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  // log to console
  console.log(logMessage);

  // BONUS: also write to a file
  fs.appendFileSync(logFilePath, logMessage);
});

module.exports = eventEmitter;
