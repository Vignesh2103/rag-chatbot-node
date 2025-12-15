import { QdrantClient } from "@qdrant/js-client-rest";
import { config } from "../config/env.js";

const client = new QdrantClient({ url: config.qdrantUrl });

async function init() {
  const collections = await client.getCollections();
  const exists = collections.collections.find(c => c.name === "news");

  if (!exists) {
    await client.createCollection("news", {
      vectors: {
        size: 768,
        distance: "Cosine"
      }
    });
    console.log("✅ Qdrant collection `news` created");
  } else {
    console.log("ℹ️ Collection `news` already exists");
  }
}

init();
