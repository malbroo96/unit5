const express = require("express");
const User = require("../db/model/user");

const userRouter = express.Router();

userRouter.get("/getusers", async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.send(users);
});

userRouter.post("/", async (req, res) => {
  const newuser = req.body;
  console.log(newuser);
  await User.create(newuser);
  res.send("received user");
});

module.exports = userRouter;
