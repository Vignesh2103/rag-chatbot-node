import axios from "axios";
import { embedText } from "../services/embedding.service.js";

const articles = [
  "Apple announced new AI features today.",
  "Stock markets fluctuate amid inflation fears.",
  "OpenAI releases new developer tools."
];

for (let i = 0; i < articles.length; i++) {
  const embedding = await embedText(articles[i]);

  await axios.put("http://qdrant:6333/collections/news/points", {
    points: [
      {
        id: i + 1,
        vector: embedding,
        payload: { text: articles[i] }
      }
    ]
  });
}

console.log("✅ News ingested");
