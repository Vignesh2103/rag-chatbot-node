import { getRedis } from "./redis/redisClient.js";
import { embedText } from "./services/embedding.service.js";
import { searchQdrant } from "./services/quadrant.service.js";
import { askGemini } from "./services/gemini.service.js";

export default function socketHandler(io) {
  io.on("connection", socket => {
    console.log("⚡ New client connected:", socket.id);

    socket.on("chat", async ({ sessionId, message }) => {
      if (!message || !sessionId) return;

      const redis = getRedis();
      if (!redis) {
        socket.emit("error", "Redis not available");
        return;
      }

      console.log(`[${sessionId}] User says: ${message}`);

      try {
        await redis.rPush(
          `session:${sessionId}`,
          JSON.stringify({ role: "user", message })
        );

        await redis.expire(`session:${sessionId}`, 3600);

        const embedding = await embedText(message);
        const context = await searchQdrant(embedding);
        const reply = await askGemini(context, message);

        await redis.rPush(
          `session:${sessionId}`,
          JSON.stringify({ role: "bot", message: reply })
        );

        socket.emit("bot_reply", reply);
      } catch (err) {
        console.error("❌ Socket Redis error:", err.message);
        socket.emit("error", "Internal server error");
      }
    });

    socket.on("reset", async sessionId => {
      const redis = getRedis();
      if (!redis) return;

      try {
        await redis.del(`session:${sessionId}`);
      } catch (err) {
        console.error("❌ Redis reset error:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
