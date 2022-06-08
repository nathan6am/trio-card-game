import { combineReducers } from "redux";

import menuReducer from "./menuReducer";
import userReducer from "./userReducer.js";
import singlePlayerGame from "./singlePlayerGame.js";
import lobbyReducer from "./lobbyReducer.js";
import setttingsReducer from "./settingsReducer";
const rootReducer = combineReducers({
  menu: menuReducer,
  user: userReducer,
  singlePlayerGame: singlePlayerGame,
  lobby: lobbyReducer,
  settings: setttingsReducer,
});

export default rootReducer;
