// Simple Books API with Redis Cache + Cron Job
// Run these first:
// npm install express mongoose redis node-cron bcryptjs jsonwebtoken dotenv
// Start Redis server: redis-server
// Start MongoDB: mongod

import express from "express";
import mongoose from "mongoose";
import redis from "redis";
import cron from "node-cron";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// ===== MongoDB Setup =====
await mongoose.connect("mongodb://localhost:27017/books_app");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  userId: String,
});

const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);

// ===== Redis Setup =====
const redisClient = redis.createClient();
await redisClient.connect();

// ===== Auth Middleware =====
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Token required");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}

// ===== Signup =====
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashed });
  res.send("User registered");
});

// ===== Login =====
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send("Invalid credentials");
  }
  const token = jwt.sign(
    { id: user._id, username },
    process.env.JWT_SECRET || "secret"
  );
  res.send({ token });
});

// ===== GET Books (with Redis Cache) =====
app.get("/books", auth, async (req, res) => {
  const cacheKey = `books:${req.user.id}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const books = await Book.find({ userId: req.user.id });
  await redisClient.setEx(cacheKey, 60, JSON.stringify(books));
  res.json(books);
});

// ===== POST Book =====
app.post("/books", auth, async (req, res) => {
  const book = await Book.create({ ...req.body, userId: req.user.id });
  await redisClient.del(`books:${req.user.id}`);
  res.json(book);
});

// ===== PUT Book =====
app.put("/books/:id", auth, async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);
  await redisClient.del(`books:${req.user.id}`);
  res.send("Book updated");
});

// ===== DELETE Book =====
app.delete("/books/:id", auth, async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  await redisClient.del(`books:${req.user.id}`);
  res.send("Book deleted");
});

// ===== BULK INSERT =====
app.post("/books/bulk", auth, async (req, res) => {
  const key = `bulk:${req.user.id}`;
  await redisClient.set(key, JSON.stringify(req.body.books));
  res.send("Books will be added later");
});

// ===== CRON JOB (runs every 2 minutes) =====
cron.schedule("*/2 * * * *", async () => {
  const keys = await redisClient.keys("bulk:*");
  for (const key of keys) {
    const userId = key.split(":")[1];
    const books = JSON.parse(await redisClient.get(key));
    await Book.insertMany(books.map((b) => ({ ...b, userId })));
    await redisClient.del(key);
    console.log(`Inserted bulk books for user ${userId}`);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
