import express from "express";
import redis from "../redis/redisClient.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const data = await redis.lRange(`session:${req.params.id}`, 0, -1);
  res.json(data.map(JSON.parse));
});

router.delete("/:id", async (req, res) => {
  await redis.del(`session:${req.params.id}`);
  res.json({ success: true });
});

export default router;
