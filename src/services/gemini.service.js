import axios from "axios";
import { config } from "../config/env.js";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

export async function askGemini(context, question) {
  const res = await axios.post(`${GEMINI_URL}?key=${config.geminiKey}`, {
    contents: [
      {
        parts: [
          {
            text: `
Use the following news context to answer the question.

Context:
${context}

Question:
${question}
`,
          },
        ],
      },
    ],
  });

  return res.data.candidates[0].content.parts[0].text;
}
