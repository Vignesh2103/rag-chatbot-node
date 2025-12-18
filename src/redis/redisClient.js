import { createClient } from "redis";
import { config } from "../config/env.js";

let redisClient = null;

const isTLS = config.redisUrl.startsWith("rediss://");

export async function initRedis() {
  if (!config.redisUrl) {
    console.warn("⚠️ Redis disabled (no REDIS_URL)");
    return null;
  }

 redisClient = createClient({
  url: config.redisUrl,
  socket: {
    tls: isTLS,
    rejectUnauthorized: false,
    reconnectStrategy: retries => Math.min(retries * 1000, 5000)
  }
});

  redisClient.on("ready", () => console.log("✅ Redis connected"));
  redisClient.on("error", err =>
    console.error("❌ Redis error:", err.message)
  );

  try {
    await redisClient.connect();
    return redisClient;
  } catch (err) {
    console.error("❌ Redis connection failed:", err.message);
    return null; // DO NOT crash app
  }
}

export function getRedis() {
  return redisClient;
}
