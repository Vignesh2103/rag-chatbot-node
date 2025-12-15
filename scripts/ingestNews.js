import fs from "fs";
import axios from "axios";
import { embedText } from "../src/services/embedding.service.js";

const articles = JSON.parse(
  fs.readFileSync("./data/news.json", "utf-8")
);

for (const article of articles) {
  const vector = await embedText(article.text);

  await axios.put("http://qdrant:6333/collections/news/points", {
    points: [
      {
        id: article.id,
        vector,
        payload: {
          text: article.text
        }
      }
    ]
  });
}

console.log("News data ingested into Qdrant");
