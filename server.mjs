import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import stringSimilarity from 'string-similarity';
import { prompts } from './server-prompts.mjs';

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_API = 'http://localhost:11434/api';
const SIMILARITY_THRESHOLD = 0.8; // Threshold for considering words similar

// Store used words to prevent repetition
const usedWords = new Set();

// Generate a word
app.post('/api/generate-word', async (req, res) => {
  try {
    const { guessedWords = [] } = req.body;
    console.log('Generating word, excluding:', guessedWords); // Debug log

    let word;
    let attempts = 0;
    const maxAttempts = 5;

    // Try to generate a unique word
    while (attempts < maxAttempts) {
      const response = await fetch(`${OLLAMA_API}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'mistral',
          prompt: prompts.generateWord(guessedWords),
          stream: false
        })
      });
      
      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
      }

      const data = await response.json();
      // Clean the response by removing any stars, quotes, or extra text
      word = data.response
        .trim()
        .replace(/^\*\*|\*\*$/g, '') // Remove stars
        .replace(/^"|"$/g, '') // Remove quotes
        .replace(/^The word is:?\s*/i, '') // Remove "The word is:" prefix
        .replace(/\s*\(.*\)$/, '') // Remove parenthetical explanations
        .replace(/[!?.]$/, '') // Remove trailing punctuation
        .trim();

      console.log('Generated word:', word); // Debug log

      // If word is not used before and not in guessed words, add it to used words and return
      if (!usedWords.has(word.toLowerCase()) && !guessedWords.includes(word.toLowerCase())) {
        usedWords.add(word.toLowerCase());
        return res.json({ word });
      }

      attempts++;
      console.log(`Attempt ${attempts} failed, trying again...`); // Debug log
    }

    // If we couldn't generate a unique word after max attempts, clear used words and try one last time
    if (attempts >= maxAttempts) {
      console.log('Max attempts reached, clearing used words and trying one last time'); // Debug log
      usedWords.clear();
      
      const response = await fetch(`${OLLAMA_API}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'mistral',
          prompt: prompts.generateWord(guessedWords),
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      word = data.response
        .trim()
        .replace(/^\*\*|\*\*$/g, '')
        .replace(/^"|"$/g, '')
        .replace(/^The word is:?\s*/i, '')
        .replace(/\s*\(.*\)$/, '')
        .replace(/[!?.]$/, '')
        .trim();
      
      console.log('Final attempt word:', word); // Debug log

      if (!guessedWords.includes(word.toLowerCase())) {
        usedWords.add(word.toLowerCase());
        return res.json({ word });
      } else {
        throw new Error('Could not generate a new word after multiple attempts');
      }
    }
  } catch (error) {
    console.error('Error generating word:', error);
    res.status(500).json({ error: error.message || 'Failed to generate word' });
  }
});

// Validate a clue
app.post('/api/validate-clue', async (req, res) => {
  const { clue, currentWord } = req.body;
  
  if (!clue || !currentWord) {
    return res.status(400).json({ error: 'Missing clue or current word' });
  }

  try {
    // Check if the clue is too similar to the current word
    const similarity = stringSimilarity.compareTwoStrings(clue.toLowerCase(), currentWord.toLowerCase());
    if (similarity >= SIMILARITY_THRESHOLD) {
      return res.json({
        isValid: false,
        message: 'That clue is too similar to the word! Try to be more creative with your clues.'
      });
    }

    // Check if the clue is a common misspelling of the word
    const commonMisspellings = {
      'elephant': ['elefant', 'elefent', 'elefunt'],
      'penguin': ['penguine', 'pengwin', 'pengwen'],
      'dolphin': ['dolfin', 'dolphine', 'dolfine'],
      // Add more common misspellings as needed
    };

    const normalizedClue = clue.toLowerCase().trim();
    const normalizedWord = currentWord.toLowerCase().trim();
    
    if (commonMisspellings[normalizedWord]?.includes(normalizedClue)) {
      return res.json({
        isValid: false,
        message: 'That looks like a misspelling of the word! Try to be more creative with your clues.'
      });
    }

    res.json({ isValid: true });
  } catch (error) {
    console.error('Error validating clue:', error);
    res.status(500).json({ error: 'Failed to validate clue' });
  }
});

// Process a clue
app.post('/api/process-clue', async (req, res) => {
  const { clue, previousClues } = req.body;
  
  if (!clue) {
    return res.status(400).json({ error: 'Missing clue' });
  }

  try {
    const response = await fetch(`${OLLAMA_API}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt: prompts.processClue(clue, previousClues || []),
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    const responseText = data.response.trim();
    
    // Parse the response to extract guess and reasoning
    const guessMatch = responseText.match(/Guess: (.*?)(?:\n|$)/);
    const reasoningMatch = responseText.match(/Reasoning: (.*?)(?:\n|$)/);
    
    // Clean the guess by removing any formatting
    const cleanedGuess = guessMatch 
      ? guessMatch[1]
          .trim()
          .replace(/^\*\*|\*\*$/g, '')
          .replace(/^"|"$/g, '')
          .replace(/[!?.]$/, '')
          .trim()
      : 'No guess made';
    
    res.json({
      guess: cleanedGuess,
      response: reasoningMatch ? reasoningMatch[1].trim() : 'No reasoning provided'
    });
  } catch (error) {
    console.error('Error processing clue:', error);
    res.status(500).json({ error: 'Failed to process clue' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 