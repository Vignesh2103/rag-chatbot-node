import { createClient } from "redis";
import { config } from "../config/env.js";

let redisClient = null;

export async function initRedis() {
  if (!config.redisUrl) {
    console.warn("⚠️ REDIS_URL not set. Redis features disabled.");
    return null;
  }

  const isTLS = config.redisUrl.startsWith("rediss://");

  redisClient = createClient({
    url: config.redisUrl,
    socket: {
      tls: isTLS,
      rejectUnauthorized: false,
      reconnectStrategy: retries => Math.min(retries * 1000, 5000),
    },
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
    return null;
  }
}

export function getRedis() {
  return redisClient;
}
