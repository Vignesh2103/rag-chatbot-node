import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import socketHandler from "./socket.js";
import sessionRoutes from "./routes/session.routes.js";
import { config } from "./config/env.js";
import { initRedis } from "./redis/redisClient.js"; // ✅ ADD THIS

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- ROUTES ---------- */
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/session", sessionRoutes);

/* ---------- SERVER & SOCKET ---------- */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

socketHandler(io);

/* ---------- START ---------- */
const PORT = config.port || 3000;

async function startServer() {
  // 🔹 Initialize Redis (safe – will not crash app)
  await initRedis();

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Backend running on port ${PORT}`);
  });
}

startServer();
