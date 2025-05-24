const API_URL = 'http://localhost:3000/api';

// This will be implemented later with actual AI integration
export async function generateWord(guessedWords: string[] = []): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/generate-word`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guessedWords })
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate word');
    }
    
    const data = await response.json();
    return data.word;
  } catch (error) {
    console.error('Error generating word:', error);
    throw error;
  }
}

export async function validateClue(clue: string, currentWord: string): Promise<{ isValid: boolean; message?: string }> {
  try {
    const response = await fetch(`${API_URL}/validate-clue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clue, currentWord })
    });
    
    if (!response.ok) {
      throw new Error('Failed to validate clue');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error validating clue:', error);
    throw error;
  }
}

export async function processClue(clue: string, previousClues: string[]): Promise<{ guess: string; response: string }> {
  try {
    const response = await fetch(`${API_URL}/process-clue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clue, previousClues })
    });
    
    if (!response.ok) {
      throw new Error('Failed to process clue');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error processing clue:', error);
    throw error;
  }
} 