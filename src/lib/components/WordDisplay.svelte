<script lang="ts">
  export let word: string = '';
</script>

<div class="word-display">
  <h2>Your Word:</h2>
  <div class="word-container">
    <p class="word">{word}</p>
  </div>
</div>

<style>
  .word-display {
    padding: 1.5rem;
    border-radius: 8px;
    background-color: #C2C1C2;
    text-align: center;
    border: 2px solid #683257;
  }

  h2 {
    color: #42213D;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .word-container {
    min-height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .word {
    font-size: 2.5rem;
    font-weight: bold;
    color: #A18276;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;
  }
</style> 