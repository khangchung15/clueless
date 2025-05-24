# Clueless - Word Guessing Game

Help an AI guess the word given in the prompt from another AI

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start both servers:
```bash
npm run dev:all
```

This will start both:
- Frontend server (Vite) on http://localhost:5173
- Backend server (Node) on http://localhost:3000

## Deployment
The game is automatically deployed to GitHub Pages when changes are pushed to the main branch.
Visit the deployed version at: https://khangchung15.github.io/clueless/
If the hosted website does not work, try running it locally

### Deployment Status
- Latest deployment: [View Status](https://github.com/khangchung15/clueless/actions)
- If deployment is queued, please wait a few minutes for GitHub Actions to process

## Development vs Production

- Local development uses `npm run dev:all` which runs both frontend and backend servers
- Production deployment uses a hosted backend service on Render.com
- The frontend is deployed to GitHub Pages

## Technologies Used

- Frontend: Svelte + Vite
- Backend: Node.js + Express
- AI: Ollama with Mistral model
- Hosting: GitHub Pages (frontend) + Render.com (backend)
- CI/CD: GitHub Actions

