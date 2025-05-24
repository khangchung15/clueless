<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  let clue: string = '';

  function handleSubmit() {
    if (clue.trim()) {
      dispatch('submit', { clue });
      clue = '';
    }
  }
</script>

<div class="clue-input">
  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="text"
      bind:value={clue}
      placeholder="Enter your clue..."
      class="input"
    />
    <button type="submit" class="submit-btn">Send Clue</button>
  </form>
</div>

<style>
  .clue-input {
    margin: 1rem 0;
  }

  .input {
    width: 100%;
    padding: 0.5rem;
    border: 2px solid #e5e7eb;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  .submit-btn {
    background-color: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .submit-btn:hover {
    background-color: #2563eb;
  }
</style> 