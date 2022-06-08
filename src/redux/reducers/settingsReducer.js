import { UPDATE_SETTINGS, SAVE_GAME_SETTINGS } from "../actions";

const initialState = {
  volume: 0.75,
  mute: false,
  theme: "blue-bg",
};

export default function setttingsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {
        ...state,
        volume: action.payload.volume,
        theme: action.payload.theme,
        mute: action.payload.mute,
      };
    case SAVE_GAME_SETTINGS:
      return {
        ...state,
        storedSettings: {
          gameOptions: action.payload.gameOptions,
          deckOptions: action.payload.deckOptions,
        },
      };
    default:
      return state;
  }
}
