import express from "express";
import { connectDB } from "./db.js";
import userRoutes from "./routes/user.routes.js";
import profileRoutes from "./routes/profile.routes.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/api", userRoutes);
app.use("/api", profileRoutes);

app.listen(8080, () => console.log("Server running on port 8080"));
