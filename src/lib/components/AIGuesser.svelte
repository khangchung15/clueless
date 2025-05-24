<script lang="ts">
  export let guesses: string[] = [];
  export let currentResponse: string = '';
</script>

<div class="ai-guesser">
  <h2>AI's Guesses</h2>
  <div class="response">
    <p>{currentResponse}</p>
  </div>
  <div class="guesses">
    {#each guesses as guess}
      <div class="guess">
        <span class="guess-text">{guess}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .ai-guesser {
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 8px;
  }

  .response {
    margin: 1rem 0;
    padding: 1rem;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .guesses {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .guess {
    padding: 0.5rem;
    background-color: #e5e7eb;
    border-radius: 4px;
  }

  .guess-text {
    color: #1f2937;
  }
</style> 