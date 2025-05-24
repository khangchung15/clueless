# Clueless

A word guessing game where you give clues to an AI and try to make it guess your word.

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

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

## How to Play

1. The game will generate a random word for you
2. Give a clue to help the AI guess the word
3. The AI will try to guess based on your clue
4. If the AI guesses correctly, you win!
5. If not, you can give another clue

## Development

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- AI: Ollama with Mistral model

## Note

This game requires Ollama to be running locally on your machine. The backend connects to `http://localhost:11434` to communicate with Ollama.

## License

MIT

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start both servers:
```