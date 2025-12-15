import redis from "./redis/redisClient.js";
import { embedText } from "./services/embedding.service.js";
import { searchQdrant } from "./services/quadrant.service.js";
import { askGemini } from "./services/gemini.service.js";

export default function socketHandler(io) {
  io.on("connection", socket => {
    console.log("⚡ New client connected:", socket.id);

    socket.on("chat", async ({ sessionId, message }) => {
      console.log(`[${sessionId}] User says: ${message}`);

      if (!message) return;

      await redis.rPush(`session:${sessionId}`, JSON.stringify({ role: "user", message }));
      await redis.expire(`session:${sessionId}`, 3600);

      const embedding = await embedText(message);
      const context = await searchQdrant(embedding);
      const reply = await askGemini(context, message);

      await redis.rPush(`session:${sessionId}`, JSON.stringify({ role: "bot", message: reply }));
      socket.emit("bot_reply", reply);
    });

    socket.on("reset", async sessionId => {
      await redis.del(`session:${sessionId}`);
    });

    socket.on("disconnect", () => {
      console.log("⚡ Client disconnected:", socket.id);
    });
  });
}
