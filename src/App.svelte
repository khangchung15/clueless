<script lang="ts">
  import { onMount } from 'svelte';
  import WordDisplay from './lib/components/WordDisplay.svelte';
  import ClueInput from './lib/components/ClueInput.svelte';
  import AIGuesser from './lib/components/AIGuesser.svelte';
  import { gameStore, SCORING_CONFIG } from './lib/stores/gameStore';
  import { generateWord, validateClue, processClue } from './lib/utils/aiService';

  let currentWord: string = '';
  let isProcessing: boolean = false;
  let errorMessage: string | null = null;

  onMount(async () => {
    await startNewRound();
  });

  async function startNewRound() {
    try {
      isProcessing = true;
      errorMessage = null;
      const guessedWords = Array.from($gameStore.guessedWords);
      currentWord = await generateWord(guessedWords);
      gameStore.startGame(currentWord);
    } catch (error) {
      errorMessage = 'Failed to start a new round. Please try again.';
      console.error('Error starting new round:', error);
    } finally {
      isProcessing = false;
    }
  }

  async function handleClueSubmit(event: CustomEvent) {
    const { clue, currentWord } = event.detail;
    if (!clue.trim()) return;
    
    isProcessing = true;
    errorMessage = null;
    
    try {
      // First validate the clue
      const validation = await validateClue(clue, currentWord);
      if (!validation.isValid) {
        errorMessage = validation.message;
        return;
      }

      // If valid, add the clue and process it
      gameStore.addClue(clue);
      const { guess, response } = await processClue(clue, $gameStore.clues);
      gameStore.addGuess(guess);

      // Check if the guess is correct
      if (guess.toLowerCase() === currentWord.toLowerCase()) {
        // Calculate points based on number of clues used
        const points = gameStore.calculatePoints($gameStore.clues.length);
        gameStore.addPoints(points);
        gameStore.addGuessedWord(currentWord);
        
        // Create a detailed response message
        let responseMessage = `Correct! You earned ${points} points!`;
        if ($gameStore.clues.length <= SCORING_CONFIG.maxClues) {
          responseMessage += ` (Bonus points for quick guess!)`;
        }
        responseMessage += `\n${response}`;
        
        gameStore.updateResponse(responseMessage);
        gameStore.endGame();
      } else {
        gameStore.updateResponse(response);
      }
    } catch (error) {
      errorMessage = 'An error occurred while processing your clue. Please try again.';
      console.error('Error processing clue:', error);
    } finally {
      isProcessing = false;
    }
  }
</script>

<main class="container">
  <h1>Word Guessing Game</h1>
  
  <div class="score-display">
    Points: {$gameStore.points}
    <div class="scoring-info">
      Quick guess (≤{SCORING_CONFIG.maxClues} clues): {SCORING_CONFIG.basePoints + SCORING_CONFIG.bonusPoints} points
      <br>
      Otherwise: {SCORING_CONFIG.basePoints} points - {SCORING_CONFIG.penaltyPerClue} per extra clue
    </div>
  </div>
  
  <div class="game-container">
    {#if isProcessing && !currentWord}
      <div class="loading-message">
        Starting new game...
      </div>
    {:else}
      <WordDisplay word={currentWord} />
    {/if}
    
    {#if errorMessage}
      <div class="error-message">
        {errorMessage}
      </div>
    {/if}
    
    {#if $gameStore.isGameOver}
      <button 
        class="next-word-btn" 
        on:click={startNewRound}
        disabled={isProcessing}
      >
        {#if isProcessing}
          Loading...
        {:else}
          Next Word
        {/if}
      </button>
    {:else}
      <ClueInput 
        on:submit={handleClueSubmit} 
        {currentWord} 
        {isProcessing}
      />
    {/if}
    
    <AIGuesser 
      guesses={$gameStore.guesses}
      currentResponse={$gameStore.currentResponse}
    />
  </div>
</main>

<style>
  :global(body) {
    background-color: #C2C1C2;
    color: #A18276;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    text-align: center;
    color: #42213D;
    margin-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: bold;
  }

  .score-display {
    text-align: center;
    font-size: 1.5rem;
    color: #42213D;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  .game-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #42213D;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  .error-message {
    background-color: #683257;
    color: #C2C1C2;
    padding: 1rem;
    border-radius: 8px;
    margin: 0.5rem 0;
    text-align: center;
  }

  .loading-message {
    background-color: #683257;
    color: #C2C1C2;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    font-style: italic;
  }

  .next-word-btn {
    background-color: #42213D;
    color: #C2C1C2;
    padding: 1rem 2rem;
    border: 2px solid #683257;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
  }

  .next-word-btn:hover:not(:disabled) {
    background-color: #683257;
  }

  .next-word-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .scoring-info {
    font-size: 0.9rem;
    color: #683257;
    margin-top: 0.5rem;
    font-style: italic;
  }
</style>
