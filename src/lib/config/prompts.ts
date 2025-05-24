export const prompts = {
  generateWord: `Generate a single word for a word-guessing game. The word should be:
    - A common noun
    - Between 4-8 letters long
    - Something interesting or unique
    - Something that most people would know like a fruit, animal, or object
    - Not a scifi or fantasy or scientific word
    - Only respond with the word, nothing else
    - Do not add any formatting, stars, or punctuation
    - Do not add any explanations or additional text
    
    Examples of bad responses:
    **volcano**
    "penguin"`,

  processClue: (clue: string, previousClues: string[]) => `You are playing a word-guessing game. Your goal is to guess the word based on the clues provided.
    Previous clues:
    ${previousClues.join('\n')}
    New clue: ${clue}
    
    Instructions:
    1. Think carefully about the word based on all clues
    2. Make a specific guess
    3. Explain your reasoning
    
    Respond in this exact format:
    Guess: [your guess]
    Reasoning: [your reasoning]`
}; 