# Lore Seekers: RAG_ENIGMA.v1 🕵️‍♂️🤖

**Lore Seekers: RAG_ENIGMA** is an interactive, text-based Cyberpunk detective mystery game powered by Generative AI and Retrieval-Augmented Generation (RAG). 

You play as a detective in the year 2084, navigating the neon-lit streets of Neo-Tokyo. Using a neural terminal, you interact directly with a gritty AI partner (powered by Google's Gemini API) to interrogate suspects, analyze crime scenes, and decrypt classified Arasaka-X files to solve the murder of Kenji Sato.

### ✨ Features
- **Neural Chat Interface:** Conversational AI gameplay where an LLM dynamically stays in-character to answer questions based on the local lore database (RAG).
- **Evidence Log:** Discover and track physical evidence found at the crime scenes. Include active scanning mechanics to uncover new clues.
- **Decryption Mini-Game:** Put your hacker skills to the test by cracking password-protected datapads with strict attempt limits before a system wipe.
- **Cyberpunk Aesthetics:** Fully responsive, terminal-inspired user interface crafted with React and pure CSS.

### 🛠️ Tech Stack
- **Frontend:** React + Vite (Framer Motion, Lucide Icons)
- **Backend:** Node.js + Express
- **AI Engine:** Google Gemini (2.5-Flash)
- **Database:** Local JSON RAG Storage

### 🚀 Getting Started

1. Clone the repository and install dependencies in both the `frontend` and `backend` folders.
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. Create a `.env` file in the `backend` folder and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=5000
   ```
3. Start both development servers:
   ```bash
   # In backend terminal
   npm run dev
   # In frontend terminal
   npm run dev
   ```

---
*Developed by Salih.*
