import { writable } from 'svelte/store';

interface GameState {
  currentWord: string;
  clues: string[];
  guesses: string[];
  currentResponse: string;
  isGameActive: boolean;
}

function createGameStore() {
  const { subscribe, set, update } = writable<GameState>({
    currentWord: '',
    clues: [],
    guesses: [],
    currentResponse: '',
    isGameActive: false
  });

  return {
    subscribe,
    startGame: (word: string) => {
      set({
        currentWord: word,
        clues: [],
        guesses: [],
        currentResponse: '',
        isGameActive: true
      });
    },
    addClue: (clue: string) => {
      update(state => ({
        ...state,
        clues: [...state.clues, clue]
      }));
    },
    addGuess: (guess: string) => {
      update(state => ({
        ...state,
        guesses: [...state.guesses, guess]
      }));
    },
    updateResponse: (response: string) => {
      update(state => ({
        ...state,
        currentResponse: response
      }));
    },
    endGame: () => {
      update(state => ({
        ...state,
        isGameActive: false
      }));
    }
  };
}

export const gameStore = createGameStore(); 