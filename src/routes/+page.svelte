<script lang="ts">
  import { onMount } from 'svelte';
  import WordDisplay from '$lib/components/WordDisplay.svelte';
  import ClueInput from '$lib/components/ClueInput.svelte';
  import AIGuesser from '$lib/components/AIGuesser.svelte';
  import { gameStore } from '$lib/stores/gameStore';
  import { generateWord, processClue } from '$lib/utils/aiService';

  let currentWord: string = '';

  onMount(async () => {
    // Start a new game when the page loads
    currentWord = await generateWord();
    gameStore.startGame(currentWord);
  });

  async function handleClueSubmit(event: CustomEvent) {
    const { clue } = event.detail;
    gameStore.addClue(clue);
    
    const { guess, response } = await processClue(clue, $gameStore.clues);
    gameStore.addGuess(guess);
    gameStore.updateResponse(response);
  }
</script>

<main class="container">
  <h1>Word Guessing Game</h1>
  
  <div class="game-container">
    <WordDisplay word={currentWord} />
    
    <ClueInput on:submit={handleClueSubmit} />
    
    <AIGuesser 
      guesses={$gameStore.guesses}
      currentResponse={$gameStore.currentResponse}
    />
  </div>
</main>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    text-align: center;
    color: #1f2937;
    margin-bottom: 2rem;
  }

  .game-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
</style> 