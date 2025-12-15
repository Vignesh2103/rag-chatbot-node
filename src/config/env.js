import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  redisUrl: process.env.REDIS_URL,
  jinaKey: process.env.JINA_API_KEY,
  geminiKey: process.env.GEMINI_API_KEY,
  qdrantUrl: process.env.QDRANT_URL
};
