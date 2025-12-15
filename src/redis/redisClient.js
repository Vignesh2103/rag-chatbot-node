import { createClient } from "redis";
import { config } from "../config/env.js";

if (!config.redisUrl) {
  throw new Error("REDIS_URL is not defined in .env");
}

const redisClient = createClient({
  url: config.redisUrl,
  socket: {
    reconnectStrategy: retries => (retries > 10 ? new Error("Too many retries") : 1000)
  }
});

redisClient.on("connect", () => console.log("Redis connected"));
redisClient.on("ready", () => console.log("Redis ready"));
redisClient.on("error", err => console.error("Redis Error:", err));
redisClient.on("end", () => console.log("Redis connection closed"));

try {
  await redisClient.connect();
} catch (err) {
  console.error("Failed to connect to Redis:", err);
  process.exit(1);
}

export default redisClient;
