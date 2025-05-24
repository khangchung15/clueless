<script lang="ts">
  export let word: string = '';
</script>

<div class="word-display">
  <h2>Your Word:</h2>
  <p class="word">{word}</p>
</div>

<style>
  .word-display {
    padding: 1rem;
    border-radius: 8px;
    background-color: #f3f4f6;
    text-align: center;
  }

  .word {
    font-size: 2rem;
    font-weight: bold;
    color: #1f2937;
  }
</style> 