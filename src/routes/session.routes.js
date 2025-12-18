import express from "express";
import { getRedis } from "../redis/redisClient.js";


const router = express.Router();

/* ---------- GET SESSION ---------- */
router.get("/:id", async (req, res) => {
  const redis = getRedis();

  if (!redis) {
    return res.status(503).json({
      error: "Redis not available"
    });
  }

  try {
    const data = await redis.lRange(`session:${req.params.id}`, 0, -1);
    res.json(data.map(JSON.parse));
  } catch (err) {
    console.error("❌ Redis read error:", err.message);
    res.status(500).json({ error: "Failed to fetch session" });
  }
});

/* ---------- DELETE SESSION ---------- */
router.delete("/:id", async (req, res) => {
  const redis = getRedis();

  if (!redis) {
    return res.status(503).json({
      error: "Redis not available"
    });
  }

  try {
    await redis.del(`session:${req.params.id}`);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Redis delete error:", err.message);
    res.status(500).json({ error: "Failed to delete session" });
  }
});

export default router;
