import axios from "axios";
import { config } from "../config/env.js";

export async function embedText(text) {
  const response = await axios.post(
    "https://api.jina.ai/v1/embeddings",
    {
      model: "jina-embeddings-v2-base-en",
      input: text
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.JINA_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.data[0].embedding;
}
