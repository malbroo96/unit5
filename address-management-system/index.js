const express = require("express");
const { connectDB } = require("./db/db");
const userRouter = require("./controllers/userController");

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("server up and running successfully");
});

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("base route");
});

app.listen(8080, async () => {
  await connectDB();
  console.log("server runnning on port 8080");
});
