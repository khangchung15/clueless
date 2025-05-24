<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  let clue: string = '';
  export let currentWord: string = '';
  export let isProcessing: boolean = false;

  function handleSubmit() {
    if (clue.trim()) {
      isProcessing = true;
      dispatch('submit', { clue, currentWord });
      clue = '';
    }
  }
</script>

<div class="clue-input">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="input-container">
      <input
        type="text"
        bind:value={clue}
        placeholder="Enter your clue..."
        class="input"
        disabled={isProcessing}
      />
      <button type="submit" class="submit-btn" disabled={isProcessing}>
        {#if isProcessing}
          AI is thinking...
        {:else}
          Send Clue
        {/if}
      </button>
    </div>
  </form>
</div>

<style>
  .clue-input {
    margin: 1rem 0;
  }

  .input-container {
    display: flex;
    gap: 0.75rem;
  }

  .input {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid #683257;
    border-radius: 8px;
    background-color: #C2C1C2;
    color: #A18276;
    font-size: 1rem;
  }

  .input:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .input::placeholder {
    color: #42213D;
    opacity: 0.7;
  }

  .input:focus {
    outline: none;
    border-color: #42213D;
  }

  .submit-btn {
    background-color: #42213D;
    color: #C2C1C2;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.2s;
    white-space: nowrap;
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .submit-btn:not(:disabled):hover {
    background-color: #683257;
  }
</style> 