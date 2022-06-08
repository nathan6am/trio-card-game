import {
  SET_DISPLAY_NAME,
  UPDATE_SOCKET_ID,
  UPDATE_LOBBY,
  LEAVE_LOBBY,
} from "../actions";

const initialState = {
  displayName: "",
  stats: {},
};

export default function userReducer(state = initialState, action) {
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
    case UPDATE_LOBBY:
      const id = state.socketId;
      const { lobby } = action.payload;
      const user = lobby.users.find((user) => user.socketId === id);

      return {
        ...state,
        ready: user.ready,
      };

    case LEAVE_LOBBY:
      return {
        ...state,
        ready: false,
      };
    default:
      return state;
  }
}
