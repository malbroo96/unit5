const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch {
    res.status(401);
    throw new Error("Invalid or expired token");
  }
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Access denied");
    }
    next();
  };
};

module.exports = { authenticate, authorize };
