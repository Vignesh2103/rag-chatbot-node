import { createClient } from "redis";
import { config } from "../config/env.js";

// Create Redis client
const redisClient = createClient({ url: config.redisUrl });

// Event listeners
redisClient.on("connect", () => console.log("Redis connected"));
redisClient.on("error", (err) => console.error("Redis Error:", err));

// Connect to Redis
await redisClient.connect();

export default redisClient;
