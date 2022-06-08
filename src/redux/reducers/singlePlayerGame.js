import {
  SCORE_SINGLE_PLAYER,
  START_SINGLE_PLAYER,
  END_SINGLE_PLAYER,
  CREATE_SINGLE_PLAYER,
  RESTART_SINGLE_PLAYER,
  EXIT_SINGLE_PLAYER,
} from "../actions";
import { newDeck, updateCards } from "../../util/gameLogic";

const initialState = {
  active: false,
  game: null,
};

export default function singlePlayerGame(state = initialState, action) {
  switch (action.type) {
    case CREATE_SINGLE_PLAYER: {
      const gameOptions = action.payload.gameOptions;
      const deckOptions = action.payload.deckOptions;
      const [cardsInPlay, initialDeck] = newDeck(deckOptions);
      const game = {
        cardsInPlay: cardsInPlay,
        deck: initialDeck,
        options: gameOptions,
        stats: {
          score: 0,
        },
        isOver: false,
      };
      return {
        ...state,
        game: game,
      };
    }

    case START_SINGLE_PLAYER: {
      return {
        ...state,
        active: true,
      };
    }

    case RESTART_SINGLE_PLAYER: {
      const { gameOptions, deckOptions } = action.payload;
      const [cardsInPlay, initialDeck] = newDeck(deckOptions);
      const game = {
        cardsInPlay: cardsInPlay,
        deck: initialDeck,
        options: gameOptions,
        stats: {
          score: 0,
        },
        isOver: false,
        active: true,
      };
      return {
        ...state,
        game: game,
      };
    }

    case EXIT_SINGLE_PLAYER: {
      const game = { ...state.game, isOver: true };
      return {
        ...state,
        game: game,
        active: false,
      };
    }
    case SCORE_SINGLE_PLAYER: {
      const set = action.payload.cardsToScore;
      const cardsInPlay = state.game.cardsInPlay;
      const timeToFind = action.payload.timeToFind;
      const deck = state.game.deck;
      const gameMode = state.game.options.gameMode;
      let updatedStats = state.game.stats;
      let updatedGame = state.game;
      switch (gameMode) {
        case "standard": {
          const [updatedCardsInPlay, updatedDeck, isGameOver] = updateCards(
            cardsInPlay,
            deck,
            set,
            false
          );
          updatedStats.score = state.game.stats.score + 1;
          if (!updatedStats.times) {
            updatedStats.times = [timeToFind];
            updatedStats.averageTimeToFind = timeToFind;
          } else {
            updatedGame.stats.times.push(timeToFind);
            updatedStats.averageTimeToFind = Math.floor(
              updatedStats.times.reduce((a, b) => a + b) /
                updatedStats.times.length
            );
          }
          updatedGame.cardsInPlay = updatedCardsInPlay;
          updatedGame.stats = updatedStats;
          updatedGame.deck = updatedDeck;
          updatedGame.isOver = isGameOver;
          break;
        }

        case "zen": {
          const [updatedCardsInPlay, updatedDeck, isGameOver] = updateCards(
            cardsInPlay,
            deck,
            set,
            true
          );
          updatedStats.score = state.game.stats.score + 1;
          if (!updatedStats.times) {
            updatedStats.times = [timeToFind];
            updatedStats.averageTimeToFind = timeToFind;
          } else {
            updatedGame.stats.times.push(timeToFind);
            updatedStats.averageTimeToFind = Math.floor(
              updatedStats.times.reduce((a, b) => a + b) /
                updatedStats.times.length
            );
          }
          updatedGame.cardsInPlay = updatedCardsInPlay;
          updatedGame.stats = updatedStats;
          updatedGame.deck = updatedDeck;
          updatedGame.isOver = isGameOver;
          break;
        }

        case "timed": {
          const [updatedCardsInPlay, updatedDeck, isGameOver] = updateCards(
            cardsInPlay,
            deck,
            set,
            true
          );
          updatedStats.score = state.game.stats.score + 1;
          if (!updatedStats.times) {
            updatedStats.times = [timeToFind];
            updatedStats.averageTimeToFind = timeToFind;
          } else {
            updatedGame.stats.times.push(timeToFind);
            updatedStats.averageTimeToFind = Math.floor(
              updatedStats.times.reduce((a, b) => a + b) /
                updatedStats.times.length
            );
          }
          updatedGame.cardsInPlay = updatedCardsInPlay;
          updatedGame.stats = updatedStats;
          updatedGame.deck = updatedDeck;
          updatedGame.isOver = isGameOver;
          break;
        }
        default: {
          console.error("No valid game mode specified");
        }
      }
      return {
        ...state,
        game: updatedGame,
      };
    }

    case END_SINGLE_PLAYER: {
      const updatedGame = {
        ...state.game,
        isOver: true,
      };
      return {
        ...state,
        game: updatedGame,
      };
    }

    default:
      return state;
  }
}
