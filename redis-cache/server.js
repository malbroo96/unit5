const express = require("express");
const { createClient } = require("redis");

const app = express();
app.use(express.json());

// Mock "database"
let items = [
  { id: 1, name: "laptop" },
  { id: 2, name: "phone" },
];

// ✅ Connect to Redis
const redisClient = createClient({
  url: "redis://127.0.0.1:6379", // explicit is better
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

(async () => {
  await redisClient.connect();
  console.log("✅ Connected to Redis");
})();

const CACHE_KEY = "items:all";

// ✅ GET — read from cache or fallback to items
app.get("/items", async (req, res) => {
  try {
    const cachedData = await redisClient.get(CACHE_KEY);

    if (cachedData) {
      console.log("🧠 Cache hit");
      return res.json(JSON.parse(cachedData));
    }

    console.log("💾 Cache miss! Fetching from 'database'...");
    const data = items;

    // store in cache for 60 seconds
    await redisClient.set(CACHE_KEY, JSON.stringify(data), { EX: 60 });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// ✅ POST — add new item & invalidate cache
app.post("/items", async (req, res) => {
  const newItem = { id: Date.now(), name: req.body.name };
  items.push(newItem);

  await redisClient.del(CACHE_KEY);
  console.log("🗑️ Cache invalidated after POST");

  res.status(201).json(newItem);
});

// ✅ PUT — update item & invalidate cache
app.put("/items/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) return res.status(404).send("Item not found");

  items[index].name = req.body.name;

  await redisClient.del(CACHE_KEY);
  console.log("🗑️ Cache invalidated after PUT");

  res.json(items[index]);
});

// ✅ DELETE — remove item & invalidate cache
app.delete("/items/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter((item) => item.id !== id);

  await redisClient.del(CACHE_KEY);
  console.log("🗑️ Cache invalidated after DELETE");

  res.json({ message: "Item deleted" });
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
