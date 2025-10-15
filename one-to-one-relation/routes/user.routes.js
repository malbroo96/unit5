import express from "express";
import { User } from "../models/user.model.js";
const router = express.Router();

// Add User
router.post("/add-user", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
