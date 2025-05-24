import { writable } from 'svelte/store';

interface GameState {
  clues: string[];
  guesses: string[];
  currentResponse: string;
  points: number;
  guessedWords: Set<string>;
  isGameOver: boolean;
}

// Scoring configuration
export const SCORING_CONFIG = {
  basePoints: 10,        // Base points for correct guess
  minPoints: 1,         // Minimum points possible
  maxClues: 2,          // Maximum number of clues before minimum points
  bonusPoints: 10,       // Bonus points for quick guesses (under maxClues)
  penaltyPerClue: 2     // Points deducted per clue used
};

function createGameStore() {
  const { subscribe, set, update } = writable<GameState>({
    clues: [],
    guesses: [],
    currentResponse: '',
    points: 0,
    guessedWords: new Set(),
    isGameOver: false
  });

  return {
    subscribe,
    startGame: (word: string) => {
      update(state => ({
        ...state,
        clues: [],
        guesses: [],
        currentResponse: '',
        isGameOver: false
      }));
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
    calculatePoints: (numClues: number): number => {
      if (numClues <= SCORING_CONFIG.maxClues) {
        // Bonus points for quick guesses
        return SCORING_CONFIG.basePoints + SCORING_CONFIG.bonusPoints;
      } else {
        // Calculate points with penalty
        const points = Math.max(
          SCORING_CONFIG.basePoints - ((numClues - SCORING_CONFIG.maxClues) * SCORING_CONFIG.penaltyPerClue),
          SCORING_CONFIG.minPoints
        );
        return points;
      }
    },
    addPoints: (points: number) => {
      update(state => ({
        ...state,
        points: state.points + points
      }));
    },
    addGuessedWord: (word: string) => {
      update(state => ({
        ...state,
        guessedWords: new Set([...state.guessedWords, word.toLowerCase()])
      }));
    },
    endGame: () => {
      update(state => ({
        ...state,
        isGameOver: true
      }));
    },
    reset: () => {
      set({
        clues: [],
        guesses: [],
        currentResponse: '',
        points: 0,
        guessedWords: new Set(),
        isGameOver: false
      });
    }
  };
}

export const gameStore = createGameStore(); 