export const prompts = {
  generateWord: (guessedWords = []) => {
    const guessedWordsList = guessedWords.length > 0 
      ? `\nPreviously guessed words (DO NOT use these): ${guessedWords.join(', ')}`
      : '';
    
    return `You are a word generator for a word guessing game. Generate a single word that meets these criteria:
1. Must be a noun (not a verb, adjective, or other part of speech)
2. Must be between 4-12 letters long
3. Must be a common word that most people would know
4. Must be something that can be described with creative clues
5. Must be a single word (not a phrase or multiple words)
6. Must not be a proper noun (no names, places, etc.)
7. Must not be a technical term or jargon
${guessedWordsList}

IMPORTANT:
- Respond with ONLY the word, nothing else
- Do not add any formatting, stars, quotes, or punctuation
- Do not add any explanations or additional text
- Do not use any of the previously guessed words
- Do not use any words that are too similar to previously guessed words

Example good responses:
elephant
penguin
dolphin
umbrella
guitar

Example bad responses (DO NOT USE):
The word is: elephant
"elephant"
*elephant*
elephant (a large animal)
elephant!`;
  },

  processClue: (clue, previousClues) => {
    const previousCluesText = previousClues.length > 0
      ? `\nPrevious clues:\n${previousClues.map((c, i) => `${i + 1}. ${c}`).join('\n')}`
      : '';

    return `You are playing a word guessing game. You will receive clues about a word, and you need to make your best guess.

Current clue: ${clue}
${previousCluesText}

Instructions:
1. Think carefully about all the clues provided
2. Make a specific guess at the word
3. Explain your reasoning clearly
4. Format your response EXACTLY like this:
Guess: [your guess]
Reasoning: [your reasoning for the guess]

Example response:
Guess: elephant
Reasoning: The clues suggest a large animal with a trunk that lives in Africa and Asia.`;
  }
}; 