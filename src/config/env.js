import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  redisUrl: process.env.REDIS_URL,
  qdrantUrl: process.env.QDRANT_URL,
  jinaKey: process.env.JINA_API_KEY,
  geminiKey: process.env.GEMINI_API_KEY
};

if (!config.redisUrl) {
  console.warn("⚠️ REDIS_URL not set. Redis features disabled.");
}

if (!config.qdrantUrl) {
  console.warn("⚠️ QDRANT_URL not set.");
}
