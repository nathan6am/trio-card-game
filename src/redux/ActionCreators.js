import * as actionTypes from "./actions.js";

export const changeMenu = (menuId) => {
  return {
    type: actionTypes.SET_ACTIVE_MENU,
    payload: menuId,
  };
};

export const previousMenu = () => {
  return {
    type: actionTypes.PREVIOUS_MENU,
    payload: null,
  };
};

export const changeDisplayName = (displayName) => {
  return {
    type: actionTypes.SET_DISPLAY_NAME,
    payload: displayName,
  };
};

export const createSinglePlayerGame = (gameOptions, deckOptions) => {
  return {
    type: actionTypes.CREATE_SINGLE_PLAYER,
    payload: {
      gameOptions: gameOptions,
      deckOptions: deckOptions,
    },
  };
};

export const startSinglePlayerGame = () => {
  return {
    type: actionTypes.START_SINGLE_PLAYER,
    payload: null,
  };
};

export const scoreSinglePlayerGame = (cards, timeToFind) => {
  return {
    type: actionTypes.SCORE_SINGLE_PLAYER,
    payload: {
      cardsToScore: cards,
      timeToFind: timeToFind,
    },
  };
};

export const updateStoredSocketId = (socketId) => {
  console.log(socketId);
  return {
    type: actionTypes.UPDATE_SOCKET_ID,
    payload: socketId,
  };
};
