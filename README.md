# Clueless - Word Guessing Game

A fun word guessing game where you provide clues to help an AI guess the word.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start locally:
```bash
npm run dev:all
```

This will start both:
- Frontend server (Vite) on http://localhost:5173
- Backend server (Node) on http://localhost:3000

## Deployment

The game is automatically deployed to GitHub Pages when changes are pushed to the main branch.

Visit the deployed version at: https://khangchung15.github.io/clueless/

## Development vs Production

- Local development uses `npm run dev:all` which runs both frontend and backend servers
- Production deployment only includes the frontend (static files)
- The backend server needs to be hosted separately for production use

## Technologies Used

- Frontend: Svelte + Vite
- Backend: Node.js
- AI: Ollama with Mistral model

