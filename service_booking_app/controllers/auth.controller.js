const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { createAccessToken, createRefreshToken } = require("../utils/jwt");

// Signup
exports.signup = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  res.status(201).json({ message: "User registered successfully", user });
});

// Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Invalid credentials");

  const accessToken = createAccessToken({ id: user._id, role: user.role });
  const refreshToken = createRefreshToken({ id: user._id });

  user.refreshTokens.push(refreshToken);
  await user.save();

  res.json({ accessToken, refreshToken });
});

// Refresh token
exports.refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new Error("Refresh token missing");

  const user = await User.findOne({ refreshTokens: refreshToken });
  if (!user) throw new Error("Invalid refresh token");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) throw new Error("Expired or invalid refresh token");

    const newAccessToken = createAccessToken({ id: user._id, role: user.role });
    res.json({ accessToken: newAccessToken });
  });
});
