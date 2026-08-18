import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"; // ✅ ADD THIS
import { fileURLToPath } from 'url'; // ✅ ADD THIS

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";


dotenv.config();

const PORT = process.env.PORT || 5000;


// ✅ ADD THIS for ES modules (since you're using import)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(cookieParser());

// ✅ CORS from environment variable
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



// ✅ ADD THIS - Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});





server.listen(PORT, () => {
  console.log("Server running on PORT:" + PORT);
  connectDB();
});