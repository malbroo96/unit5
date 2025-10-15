import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
});

export const User = mongoose.model("User", userSchema);
