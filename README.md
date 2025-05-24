# Clueless

Help an AI guess a word given by another AI

## Prerequisites

- Node.js (v18 or higher)
- [Ollama](https://ollama.ai/) installed and running locally
- Mistral model installed in Ollama (`ollama pull mistral`)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/khangchung15/clueless.git
cd clueless
```

2. Install dependencies:
```bash
npm install
```

3. Start Ollama (if not already running):
```bash
ollama serve
```

4. Make sure the Mistral model is available:
```bash
ollama pull mistral
```

## Running the App (Both Servers)

You need to run both the backend and frontend servers at the same time:

### 1. Start the backend server
Open a terminal and run:
```bash
cd clueless-backend
npm install
node server.mjs
```
This will start your backend on http://localhost:3000

### 2. Start the frontend server
Open a **new terminal window/tab** and run:
```bash
cd clueless
npm install
npm run dev
```
This will start the frontend on http://localhost:5173

### 3. Open the app
Go to [http://localhost:5173](http://localhost:5173) in your browser.

## How to Play

1. The AI will generate a random word for you
2. Give a clue to help the AI guess the word
3. The AI will try to guess based on your clue
4. If the AI guesses correctly, you win!
5. If not, you can give another clue
6. If the AI guesses incorrectly after too many clues, you will get less points

## Development

- Frontend: Svelte + TypeScript + Vite
- Backend: Node.js + Express
- AI: Ollama with Mistral model

## Note

This game requires Ollama to be running locally on your machine. The backend connects to `http://localhost:11434` to communicate with Ollama. There is no public or cloud deployment; everything runs on your computer.

## Quick Start

If you want to start both the backend and frontend servers in one command, you can use:

```bash
npm run dev:all
```

This will start both servers concurrently. Make sure Ollama is running first!
