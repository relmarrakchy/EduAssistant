# EduAssistant - DeepAgent Architecture Demo

<div align="center">
  <h3>A demonstration of DeepAgent Architecture with LangChain</h3>
</div>

## 📌 Overview

This project is a demonstration of building a complex **DeepAgent architecture** using [LangChain](https://js.langchain.com/) and the [deepagents](https://www.npmjs.com/package/deepagents) package. 

It is currently in its **testing phase**, implemented as a terminal-based conversational app. It showcases the ability for an agent to:
- Act as a smart assistant with a specific behavioral persona.
- Route intents to specialized **sub-agents** (e.g., \courseGenerator\, \lashCardsGenerator\).
- Stream the internal "thought process" (tool invocation requests) and the final response completely in real-time.

## 🚀 Features
- **Real-Time Streaming:** Watch the agent formulate its thoughts and JSON payloads instantly rather than waiting for a full completion.
- **Sub-Agent Delegation:** Uses distinct agents to generate Course Outlines and Flashcards contextually.
- **Color-Coded Terminal App:** Distinguishes human-readable text from tool-call payloads in the terminal.

---

## 🛠️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- \pnpm\ package manager
- Required local or cloud model credentials (e.g., if using Ollama/Devstral locally, make sure they are running, or export API keys accordingly).

### 1. Install Dependencies
Clone the repository and install the dependencies:
\\\ash
pnpm install
\\\

### 2. Configure Your Environment
Depending on the model configured in \src/agents/main.ts\ (e.g., \qwen3.5:397b-cloud\), ensure you have any required API keys mapped in your environment:
\\\ash
# Example if using LangChain with external providers:
export YOUR_API_KEY="..."
\\\
*(If using Ollama natively, make sure the Ollama daemon is running with the specified model).*

---

## 💻 Running the Terminal App (\chat.ts\)

Since the application is in the testing phase, we provide a dedicated terminal script to interface with the agent natively directly from your console.

To launch the real-time terminal chat interface, simply run:

\\\ash
npx ts-node src/agents/chat.ts
\\\

Once started, you will see a \You:\ prompt where you can chat with the agent in real time! You will be able to watch it think, invoke sub-agents, and return customized course outlines or flashcards.

### Commands
- Type \exit\ or \quit\ to stop the application gracefully.

---

## 🤝 Contributing

**Contributions are warmly welcomed!** 

Whether you want to:
- Help migrate the terminal demo to a full web / REST API using the underlying NestJS structure.
- Add new specialized sub-agents.
- Optimize prompt behaviors.
- Fix bugs!

Feel free to:
1. Fork the project.
2. Create a Feature Branch (\git checkout -b feature/AmazingFeature\).
3. Commit your Changes (\git commit -m 'Add some AmazingFeature'\).
4. Push to the Branch (\git push origin feature/AmazingFeature\).
5. Open a Pull Request.

---
*Built as a Proof-of-Concept for modernized agentic architectures.*
