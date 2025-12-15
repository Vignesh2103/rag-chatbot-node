Project Name: RAG Powered News Chatbot

Description:
This project is a backend service that implements a Retrieval-Augmented Generation (RAG) chatbot.
The chatbot answers user queries by retrieving relevant information from a news dataset and
generating accurate responses using a Large Language Model (Google Gemini).

The system first searches a vector database (Qdrant) to find relevant news content and then
passes that context to the LLM to produce reliable, up-to-date answers.

Key Features:
- Retrieval-Augmented Generation (RAG)
- News-based question answering
- Google Gemini LLM integration
- Vector search using Qdrant
- Session-based chat support
- REST API for frontend integration

Tech Stack:
- Node.js
- Express.js
- Google Gemini API
- Qdrant Vector Database
- Redis (optional for sessions)

Use Case:
Designed for answering questions over news articles with higher accuracy and reduced
hallucinations compared to traditional LLM-only chatbots.




backend/
├── src/
│   ├── routes/
│   │   └── chat.routes.js
│   ├── controllers/
│   │   └── chat.controller.js
│   ├── services/
│   │   ├── gemini.service.js
│   │   ├── embedding.service.js
│   │   ├── rag.service.js
│   │   └── qdrant.service.js
│   ├── utils/
│   │   └── chunkText.js
│   ├── data/
│   │   └── news.json
│   └── app.js
├── .env
├── package.json
└── README.md
