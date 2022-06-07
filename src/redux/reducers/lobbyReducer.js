import {
  JOIN_LOBBY,
  UPDATE_LOBBY,
  LEAVE_LOBBY,
  UPDATE_LOBBY_GAME_STATE,
} from "../actions";
const initialState = {
  connectedToLobby: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case JOIN_LOBBY: {
      const { lobby, currentUser } = action.payload;
      const userFromServer = lobby.users.find(
        (user) => user.socketId === currentUser.socketId
      );
      if (!userFromServer) {
        console.error("unable to join lobby");
      }
      return {
        ...state,
        connectedToLobby: true,
        id: lobby.id,
        users: lobby.users,
        game: lobby.game,
        gameActive: lobby.gameActive,
        admin: userFromServer.isAdmin,
        ready: userFromServer.ready,
      };
    }

    case UPDATE_LOBBY: {
      const { lobby, currentUser } = action.payload;
      const userFromServer = lobby.users.find(
        (user) => user.socketId === currentUser.socketId
      );
      if (!userFromServer) {
        console.error("no longer in lobby");
      }
      return {
        ...state,
        lobbyId: lobby.id,
        users: lobby.users,
        game: lobby.game,
        gameActive: lobby.gameActive,
        ready: userFromServer.ready,
      };
    }

    case UPDATE_LOBBY_GAME_STATE: {
      return {
        ...state,
        game: action.payload,
      };
    }
    default:
      return state;
  }
}
