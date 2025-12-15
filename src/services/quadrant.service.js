import { QdrantClient } from "@qdrant/js-client-rest";
import { config } from "../config/env.js";

const client = new QdrantClient({
  url: config.qdrantUrl
});

export async function searchQdrant(vector) {
  const result = await client.search("news", {
    vector,
    limit: 3
  });

  return result.map(point => point.payload.text);
}
