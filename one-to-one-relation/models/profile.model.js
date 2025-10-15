import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  bio: String,
  socialMediaLinks: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // ensures One-to-One
  },
});

export const Profile = mongoose.model("Profile", profileSchema);
