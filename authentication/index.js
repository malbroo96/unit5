const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { auth } = require("./middleware/auth.middleware");
require("dotenv").config();

const app = express();
app.use(express.json());

// Public routes
app.use("/users", userRouter);

// Protected route example
app.get("/profile", auth, (req, res) => {
  res.send({ msg: `Welcome ${req.user.email}, this is a protected route` });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
    console.log(`Server running on port ${process.env.PORT}`);
  } catch (err) {
    console.log("Error connecting to database:", err);
  }
});
