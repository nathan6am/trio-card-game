import { SET_DISPLAY_NAME, UPDATE_SOCKET_ID } from "../actions";

const initialState = {
  displayName: "",
  stats: {},
  serveruid: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DISPLAY_NAME:
      return {
        ...state,
        displayName: action.payload,
      };
    case UPDATE_SOCKET_ID:
      return {
        ...state,
        socketId: action.payload,
      };
    default:
      return state;
  }
}
