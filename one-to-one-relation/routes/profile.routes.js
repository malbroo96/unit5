import express from "express";
import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";
const router = express.Router();

// Add Profile
router.post("/add-profile", async (req, res) => {
  try {
    const { bio, socialMediaLinks, user } = req.body;

    const existingUser = await User.findById(user);
    if (!existingUser)
      return res.status(400).json({ error: "Invalid user ID" });

    const existingProfile = await Profile.findOne({ user });
    if (existingProfile)
      return res
        .status(400)
        .json({ error: "Profile already exists for this user" });

    const profile = await Profile.create({ bio, socialMediaLinks, user });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all profiles with user info
router.get("/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email");
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
