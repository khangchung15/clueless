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
    padding: 1.5rem;
    background-color: #C2C1C2;
    border-radius: 8px;
    border: 2px solid #683257;
  }

  h2 {
    color: #42213D;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .response {
    margin: 1rem 0;
    padding: 1rem;
    background-color: #42213D;
    border-radius: 8px;
    color: #C2C1C2;
  }

  .response p {
    margin: 0;
  }

  .guesses {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .guess {
    padding: 0.75rem;
    background-color: #42213D;
    border-radius: 8px;
    border: 1px solid #683257;
  }

  .guess-text {
    color: #C2C1C2;
    font-weight: 500;
  }
</style> 