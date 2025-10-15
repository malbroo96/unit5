const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("connecting to db........");
  await mongoose.connect("mongodb://127.0.0.1:27017/address_management_system");
  console.log("connected to db");
};

module.exports = { connectDB };
