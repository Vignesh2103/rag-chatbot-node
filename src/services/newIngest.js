import axios from "axios";
import { embedText } from "../src/services/embedding.service.js";

const articles = [
  "Apple released new AI features today.",
  "Stock markets saw volatility amid inflation fears.",
  "OpenAI announced new developer tools."
];

for (let i = 0; i < articles.length; i++) {
  const embedding = await embedText(articles[i]);

  await axios.put("http://localhost:6333/collections/news/points", {
    points: [
      {
        id: i + 1,
        vector: embedding,
        payload: { text: articles[i] }
      }
    ]
  });
}

console.log("News ingested");
